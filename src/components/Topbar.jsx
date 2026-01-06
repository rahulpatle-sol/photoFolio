import { useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Image,
  Calendar,
  Search,
  User,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const menu = [
  { id: "home", icon: Home, label: "Home" },
  { id: "albums", icon: Image, label: "Albums" },
  { id: "calendar", icon: Calendar, label: "Calendar" },
  { id: "search", icon: Search, label: "Search" },
  { id: "profile", icon: User, label: "Profile" },
];

export default function Sidebar() {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(true);

  return (
    <motion.aside
      animate={{ width: open ? 260 : 80 }}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="
        h-screen fixed left-0 top-0 z-50
        bg-white/10 backdrop-blur-2xl
        border-r border-white/20
        text-white flex flex-col
      "
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-5 py-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-lg">
            📸
          </div>
          {open && (
            <span className="text-lg font-bold tracking-wide">
              PhotoFolio
            </span>
          )}
        </div>

        <button
          onClick={() => setOpen(!open)}
          className="text-white/70 hover:text-white transition"
        >
          {open ? <ChevronLeft /> : <ChevronRight />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-2">
        {menu.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => setActive(item.id)}
            whileHover={{ x: 6 }}
            className={`
              relative flex items-center gap-4 w-full
              px-4 py-3 rounded-xl transition-all
              ${
                active === item.id
                  ? "bg-gradient-to-r from-blue-500/80 to-indigo-600/80 shadow-lg"
                  : "hover:bg-white/10 text-white/70"
              }
            `}
          >
            <item.icon className="w-5 h-5" />

            {open && (
              <span className="text-sm font-medium">
                {item.label}
              </span>
            )}

            {/* Active glow bar */}
            {active === item.id && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 rounded-xl bg-white/10 blur-xl"
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom Profile */}
      <div className="px-4 py-5 border-t border-white/20">
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src="https://i.pravatar.cc/100"
            className="w-10 h-10 rounded-full object-cover"
          />
          {open && (
            <div>
              <p className="text-sm font-semibold">Rahul</p>
              <p className="text-xs text-white/60">
                Premium User
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
}
