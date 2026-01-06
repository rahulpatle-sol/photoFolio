import React, { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Image } from "lucide-react";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields", {
        theme: "dark",
      });
      return;
    }

    toast.success("Welcome to PhotoFolio!", {
      autoClose: 2000,
      theme: "dark",
    });

    setTimeout(() => {
      onLogin();
    }, 2000);
  };

  const handleGoogleLogin = () => {
    toast.info("Google login coming soon!", {
      theme: "dark",
    });
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"
          animate={{ x: [0, 100, 0], y: [0, 50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"
          animate={{ x: [0, -100, 0], y: [0, -50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Card */}
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-5xl"
        >
          <div className="bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 overflow-hidden">
            <div className="grid md:grid-cols-2">
              {/* Left */}
              <div className="hidden md:flex flex-col justify-center items-center p-12 bg-gradient-to-br from-blue-600/30 to-purple-600/30">
                <Image className="w-28 h-28 text-white mb-6" />
                <h2 className="text-4xl font-bold text-white">PhotoFolio</h2>
                <p className="text-white/70 mt-2">
                  Your memories, beautifully organized
                </p>
              </div>

              {/* Right */}
              <div className="p-12">
                <h1 className="text-3xl font-bold text-white mb-2">
                  Welcome Back
                </h1>
                <p className="text-white/60 mb-8">
                  Sign in to continue
                </p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    type="email"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-white/70 text-sm">
                      <input
                        type="checkbox"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                      />
                      Remember me
                    </label>

                    <button
                      type="button"
                      className="text-blue-400 text-sm hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
                  >
                    Sign In
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleGoogleLogin}
                    className="w-full py-3 rounded-xl bg-white/10 border border-white/20 text-white font-semibold"
                  >
                    Sign in with Google
                  </motion.button>
                </form>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
