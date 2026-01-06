import { motion } from "framer-motion";
import { Image, ArrowRight } from "lucide-react";

export default function AlbumCard({ name, keyword, count }) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.02 }}
      className="relative rounded-2xl overflow-hidden
      bg-white/10 backdrop-blur-xl border border-white/20
      shadow-xl cursor-pointer group"
    >
      {/* IMAGE */}
      <img
        src={`https://source.unsplash.com/600x400/?${keyword}`}
        alt={name}
        className="w-full h-44 object-cover group-hover:scale-110 transition-transform duration-500"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* CONTENT */}
      <div className="absolute bottom-0 p-4 w-full">
        <h3 className="text-lg font-semibold text-white">{name}</h3>
        <div className="flex items-center justify-between mt-1 text-white/70 text-sm">
          <span className="flex items-center gap-1">
            <Image size={14} /> {count} photos
          </span>
          <ArrowRight size={16} className="opacity-0 group-hover:opacity-100 transition" />
        </div>
      </div>
    </motion.div>
  );
}
