"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight, Camera } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Scroll detection for "Shrinking" effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  return (
    <>
      <nav className={`fixed left-1/2 -translate-x-1/2 z-[100] transition-all duration-700 ${scrolled ? 'top-4 w-[95%]' : 'top-8 w-[92%]'}`}>
        <div className="relative group bg-white/30 backdrop-blur-3xl border border-black/[0.03] px-6 md:px-12 py-5 rounded-[3rem] flex justify-between items-center shadow-[0_20px_80px_rgba(0,0,0,0.03)] overflow-hidden">
          
          {/* --- AMIRI LOGO SECTION --- */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 cursor-pointer relative z-10"
          >
            {/* The Logo Crest */}
            <div className="relative w-10 h-10 bg-[#1A1A1A] rounded-xl flex items-center justify-center overflow-hidden rotate-3 group-hover:rotate-0 transition-transform duration-500">
               <span className="text-[#A68A56] font-black text-xl italic tracking-tighter">PF</span>
               <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent" />
            </div>
            {/* Brand Name */}
            <div className="flex flex-col">
                <span className="text-sm font-black uppercase tracking-[0.3em] leading-none text-[#1A1A1A]">PHOTOFOLIO</span>
                <span className="text-[8px] font-bold uppercase tracking-[0.5em] text-[#A68A56] mt-1">Archive System</span>
            </div>
          </motion.div>

          {/* --- DESKTOP NAVIGATION (Magnetic Feel) --- */}
          <div className="hidden lg:flex gap-14 items-center">
            {['About', 'Vault', 'Pricing', 'Services'].map((link) => (
              <a 
                key={link} 
                href={`/${link.toLowerCase()}`} 
                className="relative text-[10px] font-black tracking-[0.4em] uppercase text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors group"
              >
                {link}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[#A68A56] transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* --- ACTION AREA --- */}
          <div className="flex items-center gap-4">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              className="hidden sm:flex items-center gap-3 px-8 py-3.5 bg-[#1A1A1A] text-[#A68A56] rounded-full text-[9px] font-black uppercase tracking-[0.3em] shadow-2xl hover:bg-black transition-all"
            >
              Access Vault <ArrowUpRight size={14} />
            </motion.button>
            
            {/* Menu Toggle Button */}
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-12 h-12 bg-white border border-black/5 rounded-full flex items-center justify-center hover:bg-gray-50 transition-all shadow-lg overflow-hidden group"
            >
              <div className={`absolute inset-0 bg-[#A68A56] transition-transform duration-500 ${isOpen ? 'translate-y-0' : 'translate-y-full'}`} />
              <div className="relative z-10">
                {isOpen ? <X size={20} className="text-black" /> : <Menu size={20} className="text-black group-hover:rotate-90 transition-transform duration-500" />}
              </div>
            </button>
          </div>

          {/* Subtle Shine Reflection */}
          <div className="absolute -left-full top-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-25deg] group-hover:left-[150%] transition-all duration-1000 ease-in-out" />
        </div>
      </nav>

      {/* --- LUXURY FULLSCREEN MENU --- */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[90] bg-[#F9F7F2] flex flex-col md:flex-row"
          >
            {/* Left Side: Visual/Video Content (Very Expensive Look) */}
            <div className="hidden md:block w-1/3 bg-[#1A1A1A] relative overflow-hidden">
                <img 
                    src="https://images.unsplash.com/photo-1542038784456-1ea8e935640e?q=80&w=1000" 
                    className="w-full h-full object-cover opacity-30 grayscale hover:scale-110 transition-transform duration-[2s]"
                    alt="Menu Art"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent" />
                <div className="absolute bottom-20 left-10">
                    <p className="text-[#A68A56] text-[10px] font-black uppercase tracking-[1em] mb-4">Current Edition</p>
                    <h3 className="text-white text-4xl font-serif italic uppercase tracking-tighter">Twenty Twenty Six</h3>
                </div>
            </div>

            {/* Right Side: Links */}
            <div className="flex-1 flex flex-col justify-center px-10 md:px-24 bg-[#F9F7F2]">
              <div className="space-y-4">
                {['Home', 'The Archive', 'Investment', 'Membership', 'Concierge'].map((item, i) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 + i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`/${item.toLowerCase().replace(' ', '-')}`}
                      className="group flex items-end gap-6 text-3xl md:text-[8vw] font-lite uppercase tracking-tighter text-[#1A1A1A] hover:italic hover:text-[#A68A56] transition-all leading-none"
                      onClick={() => setIsOpen(false)}
                    >
                      <span className="text-xs font-serif italic text-gray-300 group-hover:text-[#A68A56] pb-2">0{i+1}</span>
                      {item}
                    </a>
                  </motion.div>
                ))}
              </div>

              {/* Menu Socials & Contacts */}
              <div className="mt-20 pt-10 border-t border-black/5 flex flex-col md:flex-row gap-10 md:gap-32">
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Social Presence</p>
                    <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest">
                        <a href="#" className="hover:text-[#A68A56]">Instagram</a>
                        <a href="#" className="hover:text-[#A68A56]">Behance</a>
                        <a href="#" className="hover:text-[#A68A56]">Twitter</a>
                    </div>
                </div>
                <div className="space-y-4">
                    <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inquiries</p>
                    <p className="text-sm font-black italic tracking-tighter">concierge@photofolio.private</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}