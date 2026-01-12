"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type'; // Isse text lines mein divide hoga

// Components
import Hero from '../ui/Hero'; 
import LatestWork from '../ui/LatestWork'; 
import Features from '../ui/Features';
import Pricing from '../ui/Pricing';

gsap.registerPlugin(ScrollTrigger);

export default function Landing() {
  const containerRef = useRef(null);
  const philosophyTextRef = useRef(null);

  useEffect(() => {
    // 1. Split Text into Lines
    const text = new SplitType(philosophyTextRef.current, { types: 'lines' });

    // 2. Animate each line
    text.lines.forEach((line) => {
      // Har line ke upar ek "overlay" ya gradient mask chalayenge
      gsap.fromTo(line, 
        { 
          color: "rgba(26, 26, 26, 0.1)", // Faded color pehle
        },
        { 
          color: "rgba(26, 26, 26, 1)",   // Full dark color baad mein
          scrollTrigger: {
            trigger: line,
            start: "top 70%", // Jab line screen ke 70% par aaye
            end: "top 40%",   // Jab line 40% tak pahuche
            scrub: true,
          }
        }
      );
    });

    // Cleanup function
    return () => {
      text.revert(); // Page leave karne par original text wapas aa jaye
    };
  }, []);

  return (
    <main ref={containerRef} className="bg-[#E9E4D9]">
      
      <section className="min-h-screen border-b border-black">
        
        <Hero />
      </section>

      {/* Philosophy Section with LINE-BY-LINE Reveal */}
      <section className="philosophy-section py-60 px-10 bg-[#F9F7F2] border-b border-black flex flex-col items-center justify-center text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase mb-10 opacity-50">Our Philosophy</p>
        
        <h2 
          ref={philosophyTextRef}
          className="text-[7vw] font-sans-bold leading-[1.1] uppercase tracking-tighter max-w-6xl"
        >
          We don't just store <span className="font-serif italic">pixels</span>, we preserve the <span className="font-serif italic">soul</span> of your journey.
        </h2>
      </section>

      <section className="bg-[#E9E4D9] border-b border-black">
        <Features />
      </section>

      <section className="bg-[#F9F7F2]">
        <LatestWork />
      </section>

      {/* Footer code same rahega... */}
      <Pricing/>
    </main>
  );
}