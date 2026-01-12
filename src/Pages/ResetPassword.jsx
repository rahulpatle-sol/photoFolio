import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";
import { Mail, Key, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent! Please check your email.");
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error("User not found or Invalid Email.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050505] px-4 overflow-hidden">
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[50%] h-[50%] bg-red-600/10 rounded-full blur-[150px]" />

      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="relative z-10 w-full max-w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <button onClick={() => navigate("/login")} className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 text-sm transition-colors">
          <ArrowLeft size={16} /> Back to Login
        </button>

        <div className="mb-8">
          <div className="inline-flex p-3 bg-red-500/20 rounded-2xl mb-4">
            <Key className="w-8 h-8 text-red-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Reset Password</h2>
          <p className="text-gray-400 mt-2">Enter email to get a recovery link</p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
            <input type="email" required placeholder="your@email.com" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-red-500 outline-none transition-all" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <button disabled={loading} className="w-full py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-red-600/20">
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};
export default ForgotPassword;