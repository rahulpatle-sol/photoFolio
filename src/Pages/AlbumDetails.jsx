"use client";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { collection, query, where, onSnapshot, orderBy, doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, Search, Lock, Share2 } from "lucide-react";
import Masonry from "react-masonry-css";

export default function AlbumDetails() {
  const { albumId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [albumData, setAlbumData] = useState(null);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!albumId || !user) return;

    getDoc(doc(db, "albums", albumId)).then(snap => {
      if (snap.exists()) setAlbumData(snap.data());
    });

    const q = query(
      collection(db, "photos"),
      where("albumId", "==", albumId),
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [albumId, user]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#E9E4D9] p-8 md:p-16 selection:bg-[#A68A56]">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Luxury Header */}
        <header className="flex flex-col md:flex-row items-start md:items-end justify-between mb-24 gap-10">
          <div className="flex items-center gap-10">
            <motion.button 
              whileHover={{ scale: 1.1, rotate: -5 }}
              onClick={() => navigate("/albums")} 
              className="p-5 bg-white/5 border border-white/10 rounded-full hover:bg-[#A68A56] hover:text-black transition-all duration-500"
            >
              <ArrowLeft size={28} />
            </motion.button>
            <div>
              <div className="flex items-center gap-3 mb-2 opacity-40">
                <Lock size={12} />
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Encrypted Collection</p>
              </div>
              <h1 className="text-[7vw] lg:text-[5vw] font-black uppercase tracking-tighter leading-none italic">
                {albumData?.name || "Loading..."}
              </h1>
              <p className="text-[#A68A56] text-sm font-serif italic mt-2">Archive Series — Vol. 0{photos.length}</p>
            </div>
          </div>

          <div className="flex gap-4">
            <button className="px-8 py-4 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-white/10 transition-all">
               Sort by Date
            </button>
            <button className="p-4 bg-[#A68A56] text-black rounded-full hover:scale-110 transition-all shadow-[0_0_30px_rgba(166,138,86,0.3)]">
               <Share2 size={20} strokeWidth={2.5} />
            </button>
          </div>
        </header>

        {/* Photos Grid */}
        {photos.length > 0 ? (
          <Masonry
            breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
            className="flex w-auto gap-10"
          >
            {photos.map((photo, i) => (
              <motion.div 
                key={photo.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1, duration: 0.8 }}
                whileHover={{ y: -10 }}
                className="rounded-[2.5rem] overflow-hidden mb-10 border border-white/5 bg-[#111] group relative shadow-2xl"
              >
                <img 
                  src={photo.url} 
                  alt={photo.name} 
                  className="w-full h-auto block grayscale group-hover:grayscale-0 transition-all duration-1000" 
                />
                
                {/* Image Info Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                  <p className="text-[10px] font-black text-[#A68A56] uppercase tracking-widest mb-1">Preserved Entry</p>
                  <h3 className="text-xl font-serif italic text-white truncate">{photo.name || "Untitled Asset"}</h3>
                </div>
              </motion.div>
            ))}
          </Masonry>
        ) : (
          <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-white/5 rounded-[4rem] bg-white/[0.02]">
            <div className="w-24 h-24 bg-white/5 rounded-full flex items-center justify-center mb-8 animate-pulse">
                <ImageIcon size={40} className="text-[#A68A56] opacity-40" />
            </div>
            <p className="text-xl font-black uppercase tracking-[0.3em] opacity-20 italic">The Vault is Empty</p>
          </div>
        )}
      </div>
    </div>
  );
}