// client/src/pages/Wardrobe.js
import React, { useState, useMemo } from 'react';
import { clothesData } from '../data/clothes';
import ClothingCard from '../components/ClothingCard';
import SearchFilters from '../components/SearchFilters';
import DripAISuggestion from '../components/DripAISuggestion';
import { Sparkles, Plus } from 'lucide-react';

export default function Wardrobe({ setActiveTab }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);

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
    <div className="page-wrapper animate-fade max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-20">
      
      {/* --- HEADER SECTION --- */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div className="space-y-1">
          <span className="text-[#BCAE99] text-[10px] font-black tracking-[0.3em] uppercase block">Your Closet</span>
          <h1 className="text-[#2D241C] text-7xl md:text-8xl font-serif font-bold leading-none tracking-tight">Wardrobe</h1>
          <div className="flex items-center gap-4 pt-2">
            <p className="text-[#8C7B6B] text-sm md:text-base font-medium opacity-80">
              {filteredItems.length} pieces · ready to be remixed.
            </p>
            <div className="offline-badge m-0">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
              Vault Sync Active
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setIsSuggestionOpen(true)}
            className="bg-[#FAF7F2] border border-[#F0E8DD] text-[#4B3621] px-6 py-4 rounded-full flex items-center gap-3 hover:bg-white hover:shadow-lg transition-all text-sm font-bold"
          >
            <Sparkles size={18} />
            Get Suggestion
          </button>
          <button 
            onClick={() => setActiveTab && setActiveTab('add')}
            className="bg-[#4B3621] text-white px-8 py-4 rounded-full flex items-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-xl text-sm font-bold"
          >
            <Plus size={18} />
            Add piece
          </button>
        </div>
      </div>

      {/* AI Vibe Banner */}
      <div className="vibe-banner animate-fade mb-12 cursor-pointer hover:scale-[1.01] transition-transform" onClick={() => setIsSuggestionOpen(true)}>
        <div className="w-12 h-12 bg-[#FAF7F2] rounded-full flex items-center justify-center text-[#4B3621] shadow-inner flex-shrink-0">
           <Sparkles size={24} />
        </div>
        <div className="flex-1">
          <p className="text-[#4B3621] text-sm md:text-base font-medium font-serif italic">
            "Your wardrobe is giving effortlessly chic today. We've curated a few looks that match the sunny weather outside."
          </p>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#BCAE99] mt-1 block">Tap for AI Breakdown</span>
        </div>
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
        <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6 mt-10">
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

      {/* Modal */}
      <DripAISuggestion 
        isOpen={isSuggestionOpen} 
        onClose={() => setIsSuggestionOpen(false)} 
      />
    </div>
  );
}

