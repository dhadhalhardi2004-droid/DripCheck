// client/src/components/ClothingCard.js
import React, { useState } from 'react';
import { Heart, Maximize2 } from 'lucide-react';

export default function ClothingCard({ item }) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="bg-white rounded-[32px] overflow-hidden shadow-soft hover:shadow-premium transition-all duration-500 group cursor-pointer animate-fade mb-6 border border-transparent hover:border-[#F0E8DD]">
      <div className="relative overflow-hidden aspect-[4/5]">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
        />
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#4B3621] shadow-sm">
            {item.category}
          </span>
        </div>

        <div className="absolute top-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
          <button 
            onClick={(e) => { e.stopPropagation(); setIsLiked(!isLiked); }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isLiked ? 'bg-[#E85D75] text-white' : 'bg-white text-[#4B3621] hover:bg-[#4B3621] hover:text-white'}`}
          >
            <Heart size={18} fill={isLiked ? "currentColor" : "none"} strokeWidth={isLiked ? 0 : 2.5} />
          </button>
        </div>

        <div className="absolute bottom-4 right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-75">
          <button className="w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-[#4B3621] hover:bg-[#4B3621] hover:text-white transition-all">
            <Maximize2 size={18} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-serif font-bold text-[#2D241C] text-lg leading-tight group-hover:text-[#4B3621] transition-colors">{item.name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-[#8C7B6B] text-sm font-medium opacity-80 uppercase tracking-widest">Vault Item</p>
          <div className="w-2 h-2 rounded-full bg-[#D4B499]"></div>
        </div>
      </div>
    </div>
  );
}

