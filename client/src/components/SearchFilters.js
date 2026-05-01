// client/src/components/SearchFilters.js
import React from 'react';

export default function SearchFilters({ searchTerm, setSearchTerm, activeCategory, setActiveCategory }) {
  const categories = ['all', 'top', 'bottom', 'shoes', 'outerwear', 'dress'];

  return (
    <div className="mb-12 space-y-8">
      {/* Search Bar */}
      <div className="relative group max-w-2xl w-full">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-neutral-800 transition-colors">
          <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="M21 21l-4.35-4.35"></path>
          </svg>
        </div>
        <input
          type="text"
          placeholder="Search your drip..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-white border border-[#F0E8DD] rounded-full pl-14 pr-6 py-4 text-sm shadow-sm focus:shadow-md focus:border-[#4B3621]/20 transition-all duration-300 outline-none placeholder:text-neutral-300"
        />
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-4 overflow-x-auto pb-2 no-scrollbar">
        <div className="text-[#4B3621] opacity-60">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="4" y1="21" x2="4" y2="14"></line>
            <line x1="4" y1="10" x2="4" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="12"></line>
            <line x1="12" y1="8" x2="12" y2="3"></line>
            <line x1="20" y1="21" x2="20" y2="16"></line>
            <line x1="20" y1="12" x2="20" y2="3"></line>
            <line x1="1" y1="14" x2="7" y2="14"></line>
            <line x1="9" y1="8" x2="15" y2="8"></line>
            <line x1="17" y1="16" x2="23" y2="16"></line>
          </svg>
        </div>
        <div className="flex gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-7 py-2.5 rounded-full text-sm font-bold capitalize transition-all duration-300 whitespace-nowrap border ${
                activeCategory === cat
                  ? 'bg-[#4B3621] text-white border-[#4B3621]'
                  : 'bg-white text-[#4B3621] border-[#F0E8DD] hover:border-[#4B3621]/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
