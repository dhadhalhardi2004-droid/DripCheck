// client/src/components/Footer.js
import React from 'react';
import { Mail, Globe, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#FAF7F2] pt-10 pb-20 px-6 sm:px-12">
      <div className="max-w-[1400px] mx-auto">
        
        {/* --- MAIN FOOTER CARDS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Join Card */}
          <div className="bg-[#F5EFE6] p-8 rounded-[40px] shadow-sm hover:shadow-md transition-all duration-500 border border-white/50 group">
            <h4 className="text-[#2D241C] text-2xl font-serif font-bold mb-4">Stay in the loop.</h4>
            <p className="text-[#8C7B6B] text-sm mb-8 leading-relaxed">Weekly drops of style inspiration and app updates. No noise, just drip.</p>
            <div className="relative">
              <input 
                type="email" 
                placeholder="Your email address" 
                className="w-full bg-white border-0 rounded-full px-6 py-4 text-sm outline-none focus:ring-2 focus:ring-[#4B3621]/10 placeholder:text-neutral-300"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#4B3621] rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                <ArrowUpRight className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>

          {/* Connect Card */}
          <div className="bg-[#F5EFE6] p-8 rounded-[40px] shadow-sm hover:shadow-md transition-all duration-500 border border-white/50">
            <h4 className="text-[#2D241C] text-2xl font-serif font-bold mb-4">Let's be friends.</h4>
            <p className="text-[#8C7B6B] text-sm mb-8 leading-relaxed">Follow our journey and see how others are using DripCheck globally.</p>
            <div className="flex gap-3 flex-wrap">
              {[
                { 
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>, 
                  label: 'Instagram' 
                },
                { 
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-1 2.17-2 2.85c.34 3.16-1.14 6.34-3.5 8.5-2.36 2.16-5.54 3.14-8.5 2.5-3.08-.66-5.5-3.2-6-6.5.6.14 1.2.2 1.8.2 2.1 0 3.94-.87 5.33-2.3a4.12 4.12 0 0 1-3.2-3.18c.3.1.62.14.94.14.4 0 .8-.06 1.2-.18a4.1 4.1 0 0 1-3.3-4.1v-.05c.62.35 1.34.56 2.1.58a4.1 4.1 0 0 1-1.27-5.46A11.64 11.64 0 0 0 13.5 12a4.1 4.1 0 0 1 7-3.9 8.24 8.24 0 0 0 2.6-1A4.1 4.1 0 0 1 22 4z"></path></svg>, 
                  label: 'Twitter' 
                },
                { icon: <Globe size={18} />, label: 'Web' }
              ].map(social => (
                <button key={social.label} className="flex items-center gap-2 bg-white px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest text-[#4B3621] hover:bg-[#4B3621] hover:text-white transition-all duration-300">
                  {social.icon} {social.label}
                </button>
              ))}
            </div>
          </div>

          {/* Help Card */}
          <div className="bg-[#F5EFE6] p-8 rounded-[40px] shadow-sm hover:shadow-md transition-all duration-500 border border-white/50 group cursor-pointer">
            <div className="flex justify-between items-start mb-4">
              <h4 className="text-[#2D241C] text-2xl font-serif font-bold">Need a hand?</h4>
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                 <Mail className="w-5 h-5 text-[#4B3621]" />
              </div>
            </div>
            <p className="text-[#8C7B6B] text-sm mb-8 leading-relaxed">Our support team is always here to help you optimize your digital closet.</p>
            <span className="text-[#4B3621] font-bold text-xs uppercase tracking-widest border-b-2 border-[#4B3621]/20 group-hover:border-[#4B3621] transition-all pb-1">
              Visit Help Center
            </span>
          </div>

        </div>

        {/* --- BOTTOM SECTION --- */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-10 border-t border-[#EAE2D5]">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-[#4B3621] rounded-lg flex items-center justify-center">
               <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3">
                 <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white"></polygon>
               </svg>
             </div>
             <span className="font-serif font-bold text-xl text-[#2D241C]">DripCheck</span>
          </div>

          <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#BCAE99]">
            <a href="#" className="hover:text-[#4B3621] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#4B3621] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#4B3621] transition-colors">Cookies</a>
          </div>

          <p className="text-[#BCAE99] text-[10px] font-bold tracking-widest uppercase">
            © 2026 DripCheck Inc.
          </p>
        </div>

      </div>
    </footer>
  );
}
