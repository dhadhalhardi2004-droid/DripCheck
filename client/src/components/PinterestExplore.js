// client/src/components/PinterestExplore.js
import React from 'react';
import { Shirt, Plus, Sparkles, ChevronRight, MessageCircle } from 'lucide-react';

export default function PinterestExplore() {
  const topFeatures = [
    { 
      title: "View wardrobe", 
      desc: "Everything in your closet, sorted.", 
      icon: <Shirt className="w-5 h-5 text-white" />,
      color: "bg-[#4B3621]"
    },
    { 
      title: "Add clothes", 
      desc: "Snap & save new pieces in seconds.", 
      icon: <Plus className="w-5 h-5 text-white" />,
      color: "bg-[#4B3621]"
    },
    { 
      title: "Get suggestions", 
      desc: "Ask Drip for any vibe, anytime.", 
      icon: <Sparkles className="w-5 h-5 text-white" />,
      color: "bg-[#4B3621]"
    }
  ];

  const styleCards = [
    { category: "Quiet Luxury", desc: "Tonal layering in cream, oat & cocoa." },
    { category: "Soft Grunge", desc: "Slip dress + chunky boots energy." },
    { category: "Coastal Y2K", desc: "Linen sets with espadrilles." },
    { category: "Office Siren", desc: "Tailored trousers, satin tops." }
  ];

  return (
    <div className="bg-[#FAF7F2] py-16 px-6 sm:px-12 relative overflow-hidden">
      
      {/* --- TOP FEATURE ROW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 w-full">
        {topFeatures.map((item, idx) => (
          <div 
            key={idx} 
            className="group flex items-center justify-between p-8 bg-[#F5EFE6]/60 rounded-[48px] shadow-sm hover-lift cursor-pointer border border-white/50"
          >
            <div className="flex items-center gap-6">
              <div className={`${item.color} w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-transform group-hover:scale-110`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-[#2D241C] font-bold text-xl leading-tight mb-1">{item.title}</h3>
                <p className="text-[#8C7B6B] text-sm font-medium">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-6 h-6 text-[#8C7B6B] group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        ))}
      </div>

      {/* --- HEADING SECTION --- */}
      <div className="mb-14 w-full">
        <span className="text-[#BCAE99] text-[12px] font-black tracking-[0.25em] uppercase mb-4 block">Trending Now</span>
        <h2 className="text-[#2D241C] text-5xl md:text-7xl font-serif font-bold leading-tight tracking-tight">
          Style ideas worth saving.
        </h2>
      </div>

      {/* --- STYLE CARDS ROW --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24 w-full">
        {styleCards.map((card, idx) => (
          <div 
            key={idx} 
            className="p-10 bg-white rounded-[48px] shadow-sm hover-lift group cursor-pointer border border-[#F0E8DD]/50 flex flex-col justify-between min-h-[320px]"
          >
            <div>
              <div className="bg-[#F5EFE6] px-5 py-2 rounded-full inline-block mb-8 group-hover:bg-[#4B3621] transition-colors duration-500">
                <span className="text-[#4B3621] text-[11px] font-black uppercase tracking-widest group-hover:text-white">{card.category}</span>
              </div>
              <p className="text-[#2D241C] text-2xl font-serif font-bold leading-snug">
                {card.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* --- FLOATING CHAT BUTTON (Exact match to image) --- */}
      <div className="fixed bottom-12 right-12 z-[100]">
        <div className="relative group">
          {/* Notification dot */}
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-[#D4B499] rounded-full border-2 border-[#FAF7F2] z-10 shadow-sm"></div>
          
          <button className="bg-[#4B3621] w-20 h-20 rounded-full flex items-center justify-center shadow-[0_12px_40px_rgba(75,54,33,0.3)] hover:scale-110 active:scale-95 transition-all duration-500 group">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
          </button>
        </div>
      </div>

    </div>
  );
}
