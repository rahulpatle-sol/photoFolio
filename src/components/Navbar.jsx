import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <nav className="w-full px-10 py-6 flex items-center justify-between bg-white/70 backdrop-blur-xl border-b border-black/5">
      {/* Logo */}
      <div
        onClick={() => navigate("/")}
        className="text-lg font-semibold tracking-tight cursor-pointer"
      >
        <span className="text-gray-900">Photo</span>
        <span className="text-gray-400">Folio</span>
      </div>

      {/* Links */}
      <div className="hidden md:flex gap-10 text-sm font-medium text-gray-600">
        <button className="hover:text-black transition">
          Latest Work
        </button>
        <button className="hover:text-black transition">
          Schedule Call
        </button>
        <button className="hover:text-black transition">
          Blog
        </button>
      </div>

      {/* Auth Actions */}
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <button
              onClick={() => navigate("/dashboard")}
              className="hidden md:inline-flex px-5 py-2 rounded-full text-sm font-medium bg-black text-white hover:scale-105 transition"
            >
              Dashboard
            </button>

            <button
              onClick={handleLogout}
              className="px-5 py-2 rounded-full text-sm font-medium border border-black/10 hover:bg-black hover:text-white transition"
            >
              Logout
            </button>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 rounded-full text-sm font-medium bg-black text-white hover:scale-105 transition"
          >
            Login
          </button>
        )}

        {/* Mobile Menu */}
        <button className="md:hidden text-xl">☰</button>
      </div>
    </nav>
  );
}
