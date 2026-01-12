"use client";
import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Compass, Ghost } from "lucide-react";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#F9F7F2] flex items-center justify-center p-6 relative overflow-hidden">
      {/* --- LUXURY BACKGROUND ELEMENTS --- */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#A68A56]/10 blur-[120px] rounded-full animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-black/5 blur-[100px] rounded-full" />

      {/* --- FLOATING EMOJIS (The Fun Part) --- */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-[15%] text-6xl hidden md:block opacity-40 select-none"
      >
        🛰️
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-20 right-[15%] text-7xl hidden md:block opacity-40 select-none"
      >
        📂
      </motion.div>
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-1/2 right-[10%] text-5xl hidden md:block select-none"
      >
        ✨
      </motion.div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* --- BIG 404 DISPLAY --- */}
        <div className="relative inline-block mb-12">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[15vw] md:text-[10vw] font-black tracking-[1rem] leading-none text-[#1A1A1A] italic"
          >
            4<span className="text-[#A68A56]">0</span>4
          </motion.h1>
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            className="absolute -top-4 -right-8 md:-right-12 text-5xl md:text-7xl"
          >
            🧐
          </motion.div>
        </div>

        {/* --- MESSAGE --- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="space-y-6"
        >
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-[#1A1A1A]">
            Vault <span className="font-serif italic text-[#A68A56]">Not Found</span>
          </h2>
          <p className="text-gray-400 max-w-md mx-auto text-sm md:text-base font-medium leading-relaxed">
            The coordinates you provided lead to an empty corridor in the archive. This path is restricted or no longer exists.
          </p>
        </motion.div>

        {/* --- ACTIONS --- */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button 
            onClick={() => navigate(-1)}
            className="group flex items-center gap-3 px-10 py-5 bg-white border border-black/5 rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:bg-black hover:text-white transition-all shadow-xl"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> 
            Step Back
          </button>
          
          <button 
            onClick={() => navigate("/")}
            className="group flex items-center gap-3 px-10 py-5 bg-[#A68A56] text-black rounded-full text-[10px] font-black uppercase tracking-[0.3em] hover:scale-105 transition-all shadow-2xl"
          >
            <Compass size={16} className="group-hover:rotate-180 transition-transform duration-700" />
            The Main Hall
          </button>
        </motion.div>

        {/* --- DECORATIVE TAG --- */}
        <div className="mt-20 opacity-10 flex items-center justify-center gap-4">
            <div className="h-[1px] w-12 bg-black"></div>
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">PhotoFolio Security Protocol</p>
            <div className="h-[1px] w-12 bg-black"></div>
        </div>
      </div>
    </div>
  );
}