import { motion } from "framer-motion";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer";
export default function Hero() {
  return (
    <section className="relative min-h-screen pt-10 px-6 lg:px-12 flex flex-col justify-between">
      <Navbar/>
      {/* Top Bar / Marquee style header */}
    

      {/* Main Content Area */}
      <div className="relative flex flex-col items-center justify-center flex-grow py-20">
        <h1 className="hero-title text-[15vw] lg:text-[18vw] text-center z-10 pointer-events-none">
          PHOTO <br /> FOLIO
        </h1>

        {/* Overlapping Image - The "Dreamgirl" vibe */}
        <motion.div 
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="absolute w-[280px] lg:w-[450px] aspect-[3/4] z-20 overflow-hidden rounded-2xl shadow-2xl"
        >
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80" 
            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
            alt="Main Model"
          />
        </motion.div>
      </div>

      {/* Bottom Floating Info */}
      <div className="flex justify-between items-end pb-12 z-30">
        <div className="text-[10px] font-black uppercase leading-tight max-w-[200px]">
          NEWEST ARRIVAL <br /> 13/01/2026 <br /> <span className="opacity-40">SCROLL TO UNCOVER</span>
        </div>
        <button className="px-10 py-5 bg-white border border-black rounded-full font-bold uppercase text-[10px] tracking-widest hover:bg-black hover:text-white transition-all">
          Rent Now Your New Outfit
        </button>
      </div>
      <Footer/>
    </section>
  );
}