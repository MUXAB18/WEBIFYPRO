import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Send, Sparkles, RotateCcw, MessageCircle } from 'lucide-react';

const WA_NUMBER = '923708316591';
const BOT_NAME  = 'Webify AI';
const TYPING_DELAY_MIN = 600;
const TYPING_DELAY_MAX = 1400;

// ─────────────────────────────────────────────
//  KNOWLEDGE BASE  — edit freely
// ─────────────────────────────────────────────
const KB = [
  {
    id: 'greeting',
    patterns: ['hi', 'hello', 'hey', 'salam', 'assalam', 'good morning', 'good evening', 'helo', 'hii', 'helo'],
    response: "👋 Hello! Welcome to **Webify Pro**! I'm your virtual assistant.\n\nI can help you with info about our services, timelines, and more. What are you looking for?",
    quickReplies: ['💻 Website Services', '📢 Digital Marketing', '⭐ Reviews', '📞 Contact Us'],

  },
  {
    id: 'services',
    patterns: ['service', 'services', 'what do you do', 'what you offer', 'offer', 'work', 'help me'],
    response: "🚀 We offer **3 core services**:\n\n💻 **Web Development** — React, MERN, Full-Stack\n📢 **Digital Marketing** — Meta Ads, SEO, Growth\n📊 **Social Media Management** — Instagram, TikTok\n\nWhich one interests you?",
    quickReplies: ['💻 Website', '📢 Digital Marketing', '📊 Social Media'],

  },
  {
    id: 'website',
    patterns: ['website', 'web', 'react', 'mern', 'node', 'frontend', 'backend', 'full stack', 'fullstack', 'web dev', 'web development', 'develop', 'site'],
    response: "💻 **Website Development** — Our specialty!\n\nWe build:\n✅ Custom React frontends\n✅ Node.js & MERN backends\n✅ Full SEO optimization\n✅ Secure user authentication\n✅ 95+ Lighthouse scores\n✅ 1 month free maintenance",
    quickReplies: ['📞 Talk to a Human', '🛒 Order Now', '⭐ Reviews'],
  },

  {
    id: 'marketing',
    patterns: ['marketing', 'meta ads', 'facebook ads', 'ads', 'advertisement', 'promote', 'promotion', 'roi', 'campaign', 'digital marketing', 'google ads'],
    response: "📢 **Digital Marketing** — Grow Your Business!\n\nOur packages include:\n✅ High-converting Meta Ads\n✅ Facebook & Instagram growth\n✅ Google Ads campaigns\n✅ Pixel & Conversions API setup\n✅ Weekly performance reports",
    quickReplies: ['📞 Talk to a Human', '🛒 Order Now', '⭐ Reviews'],
  },
  {
    id: 'social',
    patterns: ['social media', 'instagram', 'tiktok', 'content', 'reels', 'posts', 'followers', 'grow', 'brand', 'manage', 'management'],
    response: "📊 **Social Media Management** — Build Your Brand!\n\nIncludes:\n✅ Curated Reels, Carousels & Posts\n✅ Brand tone & copywriting strategy\n✅ Hashtag & SEO research\n✅ Community reply management\n✅ Monthly growth reports",
    quickReplies: ['📞 Talk to a Human', '🛒 Order Now', '⭐ Reviews'],
  },
  {
    id: 'price',
    patterns: ['price', 'pricing', 'cost', 'how much', 'rate', 'charges', 'budget', 'package', 'affordable', 'cheap', 'expensive', 'fee', 'fees', 'kitna', 'amount'],
    response: "💰 **Custom Pricing**\n\nEvery project is unique! We discuss and provide custom pricing based entirely on your specific project requirements, goals, and scope.\n\nPlease get in touch with us on WhatsApp or through our Order Form to get a personalized quote!",
    quickReplies: ['🛒 Order Now', '📞 Get Custom Quote', '💬 Chat on WhatsApp'],
  },
  {
    id: 'contact',
    patterns: ['contact', 'phone', 'call', 'whatsapp', 'email', 'reach', 'talk', 'human', 'person', 'support', 'number', 'address', 'location', 'sialkot'],
    response: "📞 **Get in Touch with Us:**\n\n📱 **WhatsApp:** +92 370 831 6591\n📧 **Email:** webifypro9@gmail.com\n📍 **Location:** Sialkot, Punjab, Pakistan\n\n🕐 Available Mon–Sat, 9 AM – 8 PM PKT",
    quickReplies: ['💬 Open WhatsApp', '🌐 Visit Website', '📧 Send Email'],
  },
  {
    id: 'reviews',
    patterns: ['review', 'reviews', 'rating', 'feedback', 'testimonial', 'clients', 'portfolio', 'work done', 'previous', 'sample', 'trust', 'reliable'],
    response: "⭐ **We're Trusted by 50+ Clients!**\n\nOur average rating is **4.9/5** across all platforms.\n\nYou can check our real reviews and portfolio directly on the website by scrolling to the **Reviews** and **Portfolio** sections! 👇",
    quickReplies: ['🗂 View Portfolio', '📞 Talk to a Human', '🛒 Order Now'],
  },
  {
    id: 'time',
    patterns: ['time', 'how long', 'duration', 'deadline', 'delivery', 'timeline', 'days', 'weeks', 'when', 'complete', 'finish'],
    response: "⏱️ **Estimated Delivery Times:**\n\n💻 **Basic Website** — 5–10 days\n💻 **Full-Stack Web App** — 2–5 weeks\n📢 **Marketing Setup** — 3–5 days\n📊 **Social Media** — Ongoing monthly\n\n*We always deliver on time! Rush delivery available.*",

    quickReplies: ['🛒 Order Now', '📞 Talk to a Human'],
  },
  {
    id: 'order',
    patterns: ['order', 'start', 'begin', 'hire', 'book', 'get started', 'proceed', 'buy', 'purchase', 'place order'],
    response: "🎉 Awesome! Let's get started!\n\nYou can place your order directly through our **Order Form** on the website, or chat with us on WhatsApp for a personalized quote.\n\nWhat would you like to do?",
    quickReplies: ['📝 Fill Order Form', '💬 Chat on WhatsApp', '📞 Call Us'],
  },
  {
    id: 'thanks',
    patterns: ['thank', 'thanks', 'thankyou', 'thank you', 'shukriya', 'great', 'awesome', 'good', 'nice', 'helpful'],
    response: "😊 You're welcome! We're always happy to help.\n\nIs there anything else I can assist you with?",
    quickReplies: ['🔁 Start Over', '💬 Chat on WhatsApp'],
  },
  {
    id: 'bye',
    patterns: ['bye', 'goodbye', 'see you', 'later', 'exit', 'done', 'ok bye', 'okay bye'],
    response: "👋 Goodbye! Have a great day!\n\nFeel free to come back anytime. We're always here to help. 🚀",
    quickReplies: ['🔁 Start Over'],
  },
];

