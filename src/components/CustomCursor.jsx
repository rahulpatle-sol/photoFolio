"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // 1. Mouse Movement Logic
    const moveCursor = (e) => {
      // Main Dot
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
      });
      // Outer Ring + Text Container
      gsap.to(followerRef.current, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    // 2. Continuous 360 Rotation for Text
    gsap.to(textRef.current, {
      rotate: 360,
      duration: 8,
      repeat: -1,
      ease: "none"
    });

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, []);

  return (
    <>
      {/* 1. Center Dot (Gold) */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#A68A56] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
      />

      {/* 2. Follower Container (Ring + Rotating Text) */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2"
      >
        {/* Outer Ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 border border-[#A68A56]/20 rounded-full" />

        {/* Rotating Circular Text */}
        <div ref={textRef} className="relative w-24 h-24 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <defs>
              <path
                id="circlePath"
                d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              />
            </defs>
            <text fill="#A68A56" className="text-[9px] font-bold uppercase tracking-[3px] opacity-60">
              <textPath xlinkHref="#circlePath">
                PHOTOFOLIO • MEMORIES • LEGACY • 
              </textPath>
            </text>
          </svg>
        </div>
      </div>
    </>
  );
}