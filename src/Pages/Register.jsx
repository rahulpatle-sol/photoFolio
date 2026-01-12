import React, { useState } from "react";
import { motion } from "framer-motion";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import { UserPlus, Mail, Lock, ArrowLeft } from "lucide-react";
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
      toast.success("Account created! Welcome to the family. 📸");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-[#050505] px-4 overflow-hidden">
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px]" />

      <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="relative z-10 w-full max-w-[420px] bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex p-3 bg-purple-500/20 rounded-2xl mb-4">
            <UserPlus className="w-8 h-8 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Join Us</h2>
          <p className="text-gray-400 mt-2">Create your photographer profile</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
            <input type="email" required placeholder="Email Address" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none transition-all" onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-500" />
            <input type="password" required placeholder="Create Password" className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-purple-500 outline-none transition-all" onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button disabled={loading} className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-xl transition-all shadow-lg shadow-purple-600/20">
            {loading ? "Creating Account..." : "Register Now"}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-6">
          Already a member? <Link to="/login" className="text-purple-400 font-medium">Sign In</Link>
        </p>
      </motion.div>
    </div>
  );
};
export default Register;