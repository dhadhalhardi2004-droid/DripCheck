// client/src/pages/AddClothes.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, ArrowRight } from 'lucide-react';

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
    <div className="page-wrapper animate-fade max-w-4xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Form Side */}
        <div className="bg-white p-8 rounded-[40px] shadow-premium border border-[#F0E8DD]">
          <div className="mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#2D241C]">Add to Vault</h2>
            <p className="text-[#8C7B6B] text-sm mt-1">Expand your personal collection with new drip.</p>
          </div>

          {message && <div className="bg-green-50 text-green-700 p-4 rounded-2xl text-sm font-bold mb-6 animate-fade">{message}</div>}
          {error && <div className="bg-red-50 text-red-700 p-4 rounded-2xl text-sm font-bold mb-6 animate-fade">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#BCAE99] ml-2">Item Name</label>
              <input
                type="text"
                name="name"
                className="w-full bg-[#FAF7F2] border border-[#F0E8DD] rounded-3xl px-6 py-4 outline-none focus:border-[#4B3621] transition-all"
                placeholder="Oversized Denim Jacket"
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#BCAE99] ml-2">Type</label>
                <select 
                  name="type" 
                  className="w-full bg-[#FAF7F2] border border-[#F0E8DD] rounded-3xl px-6 py-4 outline-none focus:border-[#4B3621] transition-all appearance-none capitalize" 
                  value={form.type} 
                  onChange={handleChange}
                >
                  {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[11px] font-black uppercase tracking-widest text-[#BCAE99] ml-2">Color</label>
                <input
                  type="text"
                  name="color"
                  className="w-full bg-[#FAF7F2] border border-[#F0E8DD] rounded-3xl px-6 py-4 outline-none focus:border-[#4B3621] transition-all"
                  placeholder="Beige"
                  value={form.color}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-black uppercase tracking-widest text-[#BCAE99] ml-2">Image URL</label>
              <input
                type="url"
                name="imageUrl"
                className="w-full bg-[#FAF7F2] border border-[#F0E8DD] rounded-3xl px-6 py-4 outline-none focus:border-[#4B3621] transition-all"
                placeholder="https://images.unsplash.com/..."
                value={form.imageUrl}
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#4B3621] text-white py-5 rounded-3xl font-bold hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-50 disabled:scale-100 mt-4 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? 'Archiving...' : (
                <>
                  Add to Wardrobe
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>
        </div>

        {/* AI Stylist Side */}
        <div className="space-y-8 lg:pt-12">
          {suggestion ? (
            <div className="bg-[#4B3621] text-white p-10 rounded-[48px] shadow-2xl relative overflow-hidden animate-fade">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Sparkles size={20} className="text-[#D4B499]" />
                  </div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-[#D4B499]">AI Stylist Tip</span>
                </div>
                <h3 className="text-3xl font-serif font-bold mb-4 leading-tight">"Perfect Pairing Found"</h3>
                <p className="text-white/80 text-lg leading-relaxed italic">
                  {suggestion}
                </p>
                <div className="mt-8 flex gap-2">
                  <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Color Theory</div>
                  <div className="px-4 py-2 bg-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest">Seasonal</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10 rounded-[48px] border-2 border-dashed border-[#F0E8DD] text-center space-y-4">
              <div className="w-16 h-16 bg-[#FAF7F2] rounded-full flex items-center justify-center mx-auto text-[#BCAE99]">
                <Sparkles size={32} />
              </div>
              <h3 className="text-[#2D241C] font-bold text-xl">Waiting for drip...</h3>
              <p className="text-[#8C7B6B] text-sm max-w-xs mx-auto">Enter an item's color and type to see smart styling suggestions from Drip AI.</p>
            </div>
          )}

          {form.imageUrl && (
            <div className="rounded-[48px] overflow-hidden shadow-premium border-8 border-white group relative aspect-[4/5] animate-fade">
              <img 
                src={form.imageUrl} 
                alt="Drip Preview" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                onError={(e) => e.target.style.display = 'none'} 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
              <div className="absolute bottom-8 left-8">
                <span className="text-white text-[10px] font-black uppercase tracking-widest block mb-1 opacity-70">Preview</span>
                <p className="text-white font-serif font-bold text-2xl">{form.name || "Unnamed Drip"}</p>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
