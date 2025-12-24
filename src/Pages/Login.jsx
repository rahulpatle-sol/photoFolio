import { useState } from "react";
import { googleLogin } from "../firebase/auth";
import { db } from "../firebase/config";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import bgImage from "../assets/login.jpg";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleGoogleLogin = async () => {
    try {
      toast.loading("Signing in...", { id: "google" });

      const res = await googleLogin();
      const user = res.user;

      const ref = doc(db, "users", user.uid);
      const snap = await getDoc(ref);

      if (!snap.exists()) {
        await setDoc(ref, {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          createdAt: new Date(),
        });
      }

      toast.success("Login successful", { id: "google" });
      navigate("/dashboard");
    } catch (err) {
      toast.error("Login failed", { id: "google" });
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Fill all fields");
      return;
    }

    toast.success("Login done (UI only)");
    navigate("/dashboard");
  };

  return (
    <>
      <Toaster position="top-right" />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-400 to-zinc-300 to-pink-100 to-blue-300">
        <div className="w-[1000px] h-[550px] bg-white rounded-xl shadow-2xl overflow-hidden flex">

          {/* LEFT IMAGE */}
          <div
            className="w-1/2 hidden md:block bg-cover bg-center relative"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            <div className="absolute inset-0 bg-black/20" />
          </div>

          {/* RIGHT LOGIN */}
          <div className="w-full md:w-1/2 p-12 flex flex-col justify-center">
            <h1 className="text-3xl font-bold text-blue-600 mb-2">
              HELLO!
            </h1>
            <p className="text-gray-400 mb-8">
              Welcome back, please login
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="text"
                placeholder="Email or Username"
                className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />

              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <div className="flex justify-between text-sm text-gray-500">
                <label className="flex items-center gap-1">
                  <input type="checkbox" />
                  Remember
                </label>
                <span className="cursor-pointer hover:text-blue-600">
                  Forgot your password?
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition"
              >
                NEXT →
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="px-3 text-gray-400 text-sm">OR</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {/* Google */}
            <button
              onClick={handleGoogleLogin}
              className="flex items-center justify-center gap-3 border py-3 rounded-md hover:bg-blue-500  transition"
            >
              <FcGoogle size={22} />
              Continue with Google
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
