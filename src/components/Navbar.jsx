import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, LayoutDashboard, LogOut, Camera } from "lucide-react";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();

  // Scroll effect to change navbar background
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  // Smooth Scroll Function
  const scrollToSection = (id) => {
    setIsOpen(false);
    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <nav 
      className={`fixed top-0 w-full z-[100] transition-all duration-500 px-6 md:px-12 py-4 ${
        scrolled ? "bg-white/80 backdrop-blur-xl border-b border-black/5 py-3 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LOGO */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer group"
        >
          <div className="w-10 h-10 bg-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 group-hover:rotate-6 transition-transform">
            <Camera className="text-white w-5 h-5" />
          </div>
          <div className="text-xl font-black tracking-tighter">
            <span className="text-gray-900">Photo</span>
            <span className="text-indigo-600 italic font-serif">Folio</span>
          </div>
        </motion.div>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center gap-10 text-[11px] font-black uppercase tracking-[0.2em] text-gray-400">
          <button onClick={() => scrollToSection('home')} className="hover:text-indigo-600 transition-colors">Home</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-indigo-600 transition-colors">About</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-indigo-600 transition-colors">Pricing</button>
          <button className="hover:text-indigo-600 transition-colors">Blog</button>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/dashboard")}
                className="hidden md:flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold bg-gray-900 text-white hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-gray-200"
              >
                <LayoutDashboard size={14} /> DASHBOARD
              </button>
              
              <button
                onClick={handleLogout}
                className="p-2.5 rounded-full border border-black/5 text-gray-400 hover:text-red-500 hover:bg-red-50 transition-all"
              >
                <LogOut size={18} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="px-7 py-3 rounded-2xl text-xs font-black bg-indigo-600 text-white hover:bg-indigo-700 hover:shadow-2xl hover:shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
            >
              LOGIN <ArrowRight size={14} />
            </button>
          )}

          {/* MOBILE TOGGLE */}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-900"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-black/5 shadow-2xl md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 gap-6 font-black text-xs tracking-widest text-gray-400">
              <button onClick={() => scrollToSection('home')} className="text-left py-2 hover:text-indigo-600 uppercase">Home</button>
              <button onClick={() => scrollToSection('about')} className="text-left py-2 hover:text-indigo-600 uppercase">About</button>
              <button onClick={() => scrollToSection('pricing')} className="text-left py-2 hover:text-indigo-600 uppercase">Pricing</button>
              <hr className="border-black/5" />
              {user ? (
                <button onClick={() => navigate("/dashboard")} className="text-indigo-600 flex items-center gap-2">
                  <LayoutDashboard size={16} /> GO TO DASHBOARD
                </button>
              ) : (
                <button onClick={() => navigate("/login")} className="w-full bg-indigo-600 text-white py-4 rounded-2xl shadow-lg shadow-indigo-100">
                  GET STARTED NOW
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}