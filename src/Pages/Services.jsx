"use client";
import { 
  Diamond, HardDrive, Share2, ShieldCheck, 
  Crown, Fingerprint, Zap, Globe, ArrowUpRight 
} from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: <HardDrive size={32} />,
    title: "Cold Storage",
    desc: "A physical-grade digital vault for high-res memories. Absolute quality, zero compression.",
    tag: "Archival"
  },
  {
    icon: <Fingerprint size={32} />,
    title: "Secure DNA",
    desc: "Single-tap biometric access. Your memories are locked behind your unique biological signature.",
    tag: "Security"
  },
  {
    icon: <Globe size={32} />,
    title: "Global CDN",
    desc: "120+ edge nodes worldwide. 4K content delivered with ultra-low latency.",
    tag: "Infrastructure"
  },
  {
    icon: <Crown size={32} />,
    title: "Legacy Shield",
    desc: "Data preservation designed for centuries. Format-proof recovery for your lineage.",
    tag: "Elite"
  }
];

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

export default function Services() {
  return (
    <section className="py-40 bg-[#F9F7F2] text-[#1A1A1A] relative overflow-hidden">
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#A68A56]/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        
        {/* --- LUXURY HEADER --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col md:flex-row justify-between items-end mb-32 border-b border-black/5 pb-16"
        >
          <div className="max-w-2xl">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "60px" }}
              transition={{ duration: 1.2, ease: "circOut" }}
              className="h-[2px] bg-[#A68A56] mb-10"
            />
            <p className="text-[10px] font-black uppercase tracking-[0.6em] text-[#A68A56] mb-6">Service Inventory v2.0</p>
            <h2 className="text-[7vw] lg:text-[5vw] font-black leading-[0.9] uppercase tracking-tighter italic text-[#121212]">
              The Suite of <br /> <span className="font-serif text-[#A68A56] not-italic">Preservation.</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
             <p className="text-[10px] font-black uppercase tracking-widest opacity-30 mb-2">Authenticated Access Only</p>
             <p className="text-sm font-serif italic text-[#A68A56]">Designed for the 0.1%</p>
          </div>
        </motion.div>

        {/* --- ANIMATED BENTO GRID --- */}
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-12 gap-6 lg:gap-8"
        >
          {services.map((service, i) => (
            <motion.div 
              key={i}
              variants={fadeInUp}
              whileHover={{ y: -12 }}
              className="col-span-12 md:col-span-6 lg:col-span-3 group bg-white rounded-[3.5rem] p-10 border border-black/[0.03] shadow-[0_10px_40px_rgba(0,0,0,0.02)] transition-all duration-700 relative overflow-hidden"
            >
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 bg-[#A68A56]/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-[#1A1A1A] text-[#A68A56] rounded-3xl flex items-center justify-center mb-12 shadow-xl group-hover:bg-[#A68A56] group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>
                
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#A68A56] mb-3">{service.tag}</p>
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 italic text-[#121212]">{service.title}</h3>
                <p className="text-xs leading-relaxed text-black/50 font-medium">{service.desc}</p>
                
                <div className="mt-12 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#A68A56] transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all">
                  Request Detail <ArrowUpRight size={14} />
                </div>
              </div>
            </motion.div>
          ))}

          {/* --- THE MASTER VAULT (BENTO HERO) --- */}
          <motion.div 
            variants={fadeInUp}
            className="col-span-12 bg-[#1A1A1A] rounded-[4.5rem] p-12 md:p-24 flex flex-col lg:flex-row items-center gap-20 relative overflow-hidden group shadow-[0_60px_120px_rgba(0,0,0,0.15)]"
          >
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" 
                 style={{ backgroundImage: 'radial-gradient(#A68A56 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            
            <div className="flex-1 z-10">
              <div className="flex items-center gap-4 mb-10">
                <div className="p-3 bg-[#A68A56] text-black rounded-full">
                  <Crown size={20} />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A68A56]">Executive Membership</p>
              </div>
              <h4 className="text-[#F9F7F2] text-6xl md:text-8xl font-black uppercase tracking-tighter leading-[0.85] mb-12">
                The Private <br /> <span className="font-serif italic text-[#A68A56]">Concierge.</span>
              </h4>
              <p className="text-white/40 text-xl max-w-md mb-12 leading-relaxed font-medium">
                We don't just host data. We curate human history. A dedicated archivist for your lifetime media library.
              </p>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-14 py-7 bg-[#A68A56] text-black rounded-full text-xs font-black uppercase tracking-[0.4em] shadow-2xl transition-all"
              >
                Apply for Access
              </motion.button>
            </div>

            <motion.div 
              whileInView={{ scale: [0.98, 1], rotate: [-1, 0] }}
              transition={{ duration: 1.2 }}
              className="flex-1 w-full h-[550px] bg-white/5 rounded-[4rem] relative overflow-hidden border border-white/10"
            >
               <img 
                src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=1200" 
                className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-[5s]" 
                alt="concierge" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A] to-transparent opacity-60" />
               <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-md rounded-3xl border border-white/10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#A68A56] mb-2">Vault Security Status</p>
                  <p className="text-white text-sm font-serif italic">Operational & Encrypted</p>
               </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* --- STATS FOOTER --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-40 grid grid-cols-2 lg:grid-cols-4 gap-12 border-t border-black/5 pt-20"
        >
          {[
            { label: "Data Integrity", val: "99.9%" },
            { label: "Global Sync", val: "0.01MS" },
            { label: "Encryption", val: "AES-256" },
            { label: "Storage", val: "INFINITE" }
          ].map((stat, idx) => (
            <div key={idx} className="space-y-3">
              <p className="text-4xl font-black tracking-tighter text-[#121212]">{stat.val}</p>
              <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#A68A56] opacity-60">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}