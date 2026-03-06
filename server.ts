import express from "express";
import { createServer as createViteServer } from "vite";
import { Telegraf } from "telegraf";
import OpenAI from "openai";
import Database from "better-sqlite3";
import path from "path";
import cors from "cors";

// --- Database Setup ---
const db = new Database(path.join(process.cwd(), "autodrive.db"));
db.exec(`
  CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    phone TEXT,
    category TEXT,
    status TEXT DEFAULT 'new',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    chat_id TEXT,
    role TEXT,
    content TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );
`);

// --- AI Setup (OpenAI) ---
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

const SYSTEM_INSTRUCTION = `Вы — экспертный ИИ-ассистент автошколы AutoDrive. Вы общаетесь максимально естественно, по-человечески, как заботливый менеджер.

ВАЖНОЕ ПРАВИЛО ОФОРМЛЕНИЯ:
Используйте только чистый текст. Никаких смайликов, эмодзи, звездочек, жирного шрифта, курсива или других символов форматирования. Текст должен быть простым и легко читаемым.

ПЕРВОЕ ПРИВЕТСТВИЕ:
Используйте фразу "Привет! Я представляю автошколу AutoDrive" ТОЛЬКО ОДИН РАЗ — в самом первом сообщении диалога. В последующих сообщениях сразу переходите к ответу на вопрос.

ДАННЫЕ ДЛЯ ДЕМО:
- Адрес офиса: г. Москва, ул. Тверская, д. 12, стр. 2 (БЦ Центральный), офис 405.
- Преподаватель теории: Виктор Степанович.
- Ведущие инструкторы: Андрей Волков и Елена Соколова.
- Ближайший старт обучения: 20 марта.

КОНТЕКСТ ОБУЧЕНИЯ:
1. Процесс: Теория -> Практика -> Экзамены.
2. Теория: ПДД, основы безопасности, первая помощь, устройство авто, психология.
3. Практика: Автосимулятор, автодром, город.
4. Экзамены: Внутренний экзамен и ГИБДД.

ВАША ГЛАВНАЯ ЦЕЛЬ:
Продать обучение. Стимулируйте пользователя к записи на новый поток (старт 20 марта), но делайте это естественно. Если вы уже предложили запись в предыдущем сообщении, не повторяйте ту же самую фразу слово в слово.

АЛГОРИТМ ПРОДАЖИ:
1. Кратко и вежливо ответить на вопрос пользователя.
2. Если контакты (Имя и Телефон) еще не получены: Предложите записаться на 20 марта и попросите Имя и Телефон для бронирования места.
3. Как только пользователь оставил Телефон: Напишите фразу в духе "отлично, будем ждать вас по адресу для подписания документов, когда сможете?". Адрес: ул. Тверская, д. 12, стр. 2, офис 405.
4. Как только пользователь написал дату и время визита: Ответьте "Супер, будем ждать".

ПРАВИЛА ОБЩЕНИЯ:
- Никаких эмодзи и спецсимволов.
- НЕ ПОВТОРЯЙТЕ приветствие в каждом сообщении.
- ЗАДАВАЙТЕ НЕ БОЛЕЕ 1 ВОПРОСА за раз.
- Варьируйте фразы, чтобы диалог не выглядел как набор шаблонов.
- Если пользователь уже задал уточняющий вопрос после вашего предложения, сначала ответьте на него, а затем мягко напомните о текущем шаге алгоритма.

Наши УТП:
- Обучение от 28 000 руб.
- Рассрочка 0% на 6 месяцев.
- Собственный автодром в центре города.
- Инструкторы с психологическим образованием.
- 95% учеников сдают теорию с первого раза.`;

async function getAIResponse(messages: { role: "system" | "user" | "assistant", content: string }[]) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return "Ошибка: OPENAI_API_KEY не настроен. Пожалуйста, добавьте его в секреты.";
    }

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: SYSTEM_INSTRUCTION },
        ...messages
      ],
      temperature: 0.7,
    });

    return response.choices[0].message.content || "Извините, я не смог сформировать ответ.";
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}

