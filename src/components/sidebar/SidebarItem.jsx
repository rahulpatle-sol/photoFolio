import { motion } from "framer-motion";

export default function SidebarItem({
  icon: Icon,
  label,
  active,
  open,
  onClick,
}) {
  return (
    <motion.button
      whileHover={{ x: 6 }}
      onClick={onClick}
      className={`
        relative flex items-center gap-4 w-full px-4 py-3 rounded-xl
        transition-all
        ${
          active
            ? "bg-gradient-to-r from-blue-500/80 to-indigo-600/80 shadow-lg text-white"
            : "text-white/70 hover:bg-white/10"
        }
      `}
    >
      <Icon className="w-5 h-5" />
      {open && <span className="text-sm font-medium">{label}</span>}

      {active && (
        <motion.span
          layoutId="active-pill"
          className="absolute inset-0 rounded-xl bg-white/10 blur-xl"
        />
      )}
    </motion.button>
  );
}
