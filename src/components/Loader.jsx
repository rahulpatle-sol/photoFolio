"use client";
import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { Camera } from "lucide-react";

export default function Loader({ finishLoading }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const lensRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        // Exit Animation
        gsap.to(containerRef.current, {
          yPercent: -100,
          duration: 1.2,
          ease: "expo.inOut",
          onComplete: finishLoading
        });
      },
    });

    // 1. Initial State
    gsap.set(".char", { y: 0, opacity: 1 });
    gsap.set(lensRef.current, { scale: 0, opacity: 0 });

    // 2. Character Collapse Animation
    // Har ek letter niche "collapse" hoga aur gayab hoga
    tl.to(".char", {
      y: 100,
      opacity: 0,
      stagger: 0.05,
      duration: 0.8,
      ease: "back.in(1.7)",
      delay: 0.5
    })

    // 3. Camera Lens Reveal
    // Letters girte hi Lens emerge hoga
    .to(lensRef.current, {
      scale: 1,
      opacity: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.7)"
    }, "-=0.3")

    // 4. The "Flash" Click
    // Screen ek baar puri white hogi jaise photo click hui ho
    .to(".flash-overlay", {
      opacity: 1,
      duration: 0.05,
      repeat: 1,
      yoyo: true
    })

    // 5. Final Hold (Jab tak data load feel na ho)
    .to(lensRef.current, {
      scale: 1.1,
      duration: 1,
      ease: "power2.inOut"
    });

  }, [finishLoading]);

  const brand = "PHOTOFOLIO";

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[9999] bg-[#1A1A1A] flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Flash Effect Layer */}
      <div className="flash-overlay absolute inset-0 bg-white opacity-0 z-[10000] pointer-events-none" />

      <div className="relative flex flex-col items-center">
        
        {/* Animated Text (Collapsing Letters) */}
        <div ref={textRef} className="flex overflow-hidden pb-10">
          {brand.split("").map((char, i) => (
            <span 
              key={i} 
              className="char inline-block text-white text-6xl md:text-8xl font-black tracking-tighter"
            >
              {char}
            </span>
          ))}
          <span className="char text-[#A68A56] text-6xl md:text-8xl font-black">.</span>
        </div>

        {/* Camera Lens (Emerges after collapse) */}
        <div ref={lensRef} className="absolute flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border-2 border-[#A68A56] flex items-center justify-center bg-white/5 backdrop-blur-md shadow-[0_0_50px_rgba(166,138,86,0.2)]">
               <Camera size={40} className="text-[#A68A56]" strokeWidth={1.5} />
            </div>
            {/* Spinning Lens Detail */}
            <div className="absolute inset-0 border-t-2 border-white/20 rounded-full animate-spin-slow" />
          </div>
          <p className="mt-6 text-[10px] font-black uppercase tracking-[1em] text-[#A68A56] animate-pulse">
            Capturing...
          </p>
        </div>

      </div>

      {/* Luxury Brand Tag */}
      <div className="absolute bottom-12 flex flex-col items-center opacity-20">
        <p className="text-[8px] font-black uppercase tracking-[0.5em] text-white mb-2">Private Access Only</p>
        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-white to-transparent"></div>
      </div>

      <style jsx>{`
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}