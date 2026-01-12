"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Folder, Trash2, Link as LinkIcon, ArrowLeft, ShieldCheck, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { collection, addDoc, query, where, onSnapshot, serverTimestamp, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

export default function Albums() {
  const [albums, setAlbums] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) return;
    const unsub = onSnapshot(query(collection(db, "albums"), where("userId", "==", user.uid)), (snap) => {
      setAlbums(snap.docs.map(d => ({ id: d.id, ...d.data() })));
    });
    return () => unsub();
  }, [user]);

  const copyFolderLink = (id) => {
    const link = `${window.location.origin}/albums/${id}`;
    navigator.clipboard.writeText(link);
    toast.success("Vault Access Link Copied! 🔐");
  };

  const createAlbum = async (e) => {
    e.preventDefault();
    if (!albumName.trim()) return;
    try {
        await addDoc(collection(db, "albums"), { 
            name: albumName, 
            userId: user.uid, 
            createdAt: serverTimestamp(), 
            photoCount: 0,
            status: "encrypted" 
        });
        setAlbumName(""); 
        setShowModal(false);
        toast.success("New Vault Commissioned");
    } catch(err) { toast.error("Vault Creation Failed"); }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-[#E9E4D9] p-8 md:p-16 selection:bg-[#A68A56]">
      <div className="max-w-7xl mx-auto">
        
        {/* Luxury Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-20 gap-8">
          <div className="flex items-center gap-8">
            <motion.button 
              whileHover={{ x: -5 }}
              onClick={() => navigate("/dashboard")} 
              className="p-5 bg-white/5 border border-white/10 rounded-full text-[#A68A56]"
            >
              <ArrowLeft size={24}/>
            </motion.button>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#A68A56] mb-2">The Archive</p>
              <h1 className="text-[5vw] lg:text-[3.5vw] font-black tracking-tighter uppercase leading-none italic">Collections</h1>
            </div>
          </div>
          
          <button 
            onClick={() => setShowModal(true)} 
            className="group relative px-10 py-5 bg-[#A68A56] text-black rounded-full overflow-hidden transition-all duration-500 hover:scale-105"
          >
            <span className="relative z-10 flex items-center gap-3 text-[10px] font-black uppercase tracking-widest">
                <Plus size={16} strokeWidth={3}/> Initialize Vault
            </span>
          </button>
        </header>

        {/* Albums Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {albums.map((album, i) => (
            <motion.div 
              key={album.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => navigate(`/albums/${album.id}`)} 
              className="group relative bg-[#0F0F0F] p-10 rounded-[3.5rem] border border-white/5 hover:border-[#A68A56]/30 transition-all duration-700 cursor-pointer overflow-hidden shadow-2xl"
            >
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A68A56]/5 blur-[60px] group-hover:bg-[#A68A56]/10 transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div className="w-16 h-16 bg-white/5 border border-white/10 text-[#A68A56] rounded-[1.5rem] flex items-center justify-center group-hover:bg-[#A68A56] group-hover:text-black transition-all duration-500 transform group-hover:rotate-6">
                    <Folder size={28} strokeWidth={1.5} />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={(e) => { e.stopPropagation(); deleteDoc(doc(db, "albums", album.id)); }} className="p-3 bg-red-500/10 text-red-500 rounded-full hover:bg-red-500 hover:text-white transition-all">
                        <Trash2 size={16}/>
                    </button>
                  </div>
                </div>

                <div className="space-y-1">
                    <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-30">Collection No. 0{i + 1}</p>
                    <h3 className="text-3xl font-serif italic text-white group-hover:text-[#A68A56] transition-colors truncate">{album.name}</h3>
                </div>

                <div className="mt-10 pt-8 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest opacity-30">
                        <ShieldCheck size={12}/> {album.status || "SECURE"}
                    </div>
                    <button 
                        onClick={(e) => { e.stopPropagation(); copyFolderLink(album.id); }} 
                        className="text-[9px] font-black uppercase tracking-widest text-[#A68A56] hover:text-white flex items-center gap-2"
                    >
                        <Globe size={12}/> Generate Access
                    </button>
                </div>
              </div>
            </motion.div>
          ))}

          {/* Empty State Placeholder */}
          {albums.length === 0 && (
             <div className="col-span-full py-40 text-center border-2 border-dashed border-white/5 rounded-[4rem]">
                <p className="text-[10px] font-black uppercase tracking-[1em] opacity-20">The Repository is Empty</p>
             </div>
          )}
        </div>
      </div>

      {/* --- AMIRI MODAL --- */}
      <AnimatePresence>
        {showModal && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/98 backdrop-blur-3xl p-6"
          >
            <motion.form 
              initial={{ scale: 0.9, y: 30 }} animate={{ scale: 1, y: 0 }}
              onSubmit={createAlbum} 
              className="bg-[#0F0F0F] p-16 rounded-[4rem] w-full max-w-xl border border-[#A68A56]/20 shadow-[0_0_100px_rgba(166,138,86,0.1)] relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#A68A56] to-transparent opacity-30" />
              
              <h2 className="text-4xl font-black mb-10 italic uppercase tracking-tighter">New Collection</h2>
              
              <div className="relative group mb-10">
                <label className="absolute -top-3 left-6 px-2 bg-[#0F0F0F] text-[9px] font-black uppercase tracking-widest text-[#A68A56]">Vault Identity</label>
                <input 
                    autoFocus
                    placeholder="E.G. 'PARIS EXHIBITION' OR 'LEGACY 2026'" 
                    className="w-full p-8 bg-transparent border border-white/10 rounded-3xl outline-none text-xl font-serif italic text-white focus:border-[#A68A56] transition-all" 
                    value={albumName} 
                    onChange={(e) => setAlbumName(e.target.value)} 
                />
              </div>

              <div className="flex gap-6">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 font-black text-[10px] uppercase tracking-[0.3em] opacity-40 hover:opacity-100 transition-opacity">Abort</button>
                <button type="submit" className="flex-1 py-6 bg-[#A68A56] text-black rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:scale-105 active:scale-95 transition-all">Initialize</button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}