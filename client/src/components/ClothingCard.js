// client/src/components/ClothingCard.js
import React from 'react';

export default function ClothingCard({ item }) {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 mb-6 group cursor-pointer animate-fade">
      <div className="relative overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-4 left-4">
          <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-neutral-800">
            {item.category}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-neutral-800 text-sm mb-1 truncate">{item.name}</h3>
        <p className="text-neutral-500 text-xs font-medium">${item.price.toFixed(2)}</p>
      </div>
    </div>
  );
}
