"use client";

import { motion, useMotionValue, useTransform } from "framer-motion";

const steps = [
  {
    id: "01",
    title: "Create Your Space",
    desc: "Start your personal memory vault. Organize photos into albums that feel calm, private, and truly yours.",
    img: "https://images.unsplash.com/photo-1616077168079-7e09f8f5e36d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "02",
    title: "Organize with Intent",
    desc: "Rename, reorder, and categorize moments effortlessly. Your memories stay structured as life moves fast.",
    img: "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: "03",
    title: "Relive & Share",
    desc: "Preview, download, or share secure links. Beautiful memories, always accessible, always safe.",
    img: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80",
  },
];

export default function HowItWorksDraggable() {
  return (
    <section className="w-full py-28 bg-gradient-to-br from-white via-blue-50 to-green-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-sm font-medium tracking-wide text-green-600 mb-4">
          HOW IT WORKS
        </p>

        <h2 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-16">
          Built for everyday memories,
          <br />
          designed to feel timeless
        </h2>

        <div className="relative flex flex-col lg:flex-row justify-center items-center gap-14">
          {steps.map((step, index) => {
            const x = useMotionValue(0);
            const y = useMotionValue(0);

            const rotateX = useTransform(y, [-50, 50], [12, -12]);
            const rotateY = useTransform(x, [-50, 50], [-12, 12]);

            return (
              <motion.div
                key={step.id}
                drag
                dragElastic={0.18}
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
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: "preserve-3d",
                }}
                whileHover={{
                  scale: 1.06,
                  boxShadow: "0 35px 90px rgba(0, 120, 255, 0.25)",
                }}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 18,
                  delay: index * 0.15,
                }}
                className="relative w-[300px] h-[440px] rounded-3xl bg-white border border-blue-100 cursor-grab active:cursor-grabbing"
              >
                {/* Step badge */}
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-green-500 to-blue-500 text-white text-xs font-semibold px-4 py-1 rounded-full"
                  style={{ transform: "translateZ(60px)" }}
                >
                  STEP {step.id}
                </div>

                {/* Image */}
                <div
                  className="h-[220px] rounded-t-3xl overflow-hidden"
                  style={{ transform: "translateZ(40px)" }}
                >
                  <img
                    src={step.img}
                    alt={step.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div
                  className="p-6 text-left space-y-3"
                  style={{ transform: "translateZ(50px)" }}
                >
                  <h3 className="text-xl font-semibold text-gray-900">
                    {step.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                {/* Glow */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400/10 to-green-400/10 pointer-events-none" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
