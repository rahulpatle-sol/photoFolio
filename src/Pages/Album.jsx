import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Folder, Trash2, Link as LinkIcon, ArrowLeft } from "lucide-react";
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
    toast.success("Folder link copied! 📂");
  };

  const createAlbum = async (e) => {
    e.preventDefault();
    if (!albumName.trim()) return;
    await addDoc(collection(db, "albums"), { name: albumName, userId: user.uid, createdAt: serverTimestamp(), photoCount: 0 });
    setAlbumName(""); setShowModal(false);
  };

  return (
    <div className="min-h-screen bg-[#fafafa] p-8">
      <div className="max-w-7xl mx-auto flex justify-between items-center mb-12">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate("/dashboard")} className="p-3 bg-white border border-black/5 rounded-2xl"><ArrowLeft size={20}/></button>
          <h1 className="text-4xl font-black tracking-tighter uppercase">Folders</h1>
        </div>
        <button onClick={() => setShowModal(true)} className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center gap-2"><Plus size={20}/> NEW</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {albums.map((album) => (
          <motion.div key={album.id} onClick={() => navigate(`/albums/${album.id}`)} className="group bg-white p-6 rounded-[2.5rem] border border-black/5 shadow-sm hover:shadow-xl transition-all cursor-pointer relative">
            <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white mb-6 transition-all"><Folder size={28}/></div>
            <h3 className="text-xl font-bold text-gray-900 mb-1 truncate">{album.name}</h3>
            <div className="flex gap-2 mt-4">
              <button onClick={(e) => { e.stopPropagation(); copyFolderLink(album.id); }} className="flex-1 py-2 bg-gray-100 text-gray-500 rounded-lg text-xs font-black hover:bg-indigo-50 hover:text-indigo-600 transition-all flex justify-center gap-2 items-center"><LinkIcon size={14}/> SHARE</button>
              <button onClick={(e) => { e.stopPropagation(); deleteDoc(doc(db, "albums", album.id)); }} className="p-2 text-gray-300 hover:text-red-500"><Trash2 size={16}/></button>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-6">
            <form onSubmit={createAlbum} className="bg-white p-10 rounded-[3rem] w-full max-w-md shadow-2xl">
              <h2 className="text-2xl font-black mb-6 italic">Create Folder</h2>
              <input placeholder="Name..." className="w-full p-4 bg-gray-50 border border-black/5 rounded-2xl mb-6 outline-none" value={albumName} onChange={(e) => setAlbumName(e.target.value)} />
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 font-bold text-gray-400">Cancel</button>
                <button type="submit" className="flex-1 py-4 bg-black text-white rounded-2xl font-bold">Create</button>
              </div>
            </form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}