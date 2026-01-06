"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";
import { FolderPlus, PenTool, Share2 } from "lucide-react";

const steps = [
  {
    id: "01",
    title: "Create Your Space",
    desc: "Start your personal memory vault. Organize photos into albums that feel calm, private, and truly yours.",
    img: "https://images.unsplash.com/photo-1616077168079-7e09f8f5e36d?auto=format&fit=crop&w=800&q=80",
    icon: <FolderPlus className="text-indigo-500" size={20} />
  },
  {
    id: "02",
    title: "Organize with Intent",
    desc: "Rename, reorder, and categorize moments effortlessly. Your memories stay structured as life moves fast.",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80",
    icon: <PenTool className="text-pink-500" size={20} />
  },
  {
    id: "03",
    title: "Relive & Share",
    desc: "Preview, download, or share secure links. Beautiful memories, always accessible, always safe.",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
    icon: <Share2 className="text-blue-500" size={20} />
  },
];

export default function HowItWorksDraggable() {
  return (
    <section className="relative w-full py-32 bg-[#fafafa] overflow-hidden">
      
      {/* Background Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: `radial-gradient(#000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} 
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="space-y-4 mb-20"
        >
          <span className="text-[10px] font-black tracking-[0.3em] text-indigo-600 uppercase bg-indigo-50 px-4 py-2 rounded-full">
            The Process
          </span>
          <h2 className="text-5xl md:text-6xl font-black text-gray-900 tracking-tighter">
            Three steps to <span className="italic font-serif text-gray-400 text-6xl">forever.</span>
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto font-medium">
            We've simplified the complex world of photo management into a tactile, 
            beautiful experience.
          </p>
        </motion.div>

        <div className="relative flex flex-col lg:flex-row justify-center items-center gap-10">
          {steps.map((step, index) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);

            const rotateX = useTransform(y, [-100, 100], [15, -15]);
            const rotateY = useTransform(x, [-100, 100], [-15, 15]);

            return (
              <motion.div
                key={step.id}
                drag
                dragElastic={0.1}
                dragConstraints={{ top: 0, bottom: 0, left: 0, right: 0 }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  x.set(e.clientX - rect.left - rect.width / 2);
                  y.set(e.clientY - rect.top - rect.height / 2);
                }}
                onMouseLeave={() => {
                  x.set(0);
                  y.set(0);
                }}
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                whileHover={{ scale: 1.02 }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 200, damping: 20, delay: index * 0.1 }}
                className="group relative w-[320px] h-[480px] rounded-[2.5rem] bg-white border border-black/[0.03] shadow-[0_20px_50px_rgba(0,0,0,0.05)] cursor-grab active:cursor-grabbing p-4"
              >
                {/* Image Section */}
                <div className="h-[240px] rounded-[2rem] overflow-hidden relative mb-6" style={{ transform: "translateZ(30px)" }}>
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md p-3 rounded-2xl shadow-sm">
                    {step.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="px-4 text-left space-y-3" style={{ transform: "translateZ(50px)" }}>
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black text-black/5 tracking-tighter">{step.id}</span>
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight">{step.title}</h3>
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed font-medium">
                    {step.desc}
                  </p>
                </div>

                {/* Bottom Shadow Glow */}
                <div className="absolute -bottom-4 inset-x-10 h-10 bg-indigo-500/10 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}