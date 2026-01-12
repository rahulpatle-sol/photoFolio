"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Instagram, Twitter, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const [time, setTime] = useState("");

  // Live Precision Clock
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <footer className="relative bg-[#433f38] text-[#1A1A1A] pt-40 pb-12 px-6 lg:px-16 border-t border-black/5 overflow-hidden">
      
      {/* Background Brand Watermark */}
      <div className="absolute -bottom-10 left-0 right-0 opacity-[0.02] select-none pointer-events-none text-center">
        <h2 className="text-[25vw] font-black leading-none tracking-tighter">PHOTOFOLIO</h2>
      </div>

      <div className="max-w-[1400px] mx-auto relative z-10">
        
        {/* Top Section: Branding & CTA */}
        <div className="grid grid-cols-12 gap-10 mb-32">
          <div className="col-span-12 lg:col-span-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="space-y-8"
            >
              <h2 className="text-[10vw] lg:text-[7vw] font-black leading-[0.8] uppercase tracking-tighter italic">
                Secure your <br />
                <span className="text-[#A68A56] font-serif not-italic underline underline-offset-[20px] decoration-1">Legacy</span> now.
              </h2>
              <p className="text-xl text-gray-400 font-medium max-w-lg leading-relaxed pt-6">
                Currently curating private archives for the 2026 collection. Limited slots available for institutional storage.
              </p>
            </motion.div>
          </div>

          <div className="col-span-12 lg:col-span-4 flex flex-col justify-end items-start lg:items-end">
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               className="group relative w-48 h-48 border border-black/10 rounded-full flex flex-col items-center justify-center transition-all hover:bg-black hover:text-[#F9F7F2] overflow-hidden shadow-2xl bg-white"
             >
                <span className="text-[10px] font-black uppercase tracking-[0.3em] mb-2">Connect</span>
                <ArrowUpRight size={32} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500 text-[#A68A56]" />
             </motion.button>
          </div>
        </div>

        {/* Middle Section: Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-t border-black/5 pt-20 pb-20">
          <div className="space-y-8">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A68A56]">Navigation</p>
            <ul className="space-y-4 text-sm font-bold uppercase tracking-widest">
              {['Home', 'The Vault', 'Membership', 'Concierge'].map((item) => (
                <li key={item} className="hover:text-[#A68A56] cursor-pointer transition-all flex items-center gap-2 group">
                  <span className="w-0 h-[1px] bg-[#A68A56] group-hover:w-4 transition-all" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-8">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A68A56]">Social presence</p>
            <div className="flex gap-6">
               <Instagram size={20} className="hover:text-[#A68A56] cursor-pointer transition-colors" />
               <Twitter size={20} className="hover:text-[#A68A56] cursor-pointer transition-colors" />
               <Linkedin size={20} className="hover:text-[#A68A56] cursor-pointer transition-colors" />
               <Github size={20} className="hover:text-[#A68A56] cursor-pointer transition-colors" />
            </div>
            <p className="text-[10px] font-medium text-gray-400 leading-relaxed uppercase tracking-widest">Follow for architectural updates.</p>
          </div>

          <div className="space-y-8">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A68A56]">System Pulse</p>
            <div className="flex flex-col gap-2">
               <p className="text-3xl font-black italic tracking-tighter text-[#1A1A1A]">{time}</p>
               <p className="text-[9px] font-bold opacity-30 uppercase tracking-widest italic">Precision GMT+5:30</p>
            </div>
          </div>

          <div className="space-y-8 text-right flex flex-col items-end">
             <div className="w-12 h-12 bg-black text-white rounded-xl flex items-center justify-center font-black">PF</div>
             <p className="text-[10px] font-bold text-gray-400 uppercase leading-loose text-right">
                Vault Status: <span className="text-green-600">Operational</span> <br />
                Cloud Mirroring: <span className="text-[#A68A56]">Active</span> <br />
                Security: <span className="text-indigo-600">AES-256</span>
             </p>
          </div>
        </div>

        {/* Bottom Strip: The Signature */}
        <div className="pt-10 border-t border-black/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
             <h3 className="text-2xl font-black tracking-tighter uppercase italic">PHOTOFOLIO<span className="text-[#A68A56]">.</span></h3>
             <span className="text-[8px] font-black px-2 py-1 border border-black/10 rounded uppercase tracking-widest opacity-40">Certified Architecture</span>
          </div>
          
          <div className="flex gap-10">
             <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Privacy Agreement</p>
             <p className="text-[9px] font-black uppercase tracking-[0.4em] opacity-30">Legal Archive 2026</p>
          </div>

          <p className="text-[10px] font-black uppercase tracking-[0.3em] italic text-[#A68A56]">
             DESIGNED FOR THE ELITE ©
          </p>
        </div>
      </div>
    </footer>
  );
}