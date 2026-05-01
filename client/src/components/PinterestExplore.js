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
    <div className="bg-[#FAF7F2] py-12 px-6 sm:px-12">
      
      {/* --- TOP FEATURE ROW --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
        {topFeatures.map((item, idx) => (
          <div 
            key={idx} 
            className="group flex items-center justify-between p-6 bg-gradient-to-br from-[#F5EFE6] to-[#FAF7F2] rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all duration-500 cursor-pointer border border-white/40"
          >
            <div className="flex items-center gap-5">
              <div className={`${item.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}>
                {item.icon}
              </div>
              <div>
                <h3 className="text-[#2D241C] font-bold text-base leading-tight mb-0.5">{item.title}</h3>
                <p className="text-[#8C7B6B] text-[13px] font-medium">{item.desc}</p>
              </div>
            </div>
            <ChevronRight className="w-5 h-5 text-[#8C7B6B] group-hover:translate-x-1 transition-transform duration-300" />
          </div>
        ))}
      </div>

      {/* --- HEADING SECTION --- */}
      <div className="mb-12 max-w-2xl">
        <span className="text-[#BCAE99] text-[11px] font-black tracking-[0.2em] uppercase mb-3 block">Trending Now</span>
        <h2 className="text-[#2D241C] text-4xl md:text-5xl font-serif font-bold leading-tight">
          Style ideas worth saving.
        </h2>
      </div>

      {/* --- STYLE CARDS ROW --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {styleCards.map((card, idx) => (
          <div 
            key={idx} 
            className="p-8 bg-white/60 backdrop-blur-sm rounded-[32px] shadow-[0_4px_20px_rgba(0,0,0,0.02)] border border-white/60 hover:bg-white transition-colors duration-500 group cursor-pointer"
          >
            <div className="bg-[#F5EFE6] px-4 py-1.5 rounded-full inline-block mb-6 group-hover:bg-[#4B3621] group-hover:text-white transition-colors duration-500">
              <span className="text-[#4B3621] text-[11px] font-bold uppercase tracking-wider group-hover:text-white">{card.category}</span>
            </div>
            <p className="text-[#4B3621] text-lg font-medium leading-relaxed font-serif">
              “{card.desc}”
            </p>
          </div>
        ))}
      </div>

      {/* --- FLOATING CHAT BUTTON --- */}
      <div className="fixed bottom-10 right-10 z-[100]">
        <button className="bg-[#4B3621] w-16 h-16 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(75,54,33,0.3)] hover:scale-110 active:scale-95 transition-all duration-300 group">
          <MessageCircle className="w-7 h-7 text-white group-hover:rotate-12 transition-transform" />
        </button>
      </div>

    </div>
  );
}