const FALLBACK = {
  response: "🤔 I'm not sure I understood that. Let me connect you with our team for a better answer!",
  quickReplies: ['💬 Chat on WhatsApp', '📞 Contact Us', '🔁 Start Over'],
};

const WELCOME = {
  id: 'welcome',
  text: "👋 Hi there! I'm **Webify AI**, your intelligent assistant at **Webify Pro**.\n\nI can answer questions about our services, timeline, and more — instantly!\n\nHow can I help you today?",
  quickReplies: ['💻 Website Development', '📢 Digital Marketing', '📞 Contact Us'],

  sender: 'bot',
  ts: Date.now(),
};

// ─────────────────────────────────────────────
//  HELPERS
// ─────────────────────────────────────────────
function matchKB(input) {
  const lower = input.toLowerCase().trim();

  // Quick reply label shortcuts
  const qrMap = {
    '💻 website': 'website', '💻 website development': 'website', '💻 website price': 'price',
    '📢 digital marketing': 'marketing', '📊 social media': 'social',

    '💰 pricing': 'price', '💰 website pricing': 'price', '💰 app pricing': 'price',
    '💰 marketing pricing': 'price', '💰 smm pricing': 'price', '💰 get custom quote': 'price',
    '📞 contact us': 'contact', '📞 talk to a human': 'contact', '📞 call us': 'contact',
    '⭐ reviews': 'reviews',
    '🛒 order now': 'order', '📝 fill order form': 'order', '🛒 get started': 'order',
    '🔁 start over': '__reset__',
    '💬 chat on whatsapp': '__whatsapp__', '💬 open whatsapp': '__whatsapp__',
    '📧 send email': '__email__', '🌐 visit website': '__scroll_top__',
    '🗂 view portfolio': '__scroll_portfolio__',
  };

  // Check shortcut first
  const shortcut = qrMap[lower];
  if (shortcut) return { id: shortcut, fromQR: true };

  // Pattern match
  for (const entry of KB) {
    if (entry.patterns.some(p => lower.includes(p))) return entry;
  }
  return null;
}

function renderMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

function getTypingDelay() {
  return TYPING_DELAY_MIN + Math.random() * (TYPING_DELAY_MAX - TYPING_DELAY_MIN);
}

function formatTime(ts) {
  return new Date(ts).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ─────────────────────────────────────────────
//  COMPONENT
// ─────────────────────────────────────────────
export default function ChatBot() {
  const [isOpen, setIsOpen]     = useState(false);
  const [messages, setMessages] = useState([WELCOME]);
  const [input, setInput]       = useState('');
  const [typing, setTyping]     = useState(false);
  const [unread, setUnread]     = useState(1);
  const [hasOpened, setHasOpened] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setUnread(0);
      setHasOpened(true);
      setTimeout(() => inputRef.current?.focus(), 350);
    }
  }, [isOpen]);

  // Auto-prompt after 12s if never opened
  const [showBubble, setShowBubble] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => { if (!hasOpened) setShowBubble(true); }, 12000);
    return () => clearTimeout(t);
  }, [hasOpened]);

  const handleSpecial = useCallback((id) => {
    switch (id) {
      case '__whatsapp__':
        window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi Webify Pro! I need help.")}`, '_blank');
        break;
      case '__email__':
        window.open('mailto:webifypro9@gmail.com');
        break;
      case '__scroll_top__':
        window.scrollTo({ top: 0, behavior: 'smooth' });
        break;
      case '__scroll_portfolio__':
        document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' });
        break;
      case '__reset__':
        setMessages([{ ...WELCOME, ts: Date.now() }]);
        break;
      default: break;
    }
  }, []);

  const sendMessage = useCallback((text) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    setInput('');

    const userMsg = { id: Date.now(), text: trimmed, sender: 'user', ts: Date.now() };
    setMessages(prev => [...prev, userMsg]);
    setTyping(true);

    const match = matchKB(trimmed);

    // Handle specials instantly
    if (match?.id?.startsWith('__')) {
      setTyping(false);
      handleSpecial(match.id);
      return;
    }

    setTimeout(() => {
      setTyping(false);
      const entry   = match && !match.fromQR ? match : (match?.fromQR ? KB.find(k => k.id === match.id) : null);
      const content = entry || FALLBACK;

      // If fromQR matched an id but not a KB entry, treat as fallback
      const finalEntry = entry ?? FALLBACK;

      setMessages(prev => [...prev, {
        id: Date.now(),
        text: finalEntry.response,
        quickReplies: finalEntry.quickReplies || [],
        sender: 'bot',
        ts: Date.now(),
      }]);
    }, getTypingDelay());
  }, [handleSpecial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  const handleQR = (label) => {
    sendMessage(label);
  };

  return (
    <>
      {/* ── CHAT WINDOW ── */}
      <div className={`cb-window ${isOpen ? 'cb-window-open' : ''}`} role="dialog" aria-label="Webify Pro Chat">

        {/* Header */}
        <div className="cb-header">
          <div className="cb-avatar">
            <Sparkles size={20} color="#fff" />
            <span className="cb-avatar-dot" />
          </div>
          <div className="cb-header-info">
            <div className="cb-header-name">{BOT_NAME}</div>
            <div className="cb-header-status">
              {typing ? '✍️ typing...' : '🟢 Online — instant replies'}
            </div>
          </div>
          <div className="cb-header-actions">
            <button className="cb-icon-btn" onClick={() => setMessages([{ ...WELCOME, ts: Date.now() }])} title="Reset chat" aria-label="Reset chat">
              <RotateCcw size={15} />
            </button>
            <button className="cb-icon-btn" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="cb-messages" role="log" aria-live="polite">
          {messages.map((msg) => (
            <div key={msg.id} className={`cb-msg-row ${msg.sender} cb-msg-animate`}>
              {msg.sender === 'bot' && (
                <div className="cb-bot-avatar"><Sparkles size={14} /></div>
              )}
              <div className="cb-msg-col">
                <div
                  className={`cb-bubble cb-bubble-${msg.sender}`}
                  dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.text) }}
                />
                {/* Quick replies */}
                {msg.sender === 'bot' && msg.quickReplies?.length > 0 && (
                  <div className="cb-quick-replies">
                    {msg.quickReplies.map((qr) => (
                      <button key={qr} className="cb-qr-btn" onClick={() => handleQR(qr)}>
                        {qr}
                      </button>
                    ))}
                  </div>
                )}
                <div className="cb-ts">{formatTime(msg.ts)}</div>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {typing && (
            <div className="cb-msg-row bot cb-msg-animate">
              <div className="cb-bot-avatar"><Sparkles size={14} /></div>
              <div className="cb-bubble cb-bubble-bot cb-typing">
                <span /><span /><span />
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* WhatsApp handoff strip */}
        <button
          className="cb-wa-strip"
          onClick={() => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi! I'd like to speak with a human from Webify Pro.")}`, '_blank')}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366" style={{ flexShrink: 0 }}>
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          <span>Talk to a real person on WhatsApp</span>
        </button>

        {/* Input */}
        <form className="cb-input-row" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            className="cb-input"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="Chat message input"
            autoComplete="off"
          />
          <button
            className="cb-send-btn"
            type="submit"
            disabled={!input.trim()}
            aria-label="Send message"
          >
            <Send size={16} />
          </button>
        </form>
      </div>

      {/* ── FAB BUTTON (bottom-left) ── */}
      <div className="cb-fab-wrap">
        {/* Tooltip */}
        {showBubble && !isOpen && (
          <div className="cb-fab-tooltip">
            🤖 Ask me anything!
            <div className="cb-fab-tooltip-arrow" />
          </div>
        )}

        <button
          id="chatbot-fab-btn"
          className="cb-fab"
          onClick={() => { setIsOpen(o => !o); setShowBubble(false); }}
          aria-label={isOpen ? 'Close chatbot' : 'Open chatbot'}
          aria-expanded={isOpen}
        >
          <span className={`cb-fab-icon ${isOpen ? 'cb-fab-icon-open' : ''}`}>
            {isOpen ? <X size={22} /> : <Sparkles size={24} />}
          </span>
          {!isOpen && unread > 0 && (
            <span className="cb-unread-badge">{unread}</span>
          )}
        </button>
      </div>

      <style>{`
        /* ══════════════ FAB ══════════════ */
        .cb-fab-wrap {
          position: fixed;
          bottom: 24px;
          left: 24px;
          z-index: 9998;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 10px;
          font-family: 'Outfit', sans-serif;
        }
        .cb-fab {
          width: 58px; height: 58px;
          border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border: none;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          color: #fff;
          box-shadow: 0 8px 28px rgba(99,102,241,0.5), 0 2px 8px rgba(0,0,0,0.3);
          transition: transform 0.3s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.3s ease;
          position: relative;
        }
        .cb-fab:hover {
          transform: scale(1.1);
          box-shadow: 0 12px 36px rgba(99,102,241,0.6), 0 2px 8px rgba(0,0,0,0.4);
        }
        .cb-fab:active { transform: scale(0.96); }
        .cb-fab-icon {
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
        }
        .cb-fab-icon-open { transform: rotate(90deg); }
        .cb-unread-badge {
          position: absolute; top: -3px; right: -3px;
          width: 18px; height: 18px; border-radius: 50%;
          background: #ff006e;
          color: #fff; font-size: 0.65rem; font-weight: 700;
          display: flex; align-items: center; justify-content: center;
          border: 2px solid var(--bg, #010108);
          animation: cb-badge-pop 0.4s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes cb-badge-pop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
        .cb-fab-tooltip {
          position: absolute;
          bottom: 68px; left: 0;
          background: var(--surface-card, rgba(5,5,20,0.95));
          border: 1px solid rgba(99,102,241,0.3);
          border-radius: 12px 12px 12px 4px;
          padding: 9px 14px;
          white-space: nowrap;
          color: var(--text, #f9fafb);
          font-size: 0.8rem; font-weight: 600;
          font-family: 'Outfit', sans-serif;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35), 0 0 16px rgba(99,102,241,0.12);
          animation: cb-tip-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both;
          pointer-events: none;
        }
        .cb-fab-tooltip-arrow {
          position: absolute; bottom: -6px; left: 18px;
          width: 10px; height: 10px;
          background: var(--surface-card, rgba(5,5,20,0.95));
          border-right: 1px solid rgba(99,102,241,0.3);
          border-bottom: 1px solid rgba(99,102,241,0.3);
          transform: rotate(45deg);
        }
        @keyframes cb-tip-in {
          from { opacity: 0; transform: translateY(8px) scale(0.92); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* ══════════════ CHAT WINDOW ══════════════ */
        .cb-window {
          position: fixed;
          bottom: 96px; left: 24px;
          width: 340px;
          max-height: 560px;
          border-radius: 20px;
          background: var(--surface-card, rgba(5,5,20,0.97));
          border: 1px solid rgba(99,102,241,0.2);
          box-shadow: 0 24px 64px rgba(0,0,0,0.65), 0 0 40px rgba(99,102,241,0.08);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          display: flex; flex-direction: column;
          overflow: hidden;
          transform-origin: bottom left;
          z-index: 9997;
          font-family: 'Outfit', sans-serif;

          /* Hidden state */
          opacity: 0;
          transform: scale(0.85) translateY(16px);
          pointer-events: none;
          transition: opacity 0.35s cubic-bezier(0.16,1,0.3,1),
                      transform 0.35s cubic-bezier(0.16,1,0.3,1);
        }
        .cb-window-open {
          opacity: 1;
          transform: scale(1) translateY(0);
          pointer-events: auto;
        }

        /* ── Header ── */
        .cb-header {
          background: linear-gradient(135deg, #3730a3, #6366f1);
          padding: 14px 16px;
          display: flex; align-items: center; gap: 10px;
          flex-shrink: 0;
        }
        .cb-avatar {
          width: 38px; height: 38px; border-radius: 50%;
          background: rgba(255,255,255,0.18);
          border: 2px solid rgba(255,255,255,0.35);
          display: flex; align-items: center; justify-content: center;
          position: relative; flex-shrink: 0;
        }
        .cb-avatar-dot {
          position: absolute; bottom: 1px; right: 1px;
          width: 9px; height: 9px; border-radius: 50%;
          background: #06ffa5;
          border: 2px solid #3730a3;
          box-shadow: 0 0 6px #06ffa5;
        }
        .cb-header-info { flex: 1; }
        .cb-header-name { color: #fff; font-weight: 700; font-size: 0.9rem; }
        .cb-header-status { color: rgba(255,255,255,0.8); font-size: 0.7rem; margin-top: 2px; }
        .cb-header-actions { display: flex; gap: 6px; }
        .cb-icon-btn {
          width: 28px; height: 28px; border-radius: 8px;
          background: rgba(255,255,255,0.12);
          border: 1px solid rgba(255,255,255,0.2);
          color: #fff; cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background 0.2s;
        }
        .cb-icon-btn:hover { background: rgba(255,255,255,0.25); }

        /* ── Messages area ── */
        .cb-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 14px 8px;
          display: flex; flex-direction: column; gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(99,102,241,0.3) transparent;
        }
        .cb-messages::-webkit-scrollbar { width: 4px; }
        .cb-messages::-webkit-scrollbar-thumb {
          background: rgba(99,102,241,0.35); border-radius: 4px;
        }

        /* ── Message rows ── */
        .cb-msg-row {
          display: flex; gap: 8px; align-items: flex-end;
        }
        .cb-msg-animate {
          animation: cb-msg-enter 0.4s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes cb-msg-enter {
          from { opacity: 0; transform: translateY(10px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .cb-msg-row.user { flex-direction: row-reverse; }
        .cb-msg-col { display: flex; flex-direction: column; max-width: 82%; }
        .cb-msg-row.user .cb-msg-col { align-items: flex-end; }

        .cb-bot-avatar {
          width: 26px; height: 26px; border-radius: 50%;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; margin-bottom: 18px;
          color: #fff;
        }

        /* ── Bubbles ── */
        .cb-bubble {
          padding: 10px 13px;
          border-radius: 18px;
          font-size: 0.82rem;
          line-height: 1.55;
          word-break: break-word;
        }
        .cb-bubble-bot {
          background: rgba(99,102,241,0.1);
          border: 1px solid rgba(99,102,241,0.2);
          color: var(--text, #f0f0ff);
          border-bottom-left-radius: 4px;
        }
        .cb-bubble-user {
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: #fff;
          border-bottom-right-radius: 4px;
        }

        /* ── Typing dots ── */
        .cb-typing {
          display: flex; gap: 5px; align-items: center;
          padding: 12px 16px;
        }
        .cb-typing span {
          width: 7px; height: 7px; border-radius: 50%;
          background: rgba(99,102,241,0.7);
          animation: cb-dot 1.2s ease-in-out infinite;
        }
        .cb-typing span:nth-child(2) { animation-delay: 0.2s; }
        .cb-typing span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes cb-dot {
          0%,80%,100% { transform: scale(0.7); opacity: 0.4; }
          40%          { transform: scale(1.1); opacity: 1; }
        }

        /* ── Timestamp ── */
        .cb-ts {
          font-size: 0.62rem;
          color: rgba(255,255,255,0.25);
          margin-top: 3px;
          padding: 0 2px;
        }

        /* ── Quick replies ── */
        .cb-quick-replies {
          display: flex; flex-wrap: wrap; gap: 6px;
          margin-top: 8px;
        }
        .cb-qr-btn {
          padding: 5px 11px;
          border-radius: 20px;
          background: rgba(99,102,241,0.08);
          border: 1px solid rgba(99,102,241,0.28);
          color: #a5b4fc;
          font-size: 0.72rem; font-weight: 600;
          cursor: pointer;
          transition: all 0.18s ease;
          font-family: 'Outfit', sans-serif;
          white-space: nowrap;
        }
        .cb-qr-btn:hover {
          background: rgba(99,102,241,0.18);
          border-color: rgba(99,102,241,0.5);
          color: #c7d2fe;
          transform: translateY(-1px);
        }

        /* ── WhatsApp handoff strip ── */
        .cb-wa-strip {
          margin: 0 12px 8px;
          padding: 9px 14px;
          border-radius: 12px;
          background: rgba(37,211,102,0.07);
          border: 1px solid rgba(37,211,102,0.22);
          color: rgba(255,255,255,0.7);
          font-size: 0.73rem; font-weight: 600;
          cursor: pointer;
          display: flex; align-items: center; gap: 8px;
          transition: all 0.2s ease;
          font-family: 'Outfit', sans-serif;
          text-align: left;
          flex-shrink: 0;
        }
        .cb-wa-strip:hover {
          background: rgba(37,211,102,0.13);
          border-color: rgba(37,211,102,0.4);
          color: #fff;
        }

        /* ── Input row ── */
        .cb-input-row {
          display: flex; gap: 8px; align-items: center;
          padding: 10px 12px 12px;
          border-top: 1px solid rgba(255,255,255,0.06);
          flex-shrink: 0;
        }
        .cb-input {
          flex: 1;
          background: rgba(99,102,241,0.07);
          border: 1px solid rgba(99,102,241,0.22);
          border-radius: 12px;
          padding: 9px 13px;
          color: var(--text, #f0f0ff);
          font-size: 0.82rem;
          font-family: 'Outfit', sans-serif;
          outline: none;
          transition: border-color 0.2s;
        }
        .cb-input::placeholder { color: rgba(255,255,255,0.28); }
        .cb-input:focus { border-color: rgba(99,102,241,0.5); }
        .cb-send-btn {
          width: 36px; height: 36px; border-radius: 10px;
          background: linear-gradient(135deg, #4f46e5, #7c3aed);
          border: none; cursor: pointer; color: #fff;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s ease; flex-shrink: 0;
        }
        .cb-send-btn:hover:not(:disabled) {
          transform: scale(1.08);
          box-shadow: 0 4px 14px rgba(99,102,241,0.4);
        }
        .cb-send-btn:disabled { opacity: 0.35; cursor: not-allowed; }

        /* ══════════════ LIGHT MODE ══════════════ */
        html.light-mode .cb-window {
          background: rgba(255,255,255,0.99) !important;
          border-color: rgba(99,102,241,0.2) !important;
          box-shadow: 0 24px 64px rgba(0,0,0,0.18), 0 0 40px rgba(99,102,241,0.06) !important;
        }
        html.light-mode .cb-bubble-bot {
          background: rgba(99,102,241,0.07) !important;
          color: #1e1b4b !important;
        }
        html.light-mode .cb-ts { color: rgba(0,0,0,0.25) !important; }
        html.light-mode .cb-qr-btn {
          color: #4f46e5 !important;
          background: rgba(99,102,241,0.06) !important;
        }
        html.light-mode .cb-input {
          background: rgba(255,255,255,0.9) !important;
          border-color: rgba(99,102,241,0.25) !important;
          color: #0d0e1a !important;
        }
        html.light-mode .cb-input::placeholder { color: rgba(0,0,0,0.3) !important; }
        html.light-mode .cb-input-row { border-color: rgba(0,0,0,0.07) !important; }
        html.light-mode .cb-wa-strip {
          color: rgba(0,0,0,0.6) !important;
          background: rgba(37,211,102,0.06) !important;
        }
        html.light-mode .cb-fab-tooltip {
          background: rgba(255,255,255,0.98) !important;
          color: #0d0e1a !important;
        }
        html.light-mode .cb-fab-tooltip-arrow {
          background: rgba(255,255,255,0.98) !important;
        }
        html.light-mode .cb-messages {
          scrollbar-color: rgba(99,102,241,0.2) transparent;
        }

        /* ══════════════ MOBILE ══════════════ */
        @media (max-width: 480px) {
          .cb-window {
            width: calc(100vw - 16px);
            left: 8px; bottom: 88px;
            max-height: 70vh;
            backdrop-filter: none;
            -webkit-backdrop-filter: none;
          }
          .cb-fab-wrap { bottom: 24px; left: 14px; }
        }
      `}</style>
    </>
  );
}
