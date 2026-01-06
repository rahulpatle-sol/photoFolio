import React, { useState } from "react";
import { auth } from "../firebase/config"; // Apna config path check kar lena
import { sendPasswordResetEmail } from "firebase/auth";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Mail, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🔥 Firebase Magic: Ye user ko reset link bhej dega
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent! Check your email inbox.", { theme: "dark" });
      
      // Link bhejne ke baad wapas login pe bhej do
      setTimeout(() => navigate("/login"), 3000);
    } catch (error) {
      toast.error(error.message, { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050505] px-4">
      {/* Background Glow */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl"
      >
        <button 
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 text-sm"
        >
          <ArrowLeft size={16} /> Back to Login
        </button>

        <h2 className="text-3xl font-bold text-white mb-2">Forgot Password?</h2>
        <p className="text-gray-400 mb-8">Enter your email and we'll send you a link to reset your password.</p>

        <form onSubmit={handleReset} className="space-y-6">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input
                type="email"
                required
                placeholder="Enter your email"
                className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none transition-all"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-blue-600/20 disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;