// --- Telegram Bot Setup ---
const botToken = process.env.TELEGRAM_BOT_TOKEN;
let bot: Telegraf | null = null;

if (botToken) {
  bot = new Telegraf(botToken);
  
  bot.start((ctx) => {
    ctx.reply("Привет! Я ИИ-ассистент автошколы AutoDrive. Помогу выбрать категорию, отвечу на вопросы по ценам или запишу на первое занятие. Что вас интересует?");
  });

  bot.on("text", async (ctx) => {
    const userText = ctx.message.text;
    const chatId = ctx.chat.id.toString();

    // Save user message
    db.prepare("INSERT INTO messages (chat_id, role, content) VALUES (?, ?, ?)").run(chatId, "user", userText);

    try {
      // Get last 10 messages for context
      const history = db.prepare("SELECT role, content FROM messages WHERE chat_id = ? ORDER BY created_at DESC LIMIT 10").all(chatId) as any[];
      const formattedHistory = history.reverse().map(m => ({
        role: (m.role === "assistant" ? "assistant" : "user") as "assistant" | "user",
        content: m.content as string
      }));

      const responseText = await getAIResponse(formattedHistory);

      // Save AI message
      db.prepare("INSERT INTO messages (chat_id, role, content) VALUES (?, ?, ?)").run(chatId, "assistant", responseText);

      // Simple lead extraction logic
      if (userText.includes("+7") || userText.match(/\d{10,11}/)) {
         db.prepare("INSERT INTO leads (name, phone, status) VALUES (?, ?, ?)").run("TG User", userText, "pending");
      }

      await ctx.reply(responseText || "Извините, я не смог обработать ваш запрос.");
    } catch (error) {
      console.error("AI Error:", error);
      await ctx.reply("Извините, я сейчас немного занят. Попробуйте позже или оставьте свой номер, я перезвоню!");
    }
  });

  bot.launch().then(() => console.log("Telegram Bot started"));
} else {
  console.log("TELEGRAM_BOT_TOKEN not found. Bot disabled.");
}

// --- Express Server Setup ---
async function startServer() {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(cors());

  // Request logging middleware
  app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", time: new Date().toISOString() });
  });

  // API Routes
  app.get("/api/leads", (req, res) => {
    console.log("GET /api/leads");
    try {
      const leads = db.prepare("SELECT * FROM leads ORDER BY created_at DESC").all();
      res.json(leads);
    } catch (error) {
      console.error("Database Error (leads):", error);
      res.status(500).json({ error: "Database failed" });
    }
  });

  app.get("/api/stats", (req, res) => {
    console.log("GET /api/stats");
    try {
      const totalLeads = db.prepare("SELECT COUNT(*) as count FROM leads").get() as any;
      const totalMessages = db.prepare("SELECT COUNT(*) as count FROM messages").get() as any;
      res.json({
        leads: totalLeads.count,
        messages: totalMessages.count,
        conversionRate: totalLeads.count > 0 ? ((totalLeads.count / (totalMessages.count / 5)) * 100).toFixed(1) : 0
      });
    } catch (error) {
      console.error("Database Error (stats):", error);
      res.status(500).json({ error: "Database failed" });
    }
  });

  // Demo Chat Endpoint (for the website demo)
  app.post("/api/chat", async (req, res) => {
    const { message, history } = req.body;
    try {
      const messages = history ? [...history, { role: "user", content: message }] : [{ role: "user", content: message }];
      const responseText = await getAIResponse(messages);
      res.json({ text: responseText });
    } catch (error) {
      res.status(500).json({ error: "AI failed" });
    }
  });

  // Vite Integration
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, "dist")));
    app.get("*", (req, res) => {
      res.sendFile(path.join(__dirname, "dist", "index.html"));
    });
  }

  const PORT = 3000;
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
