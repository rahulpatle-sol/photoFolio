import Navbar from "../components/Navbar";
import Hero from "../ui/Hero";
import HowItWorksDraggable from "../ui/Features";
import About from "../ui/About";
import Pricing from "../ui/Pricing";
import Footer from "../ui/Footer";
import { motion, useScroll, useSpring } from "framer-motion";

export default function Landing() {
  // Top pe ek reading progress bar ke liye (Optional but Pro look)
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen bg-white selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-indigo-600 origin-left z-[110]" style={{ scaleX }} />

      <Navbar />

      <div id="home">
        <Hero />
      </div>

      <div id="about">
        <About />
      </div>

      <div id="features">
        <HowItWorksDraggable />
      </div>

      <div id="pricing">
        <Pricing />
      </div>

      <Footer />
    </main>
  );
}