import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Image, Mail, Lock, Chrome } from "lucide-react";
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
      toast.success("Welcome back! 📸");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      toast.success("Logged in with Google!");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Google Login Failed!");
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050505] px-4 overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-blue-500/20 rounded-2xl mb-4">
            <Image className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">PhotoFolio</h2>
          <p className="text-gray-400 mt-2">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input type="email" required placeholder="Email Address" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none transition-all" onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
              <input type="password" required placeholder="Password" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-blue-500 outline-none transition-all" onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div className="flex justify-end">
              <Link to="/forgot-password" size="sm" className="text-sm text-blue-400 hover:text-blue-300">Forgot Password?</Link>
            </div>
          </div>

          <button disabled={loading} className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl transition-all disabled:opacity-50">
            {loading ? "Signing in..." : "Sign In"}
          </button>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
            <div className="relative flex justify-center text-xs uppercase"><span className="bg-[#0b0b0b] px-2 text-gray-500">Or</span></div>
          </div>

          <button type="button" onClick={handleGoogleLogin} className="w-full py-3 bg-white/5 border border-white/10 text-white font-medium rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
            <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" className="w-5 h-5" alt="google" />
            Google
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          New here? <Link to="/register" className="text-blue-400 font-medium">Create Account</Link>
        </p>
      </motion.div>
    </div>
  );
};
export default Login;