import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Heart, Share2, Image as ImageIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Hero() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const videoRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative w-full min-h-screen bg-[#fafafa] overflow-hidden pt-20">
      
      {/* --- VIDEO BACKGROUND (LOW OPACITY) --- */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
        <video 
          autoPlay muted loop playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://pixabay.com/videos/download/x-270420_medium.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Animated Blobs */}
      <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-100/50 rounded-full blur-[120px] animate-pulse" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-16 py-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* LEFT SIDE: TEXT CONTENT */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 rounded-full text-[10px] font-bold tracking-widest uppercase text-gray-500 border border-black/5">
            <span className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
            Your Private Digital Vault
          </div>

          <h1 className="text-7xl md:text-8xl font-black tracking-tighter leading-[0.9] text-gray-900">
            Capture <br />
            <span className="italic font-serif text-indigo-600">Memories</span> <br />
            Not Just <br />
            Photos.
          </h1>

          <p className="text-gray-500 text-lg max-w-md leading-relaxed font-medium">
            PhotoFolio is the most elegant way to store your life's journey. 
            Drag, drop, and relive your favorite moments in a timeline 
            that breathes life.
          </p>

          <div className="flex items-center gap-4">
            <button className="group px-8 py-4 bg-black text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-indigo-600 transition-all shadow-xl shadow-black/10">
              Start Your Folio <ArrowRight className="group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="p-4 bg-white border border-black/5 rounded-2xl hover:bg-gray-50 transition-all">
              <Play size={20} fill="black" />
            </button>
          </div>

          {/* User Preview */}
          <div className="flex items-center gap-4 pt-4">
             <div className="flex -space-x-3">
                {[1,2,3,4].map(i => (
                  <img key={i} className="w-10 h-10 rounded-full border-4 border-white" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="user" />
                ))}
             </div>
             <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">Joined by 2k+ Photographers</p>
          </div>
        </motion.div>

        {/* RIGHT SIDE: INTERACTIVE 3D DISPLAY */}
        <motion.div 
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 5}deg) rotateX(${-mousePos.y * 5}deg)`,
          }}
          className="relative transition-transform duration-300 ease-out"
        >
          {/* Main Card (Dashboard Preview) */}
          <div className="relative bg-white rounded-[3rem] p-4 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] border border-black/[0.03]">
            <div className="rounded-[2.2rem] overflow-hidden aspect-[4/5] relative">
              {/* Actual Video Content */}
              <video 
                autoPlay muted loop playsInline 
                className="w-full h-full object-cover"
              >
                <source src="https://assets.mixkit.co/videos/preview/mixkit-group-of-friends-taking-photos-with-a-smartphone-34539-large.mp4" type="video/mp4" />
              </video>
              
              {/* Overlay UI */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent p-8 flex flex-col justify-end">
                <div className="flex items-center justify-between text-white">
                  <div>
                    <h4 className="text-xl font-bold">Summer Vacation</h4>
                    <p className="text-sm opacity-70">124 Photos • Cloud Storage</p>
                  </div>
                  <div className="flex gap-2">
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl"><Heart size={20} /></div>
                    <div className="p-3 bg-white/20 backdrop-blur-md rounded-2xl"><Share2 size={20} /></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Stats Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute -right-10 top-20 bg-white p-6 rounded-3xl shadow-2xl border border-black/5 z-20"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600">
                  <ImageIcon size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase">Storage Used</p>
                  <p className="text-xl font-bold text-gray-900">1.2 GB / 5GB</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute -z-10 -bottom-10 -left-10 w-40 h-40 bg-indigo-200 rounded-full blur-3xl opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}