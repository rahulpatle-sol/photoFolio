import { motion } from "framer-motion";
import {
  Home,
  Image,
  Calendar,
  Search,
  User,
  LogOut,
} from "lucide-react";

const menu = [
  { icon: Home, label: "Home", key: "home" },
  { icon: Image, label: "Albums", key: "albums" },
  { icon: Calendar, label: "Calendar", key: "calendar" },
  { icon: Search, label: "Search", key: "search" },
  { icon: User, label: "Profile", key: "profile" },
];

export default function Sidebar({ active, setActive, user, onLogout }) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-20 md:w-64
      bg-white/10 backdrop-blur-xl border-r border-white/20
      flex flex-col justify-between z-50 text-white">

      {/* LOGO */}
      <div className="p-6 text-xl font-semibold">
        📸 <span className="hidden md:inline">PhotoFolio</span>
      </div>

      {/* MENU */}
      <nav className="flex flex-col gap-2 px-3">
        {menu.map((item) => (
          <motion.button
            key={item.key}
            whileHover={{ scale: 1.05 }}
            onClick={() => setActive(item.key)}
            className={`flex items-center gap-4 p-3 rounded-xl
              ${
                active === item.key
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600"
                  : "hover:bg-white/10"
              }`}
          >
            <item.icon size={20} />
            <span className="hidden md:inline">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* USER */}
      <div className="p-4 border-t border-white/20">
        <div className="flex items-center gap-3">
          <img
            src={`https://api.dicebear.com/7.x/initials/svg?seed=${user?.email}`}
            className="w-10 h-10 rounded-full"
          />
          <div className="hidden md:block">
            <p className="text-sm">{user?.displayName || "User"}</p>
            <p className="text-xs text-white/60">{user?.email}</p>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="mt-4 flex items-center gap-2 text-red-400"
        >
          <LogOut size={16} /> <span className="hidden md:inline">Logout</span>
        </button>
      </div>
    </aside>
  );
}
