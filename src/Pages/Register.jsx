"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { UserPlus, Mail, Lock, ShieldCheck, Crown } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Membership Approved. Welcome to the Vault.");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Registration failed. Security protocol denied.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#F9F7F2] px-4 overflow-hidden">
      
      {/* Dynamic Luxury Background */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-[#A68A56]/5 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-black/[0.02] blur-[150px] rounded-full pointer-events-none" />

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="relative z-10 w-full max-w-[460px] bg-white rounded-[3.5rem] border border-black/[0.03] p-10 md:p-14 shadow-[0_50px_100px_rgba(0,0,0,0.04)]"
      >
        <div className="text-center mb-12">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="inline-flex p-4 bg-[#1A1A1A] text-[#A68A56] rounded-[2rem] mb-8 shadow-xl"
          >
            <Crown size={32} />
          </motion.div>
          <h2 className="text-4xl font-black uppercase tracking-tighter text-[#1A1A1A] italic">
            Begin <span className="font-serif not-italic text-[#A68A56]">Legacy.</span>
          </h2>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mt-4 leading-loose">
            Requesting access to Private Archive 2026
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Email Input */}
          <div className="relative group">
            <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-300 group-focus-within:text-[#A68A56] transition-colors" />
            <input 
              type="email" 
              required 
              placeholder="PRIMARY EMAIL ADDRESS" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-black/[0.02] rounded-2xl text-sm font-bold tracking-widest outline-none focus:border-[#A68A56]/40 transition-all placeholder:text-gray-300 placeholder:font-black" 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <Lock className="absolute left-4 top-4 w-5 h-5 text-gray-300 group-focus-within:text-[#A68A56] transition-colors" />
            <input 
              type="password" 
              required 
              placeholder="SECURE VAULT KEY" 
              className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-black/[0.02] rounded-2xl text-sm font-bold tracking-widest outline-none focus:border-[#A68A56]/40 transition-all placeholder:text-gray-300 placeholder:font-black" 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          {/* Security Note */}
          <div className="flex items-center gap-3 px-2 py-1 opacity-40">
            <ShieldCheck size={14} className="text-[#A68A56]" />
            <p className="text-[8px] font-black uppercase tracking-widest">Quantum-Ready Encryption Enabled</p>
          </div>

          {/* Action Button */}
          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading} 
            className="w-full py-5 bg-[#1A1A1A] text-[#A68A56] font-black uppercase tracking-[0.4em] rounded-2xl transition-all disabled:opacity-50 text-[10px] shadow-2xl flex items-center justify-center gap-3 mt-4"
          >
            {loading ? "Processing..." : "Initiate Membership"}
          </motion.button>
        </form>

        {/* Bottom Navigation */}
        <div className="mt-12 pt-8 border-t border-black/5 text-center">
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
              Already possess a key? 
              <Link to="/login" className="text-[#1A1A1A] ml-2 border-b border-black/20 pb-1 hover:text-[#A68A56] hover:border-[#A68A56] transition-all">
                Authenticate
              </Link>
            </p>
        </div>
      </motion.div>

      {/* Side Decorative Text */}
      <div className="absolute right-[-50px] top-1/2 -rotate-90 hidden xl:block opacity-10 pointer-events-none">
          <p className="text-[10px] font-black uppercase tracking-[2em]">ESTABLISHED • TWENTY • TWENTY • SIX</p>
      </div>
    </div>
  );
};
export default Register;