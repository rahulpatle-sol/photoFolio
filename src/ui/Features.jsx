"use client";
import React, { useEffect, useRef } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { ShieldCheck, HardDrive, Share2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { 
    id: "01", 
    title: "VAULT SECURITY", 
    desc: "Your memories are encrypted. Military-grade protection for your private legacy.", 
    img: "https://images.unsplash.com/photo-1557591954-9964a2709d1d?auto=format&fit=crop&w=800&q=80", 
    icon: <ShieldCheck className="text-black" size={24} />,
    accent: "bg-[#D1D1D1]" 
  },
  { 
    id: "02", 
    title: "INFINITE ARCHIVE", 
    desc: "Save every single heartbeat. High-resolution storage that never forgets a pixel.", 
    img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80", 
    icon: <HardDrive className="text-black" size={24} />,
    accent: "bg-[#E9E4D9]"
  },
  { 
    id: "03", 
    title: "LEGACY SHARING", 
    desc: "Pass down your story. Generate secure, beautiful links for your loved ones.", 
    img: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80", 
    icon: <Share2 className="text-black" size={24} />,
    accent: "bg-[#F9F7F2]"
  },
];

export default function Features() {
  const containerRef = useRef(null);

  useEffect(() => {
    const cards = gsap.utils.toArray(".feature-card");
    gsap.fromTo(cards, 
      { y: 150, opacity: 0, scale: 0.9 },
      { 
        y: 0, opacity: 1, scale: 1,
        stagger: 0.2, 
        duration: 1.2, 
        ease: "expo.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        }
      }
    );
  }, []);

  return (
    <section ref={containerRef} className="relative w-full py-40 bg-[#E9E4D9] overflow-hidden border-b border-black">
      
      {/* Header Section */}
      <div className="max-w-7xl mx-auto px-6 mb-32 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-black rounded-full mb-8">
            <Sparkles size={12} />
            <span className="text-[10px] font-black uppercase tracking-widest">Core Capabilities</span>
        </div>
        <h2 className="text-[10vw] font-black uppercase leading-[0.8] tracking-tighter text-[#1A1A1A]">
          DESIGNED TO <br /> <span className="font-serif italic text-black/30">LAST.</span>
        </h2>
      </div>

      {/* Draggable Cards Grid */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-12 px-6">
        {steps.map((step) => {
          const x = useMotionValue(0);
          const y = useMotionValue(0);
          const rotateX = useTransform(y, [-100, 100], [15, -15]);
          const rotateY = useTransform(x, [-100, 100], [-15, 15]);

          return (
            <motion.div
              key={step.id}
              drag
              dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                x.set(e.clientX - rect.left - rect.width / 2);
                y.set(e.clientY - rect.top - rect.height / 2);
              }}
              onMouseLeave={() => { x.set(0); y.set(0); }}
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="feature-card group relative w-full max-w-[380px] h-[550px] bg-white border border-black rounded-[3rem] p-4 cursor-grab active:cursor-grabbing shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all duration-300"
            >
              {/* Image Container */}
              <div className="h-[300px] w-full rounded-[2.5rem] overflow-hidden relative border border-black/10">
                 <img 
                    src={step.img} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" 
                    alt={step.title}
                 />
                 <div className="absolute top-6 right-6 bg-white border border-black p-4 rounded-full shadow-lg">
                    {step.icon}
                 </div>
              </div>

              {/* Text Content */}
              <div className="mt-10 px-6 space-y-4" style={{ transform: "translateZ(50px)" }}>
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-black/40 tracking-[0.3em]">{step.id}</span>
                    <div className="h-[1px] flex-grow mx-4 bg-black/10" />
                </div>
                <h3 className="text-3xl font-black uppercase tracking-tighter">{step.title}</h3>
                <p className="text-sm font-medium leading-relaxed text-black/60">{step.desc}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Decorative Bottom Text */}
      <div className="mt-32 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] opacity-20">Secure • Eternal • Shared</p>
      </div>
    </section>
  );
}