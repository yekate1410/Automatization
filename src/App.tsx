import React, { useState, useEffect, useRef } from 'react';
import { 
  Bot, 
  Users, 
  Clock, 
  TrendingUp, 
  MessageSquare, 
  Phone, 
  CheckCircle2, 
  ChevronRight,
  ShieldCheck,
  Zap,
  BarChart3,
  LayoutDashboard,
  Send
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ReactMarkdown from 'react-markdown';

// --- Types ---
interface Lead {
  id: number;
  name: string;
  phone: string;
  status: string;
  created_at: string;
}

interface Stats {
  leads: number;
  messages: number;
  conversionRate: string;
}

// --- Components ---

const Navbar = () => (
  <nav className="flex items-center justify-between px-8 py-6 border-b border-black/5 bg-white/80 backdrop-blur-md sticky top-0 z-50">
    <div className="flex items-center gap-2">
      <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
        <Bot size={24} />
      </div>
      <span className="text-xl font-bold tracking-tight text-slate-900">AutoDrive <span className="text-emerald-600">AI</span></span>
    </div>
    <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
      <a href="#features" className="hover:text-emerald-600 transition-colors">Преимущества</a>
      <a href="#demo" className="hover:text-emerald-600 transition-colors">Демо-чат</a>
      <a href="#dashboard" className="hover:text-emerald-600 transition-colors">Панель управления</a>
    </div>
    <div className="w-[140px] hidden md:block"></div> {/* Spacer to maintain layout balance */}
  </nav>
);

const Hero = () => {
  const [showPlate, setShowPlate] = useState(false);

  return (
    <section className="px-8 py-20 md:py-32 max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
          <Zap size={14} />
          AI-Ассистент для автошкол
        </div>
        <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
          Увеличьте запись в автошколу на <span className="text-emerald-600">40%</span>
        </h1>
        <p className="text-lg text-slate-600 mb-10 leading-relaxed max-w-lg">
          Умный ИИ-бот, который работает 24/7: отвечает на вопросы, отрабатывает возражения и записывает учеников на вождение, пока вы отдыхаете.
        </p>
        <div className="flex flex-col gap-4 relative">
          <button 
            onClick={() => setShowPlate(!showPlate)}
            className="bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 flex items-center gap-2 group w-fit"
          >
            Попробовать бесплатно
            <ChevronRight size={20} className={`transition-transform ${showPlate ? 'rotate-90' : 'group-hover:translate-x-1'}`} />
          </button>

          <AnimatePresence>
            {showPlate && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute top-full mt-4 bg-white border border-slate-200 p-6 rounded-3xl shadow-2xl z-20 min-w-[280px]"
              >
                <div className="text-slate-900 font-bold mb-4 flex items-center gap-2">
                  <MessageSquare size={18} className="text-emerald-600" />
                  Напишите нам ВКонтакте
                </div>
                <div className="flex flex-col gap-2">
                  <a 
                    href="https://vk.com/rglwekk" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors group"
                  >
                    <span className="font-medium">Екатерина</span>
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                  <a 
                    href="https://vk.com/ermilovd72" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors group"
                  >
                    <span className="font-medium">Даниил</span>
                    <ChevronRight size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="relative"
      >
        <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-cyan-400"></div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center border border-emerald-500/30">
              <Bot className="text-emerald-400" size={24} />
            </div>
            <div>
              <div className="text-white font-bold">AutoDrive Assistant</div>
              <div className="text-emerald-400 text-xs flex items-center gap-1">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                В сети (ИИ активен)
              </div>
            </div>
          </div>
          
          <div className="space-y-4 mb-8">
            <div className="bg-slate-800/50 p-4 rounded-2xl rounded-tl-none text-slate-300 text-sm max-w-[80%]">
              Привет! Я представляю автошколу AutoDrive. Помогу разобраться с обучением. Хотите узнать про категории или уже готовы начать обучение?
            </div>
            <div className="bg-emerald-600 p-4 rounded-2xl rounded-tr-none text-white text-sm ml-auto max-w-[80%]">
              А сколько стоит обучение на механике?
            </div>
            <div className="bg-slate-800/50 p-4 rounded-2xl rounded-tl-none text-slate-300 text-sm max-w-[80%]">
              Сейчас отличный момент — полный курс на МКПП всего 28 000 руб. Можно в рассрочку! Записать вас на ближайший поток?
            </div>
          </div>
          
          <div className="flex gap-2">
            <div className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white/40 text-sm">
              Введите сообщение...
            </div>
            <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
              <Send size={20} />
            </div>
          </div>
        </div>
        
        {/* Floating stats */}
        <motion.div 
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
            <TrendingUp size={20} />
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Конверсия</div>
            <div className="text-lg font-bold text-slate-900">+38.2%</div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

const Features = () => {
  const features = [
    {
      icon: <Clock className="text-blue-600" />,
      title: "Работа 24/7",
      desc: "ИИ отвечает мгновенно даже ночью, когда ваши менеджеры спят. Ни один лид не будет потерян."
    },
    {
      icon: <ShieldCheck className="text-emerald-600" />,
      title: "Отработка возражений",
      desc: "Бот обучен отвечать на сложные вопросы о ценах, сроках и страхах перед вождением."
    },
    {
      icon: <Users className="text-purple-600" />,
      title: "Снятие рутины",
      desc: "Автоматизирует 70% типовых диалогов, освобождая время менеджеров для сложных продаж."
    }
  ];

  return (
    <section id="features" className="py-24 bg-slate-50 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-4">Почему это работает?</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">Наш ИИ — это не просто чат-бот, а полноценный виртуальный менеджер по продажам.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-slate-200 hover:shadow-xl transition-all group">
              <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
              <p className="text-slate-600 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DemoChat = () => {
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Привет! Я представляю автошколу AutoDrive. Помогу выбрать категорию, расскажу про наших инструкторов или запишу вас на обучение. С чего начнем?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setLoading(true);

    try {
      const history = messages.map(m => ({
        role: m.role === 'ai' ? 'assistant' : 'user',
        content: m.text
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, history })
      });
      const data = await res.json();
      if (data.text) {
        setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      } else {
        throw new Error("Empty response");
      }
    } catch (e) {
      console.error("Chat error:", e);
      setMessages(prev => [...prev, { role: 'ai', text: 'Извините, произошла ошибка. Проверьте подключение к API.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="demo" className="py-24 px-8 bg-slate-50">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Попробуйте ИИ в деле</h2>
          <p className="text-slate-600 mb-2">Протестируйте, как ИИ общается с вашими будущими учениками</p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold border border-blue-100">
            <ShieldCheck size={16} />
            Интеграция с Telegram, WhatsApp, сайтом и соцсетями
          </div>
        </div>
        
        <div className="bg-[#e6eef3] rounded-[2rem] border border-slate-200 shadow-2xl overflow-hidden flex flex-col h-[650px] relative">
          {/* Telegram-like Header */}
          <div className="bg-[#ffffff] p-4 flex items-center gap-4 border-b border-slate-200 z-10">
            <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-sm">
              <Bot size={22} />
            </div>
            <div className="flex-1">
              <div className="text-slate-900 font-bold text-base leading-tight">AutoDrive AI Assistant</div>
              <div className="text-emerald-500 text-xs font-medium">bot • online</div>
            </div>
            <div className="text-slate-400">
              <Users size={20} />
            </div>
          </div>
          
          {/* Background Pattern (Simulated) */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 relative z-10">
            {messages.map((m, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[85%] p-3.5 shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-[#effdde] text-slate-800 rounded-2xl rounded-tr-none border border-[#d1e8b9]' 
                    : 'bg-white text-slate-800 rounded-2xl rounded-tl-none border border-slate-100'
                }`}>
                  <div className="text-[15px] leading-relaxed markdown-body">
                    <ReactMarkdown>{m.text}</ReactMarkdown>
                  </div>
                  <div className={`text-[10px] mt-1 text-right ${m.role === 'user' ? 'text-emerald-600' : 'text-slate-400'}`}>
                    {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    {m.role === 'user' && <span className="ml-1">✓✓</span>}
                  </div>
                </div>
              </motion.div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-100 p-3 rounded-2xl rounded-tl-none flex gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:0.4s]"></span>
                </div>
              </div>
            )}
          </div>
          
          <div className="p-4 bg-white border-t border-slate-200 z-10">
            <div className="flex gap-3 items-center">
              <div className="flex-1 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-3 flex items-center gap-3">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Напишите сообщение..."
                  className="flex-1 bg-transparent text-slate-900 focus:outline-none text-[15px]"
                />
              </div>
              <button 
                onClick={handleSend}
                disabled={loading}
                className="bg-emerald-500 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-emerald-600 transition-all active:scale-95 disabled:opacity-50 shadow-md shadow-emerald-100"
              >
                <Send size={20} />
              </button>
            </div>
            <div className="text-center mt-3 text-sm text-slate-400 font-medium italic">
              Например: "Сколько стоит обучение на категорию B?"
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Dashboard = () => {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [stats, setStats] = useState<Stats>({ leads: 0, messages: 0, conversionRate: '0' });

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch('/api/health');
        const data = await res.json();
        console.log("API Health:", data);
      } catch (e) {
        console.error("Health check failed", e);
      }
    };
    checkHealth();

    const fetchData = async () => {
      try {
        const [leadsRes, statsRes] = await Promise.all([
          fetch('/api/leads'),
          fetch('/api/stats')
        ]);
        
        if (!leadsRes.ok || !statsRes.ok) {
          console.error("API Error", leadsRes.status, statsRes.status);
          return;
        }

        const leadsContentType = leadsRes.headers.get("content-type");
        const statsContentType = statsRes.headers.get("content-type");

        if (!leadsContentType?.includes("application/json") || !statsContentType?.includes("application/json")) {
          const leadsText = await leadsRes.text();
          const statsText = await statsRes.text();
          console.error("Not a JSON response", leadsContentType, statsContentType, "Leads body:", leadsText.substring(0, 100));
          return;
        }

        setLeads(await leadsRes.json());
        setStats(await statsRes.json());
      } catch (e) {
        console.error("Fetch error", e);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="dashboard" className="py-24 bg-slate-900 px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm uppercase tracking-widest mb-2">
              <LayoutDashboard size={16} />
              Панель управления
            </div>
            <h2 className="text-3xl font-bold text-white">Статистика вашего бота</h2>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-white/60 text-sm">
              Обновлено: только что
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { label: "Всего лидов", value: stats.leads, icon: <Users className="text-blue-400" />, color: "bg-blue-500/10" },
            { label: "Сообщений обработано", value: stats.messages, icon: <MessageSquare className="text-purple-400" />, color: "bg-purple-500/10" },
            { label: "Конверсия в запись", value: `${stats.conversionRate}%`, icon: <BarChart3 className="text-emerald-400" />, color: "bg-emerald-500/10" }
          ].map((s, i) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl">
              <div className={`w-12 h-12 ${s.color} rounded-2xl flex items-center justify-center mb-6`}>
                {s.icon}
              </div>
              <div className="text-white/50 text-sm font-medium mb-1">{s.label}</div>
              <div className="text-4xl font-bold text-white tracking-tight">{s.value}</div>
            </div>
          ))}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/10 flex items-center justify-between">
            <h3 className="text-white font-bold">Последние заявки</h3>
            <button className="text-emerald-400 text-sm font-bold hover:underline">Экспорт в Excel</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-white/40 text-xs uppercase tracking-widest border-b border-white/10">
                  <th className="px-6 py-4 font-bold">Ученик</th>
                  <th className="px-6 py-4 font-bold">Телефон / Контакт</th>
                  <th className="px-6 py-4 font-bold">Статус</th>
                  <th className="px-6 py-4 font-bold">Дата</th>
                </tr>
              </thead>
              <tbody className="text-white/80 text-sm">
                {leads.length > 0 ? leads.map((l) => (
                  <tr key={l.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-medium">{l.name}</td>
                    <td className="px-6 py-4 font-mono text-emerald-400">{l.phone}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">
                        {l.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40">{new Date(l.created_at).toLocaleString('ru-RU')}</td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-12 text-center text-white/20 italic">
                      Заявок пока нет. Напишите в демо-чат, чтобы создать первую!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => (
  <footer className="py-12 border-t border-slate-200 px-8 text-center text-slate-500 text-sm">
    <div className="flex items-center justify-center gap-2 mb-4">
      <div className="w-6 h-6 bg-emerald-600 rounded-lg flex items-center justify-center text-white">
        <Bot size={14} />
      </div>
      <span className="font-bold text-slate-900">AutoDrive AI</span>
    </div>
    <p>© 2024 AutoDrive AI. Все права защищены. Сделано для демонстрации.</p>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <DemoChat />
        <Dashboard />
      </main>
      <Footer />
    </div>
  );
}
