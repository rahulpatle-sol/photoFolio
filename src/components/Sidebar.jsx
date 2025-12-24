import { motion } from "framer-motion";

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -80, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-64 bg-[#111118] border-r border-white/10 p-5"
    >
      <h1 className="text-xl font-bold mb-8">Photofolio</h1>

      <nav className="space-y-4">
        {["Dashboard", "Workflows", "Analytics", "Settings"].map((item) => (
          <div
            key={item}
            className="px-4 py-2 rounded-lg hover:bg-white/10 cursor-pointer transition"
          >
            {item}
          </div>
        ))}
      </nav>
    </motion.aside>
  );
}
