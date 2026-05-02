// client/src/pages/Wardrobe.js
import React, { useState, useMemo } from 'react';
import { clothesData } from '../data/clothes';
import ClothingCard from '../components/ClothingCard';
import SearchFilters from '../components/SearchFilters';

export default function Wardrobe() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  // Filtering Logic
  const filteredItems = useMemo(() => {
    return clothesData.filter((item) => {
      const searchTermLower = searchTerm.toLowerCase();
      const matchesSearch = item.name.toLowerCase().includes(searchTermLower) || 
                            item.category.toLowerCase().includes(searchTermLower);
      const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="page-wrapper animate-fade max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      
      {/* --- HEADER SECTION --- */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <span className="text-[#BCAE99] text-[10px] font-black tracking-[0.3em] uppercase block">Your Closet</span>
          <h1 className="text-[#2D241C] text-7xl md:text-8xl font-serif font-bold leading-none tracking-tight">Wardrobe</h1>
          <p className="text-[#8C7B6B] text-sm md:text-base font-medium opacity-80 pt-1">
            {filteredItems.length} pieces · ready to be remixed into infinite fits.
          </p>
          
          {/* Offline Badge */}
          <div className="offline-badge">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="1" y1="1" x2="23" y2="23"></line>
              <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55"></path>
              <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39"></path>
              <path d="M10.71 5.05A16 16 0 0 1 22.58 9"></path>
              <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88"></path>
              <path d="M8.53 16.11a6 6 0 0 1 6.95 0"></path>
              <line x1="12" y1="20" x2="12.01" y2="20"></line>
            </svg>
            Offline · showing your saved closet
          </div>
        </div>

        <button className="bg-[#4B3621] text-white px-10 py-4 rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl text-sm font-bold mt-4 md:mt-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add piece
        </button>
      </div>

      {/* AI Vibe Banner */}
      <div className="vibe-banner animate-fade">
        <div className="w-10 h-10 bg-[#FAF7F2] rounded-full flex items-center justify-center text-[#4B3621] shadow-inner flex-shrink-0">
           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
             <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364-.707.707M6.343 17.657l-.707.707m0-12.728.707.707m11.314 11.314.707.707M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
           </svg>
        </div>
        <p className="text-[#4B3621] text-sm md:text-base font-medium font-serif italic">
          your wardrobe is giving effortlessly chic, ready for anything from a coffee run to a cute dinner date. 💅✨
        </p>
      </div>

      {/* Search & Filters */}
      <SearchFilters 
        searchTerm={searchTerm} 
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {/* Pinterest-style Masonry Grid */}
      {filteredItems.length > 0 ? (
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6">
          {filteredItems.map((item) => (
            <ClothingCard key={item.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade">
          <div className="bg-white p-8 rounded-3xl shadow-soft mb-4">
            <svg width="48" height="48" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" className="text-neutral-300">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-neutral-800">No drip found 😢</h3>
          <p className="text-neutral-500 mt-2">Try adjusting your search or filters to find what you're looking for.</p>
          <button 
            onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
            className="mt-6 text-sm font-bold text-neutral-800 hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}
