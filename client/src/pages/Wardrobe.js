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
      <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <span className="text-[#BCAE99] text-[11px] font-black tracking-[0.2em] uppercase mb-3 block">Your Closet</span>
          <h1 className="text-[#2D241C] text-5xl md:text-7xl font-serif font-bold leading-tight mb-2">Wardrobe</h1>
          <p className="text-[#8C7B6B] text-base md:text-lg font-medium">
            {filteredItems.length} pieces · ready to be remixed into infinite fits.
          </p>
        </div>
        <button className="bg-[#4B3621] text-white px-8 py-3.5 rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg text-sm font-bold">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add piece
        </button>
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
