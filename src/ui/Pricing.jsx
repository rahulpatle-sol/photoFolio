"use client";
import React, { useState } from "react";
import { Check, Plus, ArrowUpRight, Zap, Crown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Pricing() {
  const [activePlan, setActivePlan] = useState(1); // Default 1 for Curator (Premium)

  return (
    <section className="py-40 bg-[#F9F7F2] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        
        {/* Header Section */}
        <div className="text-center mb-24">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-[10px] font-black uppercase tracking-[0.6em] text-[#A68A56] mb-6"
          >
            Subscription Protocol
          </motion.p>
          <h2 className="text-[10vw] lg:text-[6vw] font-black leading-none uppercase tracking-tighter italic">
            Pick your <span className="text-[#A68A56] not-italic">Access.</span>
          </h2>
        </div>

        {/* --- INTERACTIVE PRICING GRID --- */}
        <div className="flex flex-col lg:flex-row gap-6 h-auto lg:h-[600px] transition-all duration-700 ease-in-out">
          
          {/* Plan 1: Collector */}
          <PricingCard 
            id={0}
            activePlan={activePlan}
            setActivePlan={setActivePlan}
            title="Collector"
            price="0"
            tag="Entry Level"
            icon={<Zap size={24} />}
            features={["1,000 Curated Assets", "Standard Encryption", "Mobile Access", "Public Profile"]}
            color="bg-white"
            textColor="text-black"
          />

          {/* Plan 2: Curator (The Premium One) */}
          <PricingCard 
            id={1}
            activePlan={activePlan}
            setActivePlan={setActivePlan}
            title="Curator"
            price="12"
            tag="Infinite Legacy"
            icon={<Crown size={24} />}
            features={["Unlimited Vault Storage", "8K Video Support", "Biometric Shield", "Custom Folio", "AI Smart Archiving"]}
            color="bg-[#1A1A1A]"
            textColor="text-white"
            isPremium
          />

        </div>

        <p className="text-center mt-20 text-[10px] font-bold uppercase tracking-[0.4em] opacity-20">
          Institutional Security as Standard
        </p>
      </div>
    </section>
  );
}

const PricingCard = ({ id, activePlan, setActivePlan, title, price, tag, icon, features, color, textColor, isPremium }) => {
  const isActive = activePlan === id;

  return (
    <motion.div
      onMouseEnter={() => setActivePlan(id)}
      onClick={() => setActivePlan(id)}
      layout
      className={`relative cursor-pointer overflow-hidden rounded-[3.5rem] p-10 flex flex-col transition-all duration-700 ease-[0.22, 1, 0.36, 1] shadow-2xl ${color} ${textColor} ${
        isActive ? "flex-[2.5]" : "flex-[1]"
      } min-h-[450px] lg:min-h-full`}
    >
      {/* Background Subtle Pattern */}
      {isPremium && (
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />
      )}

      {/* Top Header */}
      <div className="flex justify-between items-start relative z-10">
        <div className={`p-4 rounded-2xl ${isPremium ? 'bg-[#A68A56] text-black' : 'bg-black/5 text-[#A68A56]'}`}>
          {icon}
        </div>
        <AnimatePresence>
          {!isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-right"
            >
              <p className="text-[10px] font-black uppercase tracking-widest opacity-40 leading-none">Price</p>
              <p className="text-2xl font-black">${price}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Content Section */}
      <div className="mt-12 relative z-10 h-full flex flex-col justify-between">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.4em] mb-2 ${isPremium ? 'text-[#A68A56]' : 'opacity-40'}`}>
            {tag}
          </p>
          <h3 className="text-5xl font-black uppercase tracking-tighter mb-8 italic">
            {title}<span className="text-[#A68A56]">.</span>
          </h3>

          {/* Expandable Features */}
          <div className={`transition-all duration-700 overflow-hidden ${isActive ? "opacity-100 max-h-96" : "opacity-0 max-h-0"}`}>
            <div className="flex flex-col gap-4 mb-10">
              <p className="text-[4vw] lg:text-[3vw] font-black tracking-tighter mb-4 leading-none">
                ${price}<span className="text-sm opacity-40 font-bold uppercase tracking-widest">/month</span>
              </p>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((f, i) => (
                  <li key={i} className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest opacity-70">
                    <Check size={14} className="text-[#A68A56] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Button - Always visible but changes style */}
        <motion.button 
          layout
          className={`w-full py-6 rounded-full text-[10px] font-black uppercase tracking-[0.4em] transition-all duration-500 flex items-center justify-center gap-4 ${
            isPremium ? 'bg-[#A68A56] text-black hover:bg-white' : 'bg-black text-white hover:bg-[#A68A56] hover:text-black'
          }`}
        >
          {isActive ? "Secure Access" : "View Details"}
          <ArrowUpRight size={16} />
        </motion.button>
      </div>

      {/* Vertical Side Text (Visible when collapsed) */}
      {!isActive && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute bottom-32 left-1/2 -translate-x-1/2 rotate-[-90deg] whitespace-nowrap pointer-events-none hidden lg:block"
        >
          <p className="text-[10px] font-black uppercase tracking-[1em] opacity-10">
            Expand Plan Details
          </p>
        </motion.div>
      )}
    </motion.div>
  );
};