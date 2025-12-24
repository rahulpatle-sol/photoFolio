import React, { useEffect, useRef, useState } from 'react';
import { Menu, ArrowRight, Play } from 'lucide-react';

export default function HeroLanding() {
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const cardsRef = useRef([]);
  const statCardRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    // Animate text on load
    if (textRef.current) {
      textRef.current.style.opacity = '0';
      textRef.current.style.transform = 'translateY(40px)';
      
      setTimeout(() => {
        textRef.current.style.transition = 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
        textRef.current.style.opacity = '1';
        textRef.current.style.transform = 'translateY(0)';
      }, 200);
    }

    // Animate cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px) scale(0.95)';
        
        setTimeout(() => {
          card.style.transition = 'all 1s cubic-bezier(0.22, 1, 0.36, 1)';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
        }, 400 + index * 150);
      }
    });

    // Animate stat card
    if (statCardRef.current) {
      statCardRef.current.style.opacity = '0';
      statCardRef.current.style.transform = 'translateX(30px) scale(0.95)';
      
      setTimeout(() => {
        statCardRef.current.style.transition = 'all 1.2s cubic-bezier(0.22, 1, 0.36, 1)';
        statCardRef.current.style.opacity = '1';
        statCardRef.current.style.transform = 'translateX(0) scale(1)';
      }, 700);
    }
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 overflow-hidden">
      {/* Animated background blobs */}
      <div 
        className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full blur-3xl opacity-40"
        style={{
          transform: `translate(${mousePos.x * 30}px, ${mousePos.y * 30}px)`,
          transition: 'transform 0.8s ease-out'
        }}
      />
      <div 
        className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-br from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-40"
        style={{
          transform: `translate(${mousePos.x * -20}px, ${mousePos.y * -20}px)`,
          transition: 'transform 0.8s ease-out'
        }}
      />

     

      {/* Hero Content */}
      <div ref={heroRef} className="relative z-10 px-8 md:px-16 py-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left side - Text and Cards */}
          <div className="space-y-12">
            <div ref={textRef} className="space-y-6">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 leading-none">
                where<br />
                <span className="italic font-serif">creativity</span><br />
                Meets<br />
                Depth
                <button className="inline-flex items-center justify-center w-12 h-12 ml-4 bg-gray-900 text-white rounded-full hover:scale-110 transition-transform duration-300">
                  <ArrowRight className="w-5 h-5" />
                </button>
              </h1>

              <p className="text-gray-600 text-sm max-w-md leading-relaxed">
                In a world reimagining the art-clock intersections, Deepvisive
                blends creativity with precision. Crafting digital experiences that
                simplicity can be both bold and alive.
              </p>
            </div>

            {/* Image Cards */}
            <div className="flex gap-4">
              <div 
                ref={el => cardsRef.current[0] = el}
                className="relative w-32 h-40 rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 2}deg)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-20 bg-white/20 backdrop-blur-sm rounded-2xl"></div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4" fill="currentColor" />
                </div>
              </div>

              <div 
                ref={el => cardsRef.current[1] = el}
                className="relative w-32 h-40 rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 2}deg)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-pink-300 via-red-200 to-orange-200">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full"></div>
                  </div>
                </div>
                <div className="absolute top-2 right-2 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <Play className="w-4 h-4" fill="currentColor" />
                </div>
              </div>

              <div 
                ref={el => cardsRef.current[2] = el}
                className="relative w-32 h-40 rounded-3xl overflow-hidden shadow-lg hover:scale-105 transition-transform duration-500 cursor-pointer"
                style={{
                  transform: `perspective(1000px) rotateY(${mousePos.x * 2}deg)`,
                  transition: 'transform 0.3s ease-out'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-yellow-200 via-amber-100 to-orange-100">
                  <div className="absolute inset-0 flex items-center justify-center p-4">
                    <div className="text-4xl">☀️</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - 3D Visual Card */}
          <div 
            ref={statCardRef}
            className="relative"
            style={{
              transform: `perspective(1500px) rotateY(${mousePos.x * 3}deg) rotateX(${-mousePos.y * 3}deg)`,
              transition: 'transform 0.3s ease-out'
            }}
          >
            <div className="relative bg-gradient-to-br from-blue-100 via-cyan-50 to-teal-50 rounded-3xl p-8 shadow-2xl overflow-hidden">
              {/* 3D Geometric Stack */}
              <div className="relative h-80 flex items-center justify-center mb-8">
                {/* Vertical Stack of 3D Blocks */}
                <div className="relative">
                  {/* Top Block - Purple/Pink */}
                  <div 
                    className="absolute top-0 left-1/2 -translate-x-1/2"
                    style={{
                      transform: `translateX(-50%) translateY(${mousePos.y * 5}px)`,
                      transition: 'transform 0.3s ease-out'
                    }}
                  >
                    <div className="w-24 h-16 bg-gradient-to-br from-purple-400 to-pink-400 rounded-lg shadow-xl"
                         style={{ transform: 'rotateX(45deg) rotateZ(-45deg)' }}>
                    </div>
                  </div>

                  {/* Middle Block - Blue */}
                  <div 
                    className="absolute top-16 left-1/2 -translate-x-1/2"
                    style={{
                      transform: `translateX(-50%) translateY(${mousePos.y * 3}px)`,
                      transition: 'transform 0.4s ease-out'
                    }}
                  >
                    <div className="w-28 h-20 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-lg shadow-xl"
                         style={{ transform: 'rotateX(45deg) rotateZ(-45deg)' }}>
                    </div>
                  </div>

                  {/* Bottom Block - Yellow */}
                  <div 
                    className="absolute top-32 left-1/2 -translate-x-1/2"
                    style={{
                      transform: `translateX(-50%) translateY(${mousePos.y * 1}px)`,
                      transition: 'transform 0.5s ease-out'
                    }}
                  >
                    <div className="w-32 h-24 bg-gradient-to-br from-yellow-400 to-orange-300 rounded-lg shadow-xl"
                         style={{ transform: 'rotateX(45deg) rotateZ(-45deg)' }}>
                    </div>
                  </div>

                  {/* Base Block - Green */}
                  <div className="absolute top-52 left-1/2 -translate-x-1/2">
                    <div className="w-36 h-28 bg-gradient-to-br from-teal-400 to-green-400 rounded-lg shadow-xl"
                         style={{ transform: 'rotateX(45deg) rotateZ(-45deg)' }}>
                    </div>
                  </div>
                </div>

                {/* Background grid lines */}
                <div className="absolute inset-0 opacity-10">
                  <svg className="w-full h-full">
                    {[...Array(10)].map((_, i) => (
                      <line key={`h-${i}`} x1="0" y1={i * 40} x2="100%" y2={i * 40} stroke="currentColor" strokeWidth="1" />
                    ))}
                    {[...Array(10)].map((_, i) => (
                      <line key={`v-${i}`} x1={i * 40} y1="0" x2={i * 40} y2="100%" stroke="currentColor" strokeWidth="1" />
                    ))}
                  </svg>
                </div>
              </div>

              {/* Stats Section */}
              <div className="relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-5xl font-bold text-gray-900">99%</div>
                    <div className="text-sm text-gray-600 mt-2">
                      AI-AI-Driven Exploration<br />of Innovation
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="w-5 h-5 -rotate-45" />
                    </button>
                    <button className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-300">
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative dots */}
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${10 + Math.random() * 80}%`,
                    animationDelay: `${i * 0.3}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}