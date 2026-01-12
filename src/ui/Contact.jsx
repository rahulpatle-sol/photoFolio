"use client";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="relative py-40 bg-black text-[#E9E4D9] rounded-t-[5rem] lg:rounded-t-[8rem] overflow-hidden">
      
      {/* Moving Background Marquee (Luxury Flex) */}
      <div className="absolute top-10 flex whitespace-nowrap opacity-[0.03] select-none pointer-events-none">
        <motion.h2 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="text-[15vw] font-black uppercase tracking-tighter"
        >
          CONTACT THE VAULT — SECURE YOUR LEGACY — CONTACT THE VAULT — 
        </motion.h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-end">
          
          {/* Left Side: The "Rich" Statement */}
          <div className="space-y-12">
            <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A68A56]">Exclusive Access</p>
            <h2 className="text-[7vw] lg:text-[5vw] font-black leading-[0.9] uppercase tracking-tighter">
              Ready to go <br />
              <span className="font-serif italic text-[#A68A56]">Off-Chain?</span>
            </h2>
            <p className="max-w-md text-lg opacity-40 leading-relaxed font-medium">
              We don't do mass emails. If you value your digital history, let's have a private conversation about your legacy.
            </p>
          </div>

          {/* Right Side: The Interactive Portal */}
          <div className="bg-[#111] p-10 lg:p-16 rounded-[4rem] border border-white/5 shadow-2xl">
            <div className="space-y-8">
              <div className="group relative border-b border-white/10 pb-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30">Your Identity</label>
                <input 
                  type="text" 
                  placeholder="NAME / ORGANIZATION" 
                  className="w-full bg-transparent py-4 text-xl outline-none placeholder:opacity-20 focus:placeholder:opacity-0 transition-all font-serif italic"
                />
              </div>

              <div className="group relative border-b border-white/10 pb-4">
                <label className="text-[10px] font-black uppercase tracking-widest opacity-30">The Channel</label>
                <input 
                  type="email" 
                  placeholder="EMAIL ADDRESS" 
                  className="w-full bg-transparent py-4 text-xl outline-none placeholder:opacity-20 focus:placeholder:opacity-0 transition-all font-serif italic"
                />
              </div>

              {/* Liquid Button */}
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full group relative mt-10 py-8 bg-[#A68A56] text-black rounded-full overflow-hidden transition-all duration-500"
              >
                <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 flex items-center justify-center gap-4 text-[10px] font-black uppercase tracking-[0.4em]">
                  Request a Private Tour <ArrowUpRight size={16} />
                </span>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Bottom Social Links - Extra Amiri Feel */}
        <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-white/10 pt-10">
          {['Instagram', 'X / Twitter', 'LinkedIn', 'Vimeo'].map((social) => (
            <a key={social} href="#" className="flex justify-between items-center group opacity-40 hover:opacity-100 transition-opacity">
              <span className="text-[10px] font-black uppercase tracking-widest">{social}</span>
              <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}