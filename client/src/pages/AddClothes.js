// client/src/pages/AddClothes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, ArrowRight, Upload, Info } from 'lucide-react';

export default function AddClothes({ setActiveTab }) {
  const [form, setForm] = useState({ name: '', type: 'top', color: '', imageUrl: '' });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [suggestion, setSuggestion] = useState(null);

  const categories = ['top', 'bottom', 'shoes', 'outerwear', 'dress', 'bags', 'accessories'];

  const getStylingTip = (type, color) => {
    if (!color) return null;
    
    const colorLower = color.toLowerCase();
    const typeLower = type.toLowerCase();

    const tips = {
      black: { pairing: "white, cream, or light grey", vibe: "classic monochrome" },
      white: { pairing: "denim blue, navy, or earthy browns", vibe: "clean and breezy" },
      beige: { pairing: "olive green, charcoal, or deep chocolate", vibe: "quiet luxury" },
      navy: { pairing: "tan, white, or mustard yellow", vibe: "nautical chic" },
      brown: { pairing: "cream, sky blue, or forest green", vibe: "earthy and grounded" },
      denim: { pairing: "white, black, or pop of red", vibe: "effortless cool" },
      grey: { pairing: "pastel pink, lavender, or black", vibe: "modern minimal" },
    };

    const config = tips[colorLower] || { pairing: "neutrals or complementary tones", vibe: "unique and personalized" };
    
    let advice = "";
    if (typeLower === 'top') {
      advice = `This ${color} ${type} would look stunning with ${config.pairing} bottoms for a ${config.vibe} look.`;
    } else if (typeLower === 'bottom') {
      advice = `Try pairing this ${color} ${type} with a ${config.pairing} top to achieve that ${config.vibe} aesthetic.`;
    } else if (typeLower === 'shoes') {
      advice = `These ${color} ${type} are the perfect anchor for an outfit featuring ${config.pairing} tones.`;
    } else {
      advice = `Adding this ${color} ${type} will elevate any fit that uses ${config.pairing}.`;
    }

    return advice;
  };

  useEffect(() => {
    if (form.color && form.type) {
      const tip = getStylingTip(form.type, form.color);
      setSuggestion(tip);
    } else {
      setSuggestion(null);
    }
  }, [form.color, form.type]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const userStr = localStorage.getItem('user');
      const loggedInUser = userStr ? JSON.parse(userStr) : null;

      const payload = { ...form };
      if (loggedInUser && loggedInUser._id) {
        payload.userId = loggedInUser._id;
      }

      await axios.post("http://localhost:4000/api/clothes", payload, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage("Item effectively added to vault.");
      setForm({ name: '', type: 'top', color: '', imageUrl: '' });
      setTimeout(() => setActiveTab('wardrobe'), 1500);
    } catch (err) {
      console.error(err);
      setError("Failed to add item to vault.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper animate-fade w-full px-6 py-12 lg:py-20">
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-6">
        <div>
          <span className="text-[#BCAE99] text-[10px] font-black tracking-[0.3em] uppercase block mb-2">Vault Entry</span>
          <h1 className="text-[#2D241C] text-5xl md:text-6xl font-serif font-bold leading-tight">Archive New Piece</h1>
        </div>
        <div className="bg-[#FAF7F2] p-4 rounded-2xl flex items-center gap-4 border border-[#F0E8DD]">
          <div className="w-10 h-10 bg-[#4B3621] text-white rounded-full flex items-center justify-center">
            <Info size={18} />
          </div>
          <p className="text-[#8C7B6B] text-xs font-medium max-w-[200px]">
            AI Stylist will automatically analyze your new piece for pairing suggestions.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Form Side */}
        <div className="lg:col-span-7 bg-white p-10 md:p-14 rounded-[56px] shadow-premium border border-[#F0E8DD]">
          <div className="mb-10">
            <h2 className="text-2xl font-serif font-bold text-[#2D241C]">Piece Details</h2>
            <p className="text-[#8C7B6B] text-sm mt-1">Tell us about your new addition to the collection.</p>
          </div>

          {message && <div className="bg-green-50 text-green-700 p-5 rounded-3xl text-sm font-bold mb-8 animate-fade flex items-center gap-3 border border-green-100">
            <div className="w-2 h-2 rounded-full bg-green-500"></div>
            {message}
          </div>}
          
          {error && <div className="bg-red-50 text-red-700 p-5 rounded-3xl text-sm font-bold mb-8 animate-fade border border-red-100">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#BCAE99] ml-4">Item Name</label>
              <input
                type="text"
                name="name"
                className="w-full bg-[#FAF7F2] border border-[#F0E8DD] rounded-[28px] px-8 py-5 outline-none focus:border-[#4B3621] focus:bg-white transition-all text-[#2D241C] font-medium"
                placeholder="e.g., Oversized Cashmere Sweater"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#BCAE99] ml-4">Category</label>
                <div className="relative">
                  <select 
                    name="type" 
                    className="w-full bg-[#FAF7F2] border border-[#F0E8DD] rounded-[28px] px-8 py-5 outline-none focus:border-[#4B3621] focus:bg-white transition-all appearance-none capitalize text-[#2D241C] font-medium" 
                    value={form.type} 
                    onChange={handleChange}
                  >
                    {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-[#BCAE99]">
                    <ArrowRight size={16} className="rotate-90" />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#BCAE99] ml-4">Primary Color</label>
                <input
                  type="text"
                  name="color"
                  className="w-full bg-[#FAF7F2] border border-[#F0E8DD] rounded-[28px] px-8 py-5 outline-none focus:border-[#4B3621] focus:bg-white transition-all text-[#2D241C] font-medium"
                  placeholder="e.g., Charcoal"
                  value={form.color}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#BCAE99] ml-4">Visual Link (Image URL)</label>
              <div className="relative">
                <input
                  type="url"
                  name="imageUrl"
                  className="w-full bg-[#FAF7F2] border border-[#F0E8DD] rounded-[28px] px-8 py-5 outline-none focus:border-[#4B3621] focus:bg-white transition-all text-[#2D241C] font-medium"
                  placeholder="Paste Unsplash or Pinterest link..."
                  value={form.imageUrl}
                  onChange={handleChange}
                />
                <div className="absolute right-6 top-1/2 -translate-y-1/2 text-[#BCAE99]">
                  <Upload size={18} />
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#4B3621] text-white py-6 rounded-[32px] font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-2xl disabled:opacity-50 disabled:scale-100 mt-6 flex items-center justify-center gap-3 text-lg"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Archiving...
                </div>
              ) : (
                <>
                  Confirm to Vault
                  <ArrowRight size={20} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Stylist Side */}
        <div className="lg:col-span-5 space-y-8">
          
          {/* Suggestion Card */}
          <div className={`transition-all duration-700 transform ${suggestion ? 'opacity-100 translate-y-0' : 'opacity-60 translate-y-4'}`}>
            {suggestion ? (
              <div className="bg-[#4B3621] text-white p-12 rounded-[56px] shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-48 h-48 bg-white/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                      <Sparkles size={24} className="text-[#D4B499]" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-[#D4B499]">AI Insight</span>
                  </div>
                  <h3 className="text-3xl font-serif font-bold mb-6 leading-tight">"A Versatile Choice"</h3>
                  <p className="text-white/80 text-xl leading-relaxed italic font-serif">
                    {suggestion}
                  </p>
                  <div className="mt-10 pt-10 border-t border-white/10 flex flex-wrap gap-3">
                    <div className="px-5 py-2.5 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Color Theory</div>
                    <div className="px-5 py-2.5 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Seasonal</div>
                    <div className="px-5 py-2.5 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Vibe Check</div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-16 rounded-[56px] border-2 border-dashed border-[#F0E8DD] text-center space-y-6 bg-[#FAF7F2]/30">
                <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto text-[#BCAE99] shadow-soft">
                  <Sparkles size={36} />
                </div>
                <div>
                  <h3 className="text-[#2D241C] font-bold text-2xl">Waiting for Drip...</h3>
                  <p className="text-[#8C7B6B] text-base max-w-xs mx-auto mt-2">Enter an item's color and category to see smart styling suggestions.</p>
                </div>
              </div>
            )}
          </div>

          {/* Preview Card */}
          <div className={`transition-all duration-700 ${form.imageUrl ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}>
            <div className="rounded-[56px] overflow-hidden shadow-2xl border-[12px] border-white group relative aspect-[3/4] bg-[#FAF7F2]">
              {form.imageUrl && (
                <img 
                  src={form.imageUrl} 
                  alt="Drip Preview" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  onError={(e) => e.target.style.display = 'none'} 
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10">
                <span className="text-white/70 text-[10px] font-black uppercase tracking-widest block mb-2">Vault Preview</span>
                <p className="text-white font-serif font-bold text-3xl mb-1">{form.name || "Untitled Piece"}</p>
                <div className="flex gap-2">
                   <span className="text-white/60 text-xs font-bold uppercase tracking-wider">{form.type}</span>
                   <span className="text-white/60 text-xs font-bold uppercase tracking-wider">·</span>
                   <span className="text-white/60 text-xs font-bold uppercase tracking-wider">{form.color}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

