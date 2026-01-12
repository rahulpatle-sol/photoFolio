"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Mail, Lock, ShieldCheck, ArrowRight, Fingerprint } from "lucide-react";
import { auth, googleProvider } from "../firebase/config"; 
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Identity Verified. Welcome back.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Security mismatch. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Google Authentication Successful.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Authentication Interrupted.");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#F9F7F2] px-4 overflow-hidden">
      
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#A68A56]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/[0.02] blur-[100px] rounded-full pointer-events-none" />

      {/* Main Login Card */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        className="relative z-10 w-full max-w-[450px] bg-white rounded-[3rem] border border-black/[0.03] p-10 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.05)]"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ y: -20 }}
            animate={{ y: 0 }}
            className="inline-flex p-4 bg-[#1A1A1A] text-[#A68A56] rounded-3xl mb-8 shadow-2xl"
          >
            <Fingerprint size={32} />
          </motion.div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] italic">
            Vault <span className="font-serif not-italic text-[#A68A56]">Access.</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mt-4">Security Protocol 4.0</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div className="space-y-1">
            <div className="relative group">
              <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-300 group-focus-within:text-[#A68A56] transition-colors" />
              <input 
                type="email" 
                required 
                placeholder="REGISTRATION EMAIL" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-black/[0.03] rounded-2xl text-sm font-bold tracking-widest outline-none focus:border-[#A68A56]/50 transition-all placeholder:text-gray-300 placeholder:font-black" 
                onChange={(e) => setEmail(e.target.value)} 
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-1">
            <div className="relative group">
              <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-300 group-focus-within:text-[#A68A56] transition-colors" />
              <input 
                type="password" 
                required 
                placeholder="VAULT KEY" 
                className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-black/[0.03] rounded-2xl text-sm font-bold tracking-widest outline-none focus:border-[#A68A56]/50 transition-all placeholder:text-gray-300 placeholder:font-black" 
                onChange={(e) => setPassword(e.target.value)} 
              />
            </div>
            <div className="flex justify-end pt-2">
              <Link to="/forgot-password" size="sm" className="text-[9px] font-black uppercase tracking-widest text-gray-400 hover:text-[#A68A56]">Lost Access?</Link>
            </div>
          </div>

          {/* Login Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading} 
            className="w-full py-5 bg-[#1A1A1A] text-[#A68A56] font-black uppercase tracking-[0.4em] rounded-2xl transition-all disabled:opacity-50 text-[10px] shadow-2xl flex items-center justify-center gap-3"
          >
            {loading ? "Verifying..." : "Authorize Login"}
            {!loading && <ArrowRight size={14} />}
          </motion.button>

          {/* Divider */}
          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-black/5"></div></div>
            <div className="relative flex justify-center text-[8px] uppercase font-black tracking-[0.5em] text-gray-300"><span className="bg-white px-4 italic">Social Handshake</span></div>
          </div>

          {/* Google Login */}
          <button 
            type="button" 
            onClick={handleGoogleLogin} 
            className="w-full py-4 bg-white border border-black/[0.05] text-[#1A1A1A] font-black uppercase tracking-[0.3em] rounded-2xl hover:bg-gray-50 transition-all flex items-center justify-center gap-4 text-[9px] shadow-sm"
          >
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-4 h-4" alt="google" />
            Authenticate with Google
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-[10px] font-black uppercase tracking-widest text-gray-400 mt-10">
          Not a member? <Link to="/register" className="text-[#A68A56] border-b border-[#A68A56]/30 pb-1 ml-2">Request Invitation</Link>
        </p>
      </motion.div>

      {/* Decorative Branding */}
      <div className="absolute bottom-10 opacity-20 hidden md:block">
          <p className="text-[10px] font-black uppercase tracking-[0.8em]">PHOTOFOLIO • GLOBAL VAULT ACCESS</p>
      </div>
    </div>
  );
};
export default Login;