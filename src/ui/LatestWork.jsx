"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const works = [
  { 
    url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34", 
    title: "Parisian Legacy", 
    size: "col-span-2 row-span-2", // Badi image
    parallax: 0.2 
  },
  { 
    url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e", 
    title: "Alps Archive", 
    size: "col-span-1 row-span-1", 
    parallax: 0.5 
  },
  { 
    url: "https://images.unsplash.com/photo-1519741497674-611481863552", 
    title: "Eternal Unions", 
    size: "col-span-1 row-span-2", // Lambi image
    parallax: 0.3 
  },
  { 
    url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf", 
    title: "Tokyo Neon", 
    size: "col-span-1 row-span-1", 
    parallax: 0.6 
  }
];

export default function LatestWork() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Parallax Effect for each image
    const items = gsap.utils.toArray(".bento-item");
    items.forEach((item) => {
      const img = item.querySelector("img");
      const speed = item.dataset.speed || 0.1;

      gsap.to(img, {
        yPercent: 20 * speed,
        ease: "none",
        scrollTrigger: {
          trigger: item,
          start: "top bottom",
          scrub: true,
        }
      });
    });
  }, []);

  return (
    <section id="work" ref={containerRef} className="py-40 bg-[#E9E4D9] px-6 lg:px-20 border-b border-black">
      
      {/* Header with Luxury Typography */}
      <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-10">
        <h2 className="text-[10vw] font-sans-bold uppercase leading-[0.8] tracking-tighter">
          USER <br /> <span className="font-serif italic text-[#A68A56]">FOLIOS</span>
        </h2>
        <p className="max-w-[250px] text-[10px] font-bold uppercase tracking-[0.2em] leading-relaxed opacity-60">
          A CURATED SELECTION OF MEMORIES PRESERVED WITHIN OUR PRIVATE VAULTS.
        </p>
      </div>

      {/* The Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] lg:auto-rows-[400px]">
        {works.map((work, i) => (
          <div 
            key={i} 
            data-speed={work.parallax}
            className={`bento-item group relative overflow-hidden rounded-[3rem] border border-black/10 ${work.size}`}
          >
            {/* Image with Parallax Scale */}
            <img 
              src={work.url} 
              className="w-full h-[120%] object-cover absolute top-[-10%] transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0" 
              alt={work.title}
            />

            {/* Premium Overlay: Glassmorphism Card on Hover */}
            <div className="absolute inset-0 flex items-end p-10 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/10 backdrop-blur-[2px]">
              <div className="bg-white/20 backdrop-blur-xl border border-white/30 p-8 rounded-[2rem] w-full transform translate-y-10 group-hover:translate-y-0 transition-transform duration-700">
                <span className="text-[10px] font-bold text-white uppercase tracking-[0.3em] mb-2 block">Archive 00{i+1}</span>
                <h3 className="text-3xl font-serif italic text-white">{work.title}</h3>
              </div>
            </div>

            {/* Static Badge */}
            <div className="absolute top-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full text-white text-[10px] font-bold tracking-widest uppercase">
              View Case
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Button */}
      <div className="mt-20 flex justify-center">
        <button className="px-20 py-8 border border-black rounded-full hover:bg-black hover:text-[#E9E4D9] transition-all duration-500 text-[10px] font-bold uppercase tracking-[0.5em]">
          Explore Full Archive
        </button>
      </div>
    </section>
  );
}