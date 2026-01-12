"use client";
import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function Contact() {
  const buttonRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const mouseMove = (e) => {
    const { clientX, clientY } = e;
    const { width, height, left, top } = buttonRef.current.getBoundingClientRect();
    const x = clientX - (left + width / 2);
    const y = clientY - (top + height / 2);
    setPosition({ x: x * 0.3, y: y * 0.3 }); // 30% attraction power
  };

  const mouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  return (
    <section className="h-screen flex flex-col items-center justify-center bg-[#1A1A1A] text-[#F9F7F2] rounded-t-[5rem]">
      <span className="text-xs tracking-[0.5em] uppercase mb-8 opacity-50">Ready to preserve your story?</span>
      
      <h2 className="text-[10vw] font-serif italic mb-20 leading-none">Get in Touch</h2>

      <motion.button
        ref={buttonRef}
        onMouseMove={mouseMove}
        onMouseLeave={mouseLeave}
        animate={{ x: position.x, y: position.y }}
        transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        className="w-64 h-64 bg-[#A68A56] rounded-full flex items-center justify-center text-xl font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-500"
      >
        Start Now
      </motion.button>

      <div className="mt-40 grid grid-cols-2 md:grid-cols-4 gap-20 text-[10px] font-bold tracking-widest uppercase opacity-40">
        <p>Instagram</p>
        <p>Twitter</p>
        <p>LinkedIn</p>
        <p>Vimeo</p>
      </div>
    </section>
  );
}