import { motion } from "framer-motion";

export default function Topbar() {
  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-16 flex items-center justify-between px-6 border-b border-white/10"
    >
      <div className="text-sm text-white/70">
        Image Generation Workflow
      </div>

      <button className="px-4 py-2 rounded-lg bg-white text-black text-sm font-medium">
        New Project
      </button>
    </motion.header>
  );
}
