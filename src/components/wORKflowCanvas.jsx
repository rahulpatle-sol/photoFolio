import { motion } from "framer-motion";

export default function WorkflowCanvas() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#0f0f15] border border-white/10 rounded-xl p-6 min-h-[400px]"
    >
      <h3 className="text-lg font-semibold mb-4">Workflow</h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {["Model", "Prompt", "Image Output"].map((block) => (
          <motion.div
            key={block}
            whileHover={{ y: -4 }}
            className="bg-[#14141c] border border-white/10 rounded-xl p-4"
          >
            <p className="text-sm text-white/70">{block}</p>
            <div className="mt-4 h-24 rounded-lg bg-gradient-to-br from-purple-500/30 to-pink-500/30" />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
