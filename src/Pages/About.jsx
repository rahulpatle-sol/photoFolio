"use client";
import { ShieldCheck, Zap, Globe, Cpu, Lock, Layers, BarChart3, Activity, Terminal } from "lucide-react";
import { motion } from "framer-motion";

export default function About() {
  // Animation Variants
  const containerReveal = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemReveal = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="py-40 bg-[#F9F7F2] text-[#1A1A1A] overflow-hidden relative">
      {/* Background Grid Accent */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '100px 100px' }} />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* --- ENTERPRISE HEADER --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-32 gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-3 mb-8">
              <span className="px-3 py-1 bg-black text-[#A68A56] text-[8px] font-black uppercase tracking-[0.3em] rounded-full">System v4.0</span>
              <div className="h-[1px] w-12 bg-black/10"></div>
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Enterprise Infrastructure</p>
            </div>
            <h2 className="text-[6vw] lg:text-[5vw] font-black leading-[0.9] uppercase tracking-tighter">
              Precision <span className="italic font-serif text-[#A68A56]">Engineering</span> <br />
              for Human Legacy.
            </h2>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-white p-6 rounded-3xl border border-black/[0.03] shadow-xl flex items-center gap-6"
          >
            <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-gray-400">Server Status</span>
                <span className="text-sm font-bold flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> 
                    Global Nodes Active
                </span>
            </div>
            <Activity className="text-[#A68A56]" size={32} />
          </motion.div>
        </div>

        {/* --- THE INTELLIGENCE BENTO GRID --- */}
        <motion.div 
          variants={containerReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-12 gap-6"
        >
          
          {/* 1. Processing Power (Large) */}
          <motion.div variants={itemReveal} className="col-span-12 lg:col-span-8 bg-white border border-black/[0.03] rounded-[3.5rem] p-12 relative overflow-hidden group">
            <div className="relative z-10 flex flex-col md:flex-row justify-between gap-12">
              <div className="max-w-sm">
                <div className="w-14 h-14 bg-black text-[#A68A56] rounded-2xl flex items-center justify-center mb-10 shadow-2xl">
                    <Cpu size={28} />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter mb-4 italic">Neural Processing</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-medium">
                  Our proprietary compression engine analyzes image vectors to preserve 100% of the emotional depth while reducing data weight.
                </p>
              </div>
              
              {/* Fake Mini Graph Display */}
              <div className="flex-1 bg-gray-50 rounded-3xl p-8 border border-black/5">
                <div className="flex justify-between items-end gap-2 h-32">
                   {[40, 70, 45, 90, 65, 80, 50, 95].map((h, i) => (
                     <motion.div 
                       key={i}
                       initial={{ height: 0 }}
                       whileInView={{ height: `${h}%` }}
                       transition={{ delay: i * 0.1, duration: 1 }}
                       className="flex-1 bg-black rounded-t-lg relative group"
                     >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-[8px] font-black opacity-0 group-hover:opacity-100 transition-opacity">
                            {h}%
                        </div>
                     </motion.div>
                   ))}
                </div>
                <div className="mt-6 pt-6 border-t border-black/5 flex justify-between">
                    <p className="text-[8px] font-black uppercase tracking-widest opacity-30">Throughput</p>
                    <p className="text-[8px] font-black uppercase tracking-widest text-[#A68A56]">8.2 GB/s</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* 2. Security Stat (Tall) */}
          <motion.div variants={itemReveal} className="col-span-12 lg:col-span-4 bg-[#1A1A1A] rounded-[3.5rem] p-12 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-10">
                <Lock size={120} />
            </div>
            <ShieldCheck size={48} className="text-[#A68A56]" />
            <div>
              <p className="text-6xl font-black tracking-tighter mb-4">99.9<span className="text-[#A68A56]">%</span></p>
              <h4 className="text-xl font-black uppercase tracking-tighter italic mb-4 text-[#A68A56]">Data Integrity</h4>
              <p className="text-xs text-white/40 leading-relaxed font-medium">
                Military-grade AES-256 encryption. We utilize cold-storage redundancy across 4 continents.
              </p>
            </div>
          </motion.div>

          {/* 3. Global Network (Wide) */}
          <motion.div variants={itemReveal} className="col-span-12 lg:col-span-12 bg-white border border-black/[0.03] rounded-[4rem] p-12 flex flex-col md:flex-row items-center gap-16 relative overflow-hidden">
            <div className="flex-1">
                <div className="flex items-center gap-4 mb-6">
                    <Globe size={24} className="text-[#A68A56]" />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-30">Network Expansion</span>
                </div>
                <h4 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-8 italic">Omnipresent <br/> Synchronization.</h4>
                <div className="grid grid-cols-3 gap-8">
                    <div>
                        <p className="text-2xl font-black">120+</p>
                        <p className="text-[8px] font-black uppercase tracking-widest opacity-30">Global Nodes</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black">0.02ms</p>
                        <p className="text-[8px] font-black uppercase tracking-widest opacity-30">Avg Latency</p>
                    </div>
                    <div>
                        <p className="text-2xl font-black">∞ TB</p>
                        <p className="text-[8px] font-black uppercase tracking-widest opacity-30">Scale Depth</p>
                    </div>
                </div>
            </div>
            <div className="flex-1 w-full bg-gray-50 rounded-[3rem] h-64 relative overflow-hidden flex items-center justify-center p-12">
               <div className="absolute inset-0 opacity-[0.05]" style={{backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '20px 20px'}} />
               <motion.div 
                 animate={{ scale: [1, 1.1, 1], rotate: 360 }}
                 transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                 className="relative z-10 w-48 h-48 border-2 border-dashed border-[#A68A56]/30 rounded-full flex items-center justify-center"
               >
                 <Layers size={48} className="text-[#A68A56]" />
               </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* --- TECHNICAL ARCHITECTURE BLOCK --- */}
        <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="mt-24 p-12 bg-white border border-black/[0.03] rounded-[4rem] shadow-sm relative overflow-hidden"
        >
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="flex-1">
               <div className="flex items-center gap-3 mb-8">
                  <Terminal size={18} className="text-[#A68A56]" />
                  <p className="text-[10px] font-black uppercase tracking-[0.4em]">Tech Stack Protocol</p>
               </div>
               <ul className="space-y-8">
                 {[
                   { t: "Multi-Region Mirroring", d: "Automatic failover between US-East, EU-West, and ASIA-South clusters." },
                   { t: "Quantum-Ready Encryption", d: "Next-gen cryptographic hashes to protect against future decryption threats." },
                   { t: "Biometric Handshake", d: "Secure device-level authentication using OAuth2 & WebAuthn standards." }
                 ].map((item, idx) => (
                   <li key={idx} className="group cursor-default">
                     <p className="text-[11px] font-black uppercase tracking-widest text-black group-hover:text-[#A68A56] transition-colors">{item.t}</p>
                     <p className="text-xs text-gray-400 mt-2 font-medium">{item.d}</p>
                   </li>
                 ))}
               </ul>
            </div>
            <div className="flex-1 w-full bg-black rounded-[3rem] p-10 h-[400px] flex flex-col justify-between relative shadow-2xl overflow-hidden">
                <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url(https://www.transparenttextures.com/patterns/carbon-fibre.png)'}} />
                <div className="relative z-10 flex justify-between items-start">
                    <BarChart3 className="text-[#A68A56]" size={40} />
                    <p className="text-[#A68A56] text-[10px] font-black uppercase tracking-widest italic">Live Architecture</p>
                </div>
                <div className="relative z-10 space-y-4">
                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{width: 0}} whileInView={{width: '75%'}} transition={{duration: 2}} className="h-full bg-[#A68A56]" />
                    </div>
                    <div className="h-2 w-[80%] bg-white/5 rounded-full overflow-hidden">
                        <motion.div initial={{width: 0}} whileInView={{width: '90%'}} transition={{duration: 2.5}} className="h-full bg-white/40" />
                    </div>
                    <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white/30">System Optimization Active</p>
                </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}