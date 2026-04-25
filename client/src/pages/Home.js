// client/src/pages/Home.js
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import './Home.css';

/* ── Icons ─────────────────────────────────────── */
const IconWardrobe = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </svg>
);

const IconAdd = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconSparkle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const IconChevron = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
    strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const IconChat = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const IconRefresh = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
    strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

/* ── Type emoji map ────────────────────────────── */
const TYPE_EMOJI = { Top: '👕', Bottom: '👖', Shoes: '👟', Accessory: '💍' };

/* ── Weather mock — rotates for variety ──────── */
const WEATHERS = ['hot', 'cold', 'rainy'];
const getMockWeather = () => WEATHERS[new Date().getDate() % WEATHERS.length];

/* ── Time context ─────────────────────────────── */
const getTimeOfDay = () => (new Date().getHours() < 18 ? 'day' : 'night');

/* ═══════════════════════════════════════════════ */

export default function Home({ setActiveTab, user }) {
  const [clothes, setClothes]       = useState([]);
  const [clothesLoading, setClothesLoading] = useState(true);

  // AI suggestion state
  const [outfit, setOutfit]         = useState([]);
  const [contextLabel, setContextLabel] = useState('');
  const [aiLoading, setAiLoading]   = useState(true);
  const [aiError, setAiError]       = useState('');

  // Chatbot
  const [chatOpen, setChatOpen]     = useState(false);
  const [chatMsg, setChatMsg]       = useState('');
  const [chatLog, setChatLog]       = useState([
    { from: 'bot', text: "Hey! I'm your AI style assistant. Ask me anything about your wardrobe! 👗" },
  ]);

  const firstName = user?.name ? user.name.split(' ')[0] : 'there';

  /* ── Helper: get logged-in user ── */
  const getLoggedInUser = () => {
    try {
      const s = localStorage.getItem('user');
      return s && s !== 'undefined' && s !== 'null' ? JSON.parse(s) : null;
    } catch {
      return null;
    }
  };

  /* ── Fetch user's clothes (for stat count) ── */
  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('token');
        const u = getLoggedInUser();
        let url = 'http://localhost:4000/api/clothes';
        if (u?._id) url += `?userId=${u._id}`;
        const res = await axios.get(url, { headers: { Authorization: `Bearer ${token}` } });
        if (Array.isArray(res.data)) setClothes(res.data);
      } catch (e) {
        console.error('Failed to load clothes', e);
      } finally {
        setClothesLoading(false);
      }
    };
    fetch();
  }, []);

  /* ── Auto-fetch AI outfit on load ── */
  const fetchOutfit = useCallback(async () => {
    setAiLoading(true);
    setAiError('');
    try {
      const token   = localStorage.getItem('token');
      const u       = getLoggedInUser();
      const gender  = (u?.gender || 'unisex').toLowerCase();
      const time    = getTimeOfDay();
      const weather = getMockWeather();
      const userId  = u?._id || '';

      const params = new URLSearchParams({ gender, time, weather });
      if (userId) params.set('userId', userId);

      const res = await axios.get(
        `http://localhost:4000/api/ai/suggest?${params.toString()}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const data = res.data;
      if (Array.isArray(data.outfit) && data.outfit.length > 0) {
        setOutfit(data.outfit);
        setContextLabel(data.contextLabel || '');
      } else {
        setOutfit([]);
        setAiError(data.message || 'No suggestions available.');
      }
    } catch (err) {
      console.error('AI suggest failed', err);
      setAiError('Could not load suggestions. Try adding more clothes.');
    } finally {
      setAiLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOutfit();
  }, [fetchOutfit]);

  /* ── Chatbot ── */
  const getBotReply = (msg) => {
    const m = msg.toLowerCase();
    if (m.includes('outfit') || m.includes('wear'))
      return `Based on your ${clothes.length} items, scroll up to see your Today's Drip! 🔥`;
    if (m.includes('add') || m.includes('new'))
      return "Head to 'Add Clothes' to drop new pieces into your vault. ➕";
    if (m.includes('wardrobe') || m.includes('vault'))
      return `You've got ${clothes.length} items in your vault. Keep building! 💪`;
    if (m.includes('weather'))
      return `Today's weather context: ${getMockWeather()} · ${getTimeOfDay() === 'day' ? '☀️ Day' : '🌙 Night'}`;
    return "Great question! Keep curating your style and I'll get smarter every day. 🤖";
  };

  const handleChatSend = () => {
    if (!chatMsg.trim()) return;
    setChatLog((prev) => [
      ...prev,
      { from: 'user', text: chatMsg },
      { from: 'bot', text: getBotReply(chatMsg) },
    ]);
    setChatMsg('');
  };

  /* ── Quick actions ── */
  const quickActions = [
    { label: 'Wardrobe', desc: 'Browse fits', tab: 'wardrobe', icon: <IconWardrobe />, cls: 'qac-icon-dark' },
    { label: 'Add Outfit', desc: 'Drop new piece', tab: 'add', icon: <IconAdd />, cls: 'qac-icon-sand' },
    { label: 'AI Suggest', desc: 'Refresh fit', tab: null, onClick: fetchOutfit, icon: <IconSparkle />, cls: 'qac-icon-warm' },
  ];

  /* ── Skeleton cards ── */
  const SkeletonCard = () => (
    <div className="outfit-card outfit-skeleton" aria-hidden="true" />
  );

  return (
    <div className="page-wrapper animate-fade">
      <div className="home-stagger">

        {/* ══ HERO ══════════════════════════════════════ */}
        <div className="home-hero">
          <div className="home-hero-badge">
            <span className="badge-dot" />
            DripCheck
          </div>
          <h1>
            Hey, <span>{firstName}</span> 👋<br />
            Style your world.
          </h1>
          <p className="home-hero-sub">Your personal AI wardrobe assistant</p>

          <div className="hero-stats-row">
            <div className="hero-stat-pill">
              <span className="stat-n">{clothesLoading ? '—' : clothes.length}</span>
              <span className="stat-l">Items</span>
            </div>
            <div className="hero-stat-pill">
              <span className="stat-n">{aiLoading ? '—' : outfit.length}</span>
              <span className="stat-l">Fit Built</span>
            </div>
            <div className="hero-stat-pill">
              <span className="stat-n">AI</span>
              <span className="stat-l">Powered</span>
            </div>
          </div>
        </div>

        {/* ══ TODAY'S DRIP — AUTO SUGGESTION ═══════════ */}
        <div>
          <div className="home-section-header">
            <div className="todays-drip-title">
              <p className="home-section-label">Today's Drip 🔥</p>
              {contextLabel && (
                <span className="drip-context-badge">{contextLabel}</span>
              )}
            </div>
            <button
              className="home-section-link"
              onClick={fetchOutfit}
              disabled={aiLoading}
              aria-label="Refresh outfit suggestion"
            >
              <span className={aiLoading ? 'spin-icon' : ''}><IconRefresh /></span>
            </button>
          </div>

          {aiLoading ? (
            /* Skeleton loading row */
            <div className="outfit-scroll-row" aria-label="Loading suggestions">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>

          ) : outfit.length > 0 ? (
            /* Outfit cards */
            <div className="outfit-scroll-row">
              {outfit.map((item, idx) => (
                <div
                  key={item._id || idx}
                  className="outfit-card animate-fade"
                  style={{ animationDelay: `${idx * 0.07}s` }}
                  onClick={() => setActiveTab('wardrobe')}
                  role="button"
                  tabIndex={0}
                >
                  <div className="outfit-card-img">
                    {item.imageUrl
                      ? <img src={item.imageUrl} alt={item.name} loading="lazy" />
                      : <span className="outfit-emoji">{TYPE_EMOJI[item.type] || '👔'}</span>
                    }
                    <span className="outfit-card-badge">{item.type}</span>
                  </div>
                  <p className="outfit-card-name">{item.name}</p>
                  <p className="outfit-card-color">{item.color}</p>
                </div>
              ))}

              {/* Re-generate CTA card */}
              <div
                className="outfit-card outfit-cta-card"
                onClick={fetchOutfit}
                role="button"
                tabIndex={0}
                aria-label="Get new suggestion"
              >
                <div className="outfit-cta-inner">
                  <IconRefresh />
                  <p>New Fit</p>
                </div>
              </div>
            </div>

          ) : (
            /* Empty / error state */
            <div className="drip-empty-state">
              <span className="drip-empty-icon">😕</span>
              <p className="drip-empty-title">No suggestions yet</p>
              <p className="drip-empty-sub">
                {aiError || 'Add a Top, Bottom & Shoes to your vault first.'}
              </p>
              <button className="drip-empty-cta" onClick={() => setActiveTab('add')}>
                <IconAdd /> Add Clothes
              </button>
            </div>
          )}
        </div>

        {/* ══ QUICK ACTIONS ════════════════════════════ */}
        <div>
          <p className="home-section-label">Quick Actions</p>
          <div className="quick-actions-grid">
            {quickActions.map((action) => (
              <div
                key={action.label}
                className="quick-action-card"
                onClick={action.onClick || (() => setActiveTab(action.tab))}
                role="button"
                tabIndex={0}
              >
                <div className={`qac-icon-wrap ${action.cls}`}>{action.icon}</div>
                <h4>{action.label}</h4>
                <p>{action.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ══ FEATURE LIST ═════════════════════════════ */}
        <div>
          <p className="home-section-label">Explore Features</p>
          <div className="home-features-col">
            {[
              {
                title: 'Smart Outfit Suggestions',
                desc: 'AI picks the perfect combo based on time & weather.',
                tab: 'wardrobe',
                cls: 'fc-icon-brown',
                icon: <IconSparkle />,
              },
              {
                title: 'Organise Your Vault',
                desc: 'Sort by type, color, or mood in seconds.',
                tab: 'wardrobe',
                cls: 'fc-icon-cream',
                icon: <IconWardrobe />,
              },
              {
                title: 'Drop New Drip',
                desc: 'Know what you own. Wear it better.',
                tab: 'add',
                cls: 'fc-icon-warm',
                icon: <IconAdd />,
              },
            ].map((feat) => (
              <div
                key={feat.title}
                className="feature-card"
                onClick={() => setActiveTab(feat.tab)}
                role="button"
                tabIndex={0}
              >
                <div className={`feature-card-icon ${feat.cls}`}>{feat.icon}</div>
                <div className="feature-card-body">
                  <h4>{feat.title}</h4>
                  <p>{feat.desc}</p>
                </div>
                <div className="feature-card-arrow"><IconChevron /></div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ══ FLOATING CHATBOT ════════════════════════ */}
      {chatOpen && (
        <div className="chat-window animate-fade">
          <div className="chat-header">
            <div className="chat-header-info">
              <div className="chat-bot-avatar">✨</div>
              <div>
                <strong>Style AI</strong>
                <span>Online · {getTimeOfDay() === 'day' ? '☀️' : '🌙'} {getMockWeather()}</span>
              </div>
            </div>
            <button className="chat-close" onClick={() => setChatOpen(false)}>✕</button>
          </div>

          <div className="chat-body" id="chat-body">
            {chatLog.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.from}`}>{msg.text}</div>
            ))}
          </div>

          <div className="chat-input-row">
            <input
              className="chat-input"
              placeholder="Ask about your style..."
              value={chatMsg}
              onChange={(e) => setChatMsg(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleChatSend()}
            />
            <button className="chat-send" onClick={handleChatSend} aria-label="Send">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <button
        className={`chat-fab ${chatOpen ? 'chat-fab-open' : ''}`}
        onClick={() => setChatOpen((v) => !v)}
        aria-label="Toggle style assistant"
      >
        {chatOpen ? '✕' : <IconChat />}
      </button>
    </div>
  );
}
