"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ImageIcon, Upload, Plus, LogOut, Search, 
  Grid, X, Trash2, Folder, Link as LinkIcon, Menu, Eye 
} from "lucide-react";
import Masonry from "react-masonry-css";
import { auth, db, storage } from "../firebase/config";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { collection, addDoc, query, onSnapshot, orderBy, where, deleteDoc, doc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Dashboard = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [userAlbums, setUserAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [uploadTab, setUploadTab] = useState("file");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [webLink, setWebLink] = useState("");
  const [webLinkName, setWebLinkName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        // Important: Make sure to create the index in Firebase Console!
        const qPhotos = query(
          collection(db, "photos"), 
          where("userId", "==", user.uid), 
          orderBy("createdAt", "desc")
        );
        const unsubPhotos = onSnapshot(qPhotos, (snap) => setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
        
        const qAlbums = query(collection(db, "albums"), where("userId", "==", user.uid));
        const unsubAlbums = onSnapshot(qAlbums, (snap) => setUserAlbums(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
        
        return () => { unsubPhotos(); unsubAlbums(); };
      } else { navigate("/login"); }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  // --- 1. FIXED: Handle Web Link Upload ---
  const handleLinkUpload = async (e) => {
    e.preventDefault();
    if (!webLink) return;
    setUploading(true);
    try {
      await addDoc(collection(db, "photos"), {
        url: webLink,
        name: webLinkName || "Web Fragment",
        userId: currentUser.uid,
        albumId: selectedAlbum || "",
        createdAt: serverTimestamp()
      });
      toast.success("Web Fragment Preserved!");
      setShowModal(false);
      setWebLink("");
      setWebLinkName("");
    } catch (err) {
      console.error(err);
      toast.error("Error Saving Link!");
    } finally {
      setUploading(false);
    }
  };

  const handleBulkUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (files.length === 0) return;
    setUploading(true);
    let completed = 0;
    try {
      await Promise.all(files.map(async (file) => {
        const storageRef = ref(storage, `gallery/${currentUser.uid}/${Date.now()}_${file.name}`);
        const uploadTask = await uploadBytesResumable(storageRef, file);
        const url = await getDownloadURL(uploadTask.ref);
        await addDoc(collection(db, "photos"), {
          url, name: file.name, userId: currentUser.uid, albumId: selectedAlbum, createdAt: serverTimestamp()
        });
        completed++;
        setProgress(Math.round((completed / files.length) * 100));
      }));
      toast.success("Legacies Preserved!");
      setShowModal(false);
    } catch (err) { toast.error("Transmission Interrupted!"); }
    finally { setUploading(false); setProgress(0); }
  };

  const filteredPhotos = useMemo(() => photos.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase())), [photos, searchQuery]);

  return (
    <div className="min-h-screen flex bg-[#0A0A0A] text-[#E9E4D9]">
      
      {/* Sidebar (Same as before) */}
      <aside className={`fixed md:relative z-[60] w-80 h-screen border-r border-white/5 p-8 flex flex-col bg-[#050505] ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-500`}>
        <div className="flex items-center gap-3 mb-16">
          <div className="w-10 h-10 bg-[#A68A56] rounded-full flex items-center justify-center text-black font-black italic">PF</div>
          <h1 className="text-xl font-black tracking-tighter uppercase italic">Vault</h1>
        </div>

        <button 
          onClick={() => setShowModal(true)} 
          className="w-full py-5 bg-[#A68A56] text-black rounded-full flex items-center justify-center gap-3 font-black text-[10px] tracking-[0.2em] mb-12"
        >
          <Plus size={16} strokeWidth={3} /> NEW DEPOSIT
        </button>

        <nav className="flex-1 space-y-4">
          <button onClick={() => navigate("/dashboard")} className="w-full flex items-center gap-4 px-6 py-4 rounded-full text-[10px] font-black tracking-widest bg-white/5 text-[#A68A56]">
            <Grid size={18}/> THE ARCHIVE
          </button>
          <button onClick={() => navigate("/albums")} className="w-full flex items-center gap-4 px-6 py-4 text-white/40 rounded-full text-[10px] font-black tracking-widest">
            <Folder size={18}/> PRIVATE ALBUMS
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5">
          <button onClick={() => signOut(auth)} className="w-full p-4 bg-white/5 text-red-500 rounded-full font-black text-[9px] tracking-widest">TERMINATE SESSION</button>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto">
        <header className="sticky top-0 z-40 backdrop-blur-3xl px-10 py-6 bg-[#0A0A0A]/80 border-b border-white/5">
          <div className="relative max-w-xl">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20" size={18} />
            <input type="text" placeholder="Locate legacy files..." onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-16 pr-6 py-4 rounded-full text-[10px] font-bold outline-none bg-white/5 border border-white/5 uppercase" />
          </div>
        </header>

        <div className="p-10">
          <Masonry breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }} className="flex w-auto gap-10">
            {filteredPhotos.map((photo, i) => (
              <motion.div key={photo.id} className="group relative rounded-[2.5rem] overflow-hidden bg-[#111] border border-white/5 mb-10">
                <img src={photo.url} className="w-full h-auto grayscale group-hover:grayscale-0 transition-all duration-700" loading="lazy" />
                <div className="p-6 flex justify-between items-center">
                  <p className="text-[9px] font-black uppercase opacity-40 truncate">{photo.name}</p>
                  <button onClick={() => deleteDoc(doc(db, "photos", photo.id))} className="text-red-500/50 hover:text-red-500"><Trash2 size={14}/></button>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </div>

        {/* --- FIXED MODAL WITH LINK HANDLER --- */}
        <AnimatePresence>
          {showModal && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 p-4">
              <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="p-12 rounded-[4rem] w-full max-w-2xl bg-[#0F0F0F] border border-[#A68A56]/20">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-3xl font-black uppercase italic text-[#A68A56]">New Deposit</h3>
                  <button onClick={() => setShowModal(false)}><X size={24}/></button>
                </div>

                <div className="flex bg-white/5 p-2 rounded-full mb-10">
                  <button onClick={() => setUploadTab("file")} className={`flex-1 py-4 rounded-full text-[9px] font-black ${uploadTab === 'file' ? 'bg-[#A68A56] text-black' : 'text-white/40'}`}>FILES</button>
                  <button onClick={() => setUploadTab("link")} className={`flex-1 py-4 rounded-full text-[9px] font-black ${uploadTab === 'link' ? 'bg-[#A68A56] text-black' : 'text-white/40'}`}>WEB LINK</button>
                </div>

                {uploading ? (
                  <div className="text-center py-10">
                    <h2 className="text-6xl font-black text-[#A68A56]">{progress}%</h2>
                    <p className="text-[10px] tracking-widest mt-4">UPLOADING...</p>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <select value={selectedAlbum} onChange={(e) => setSelectedAlbum(e.target.value)} className="w-full p-5 rounded-3xl bg-white/5 border border-white/10 text-xs font-bold text-[#A68A56]">
                        <option value="" className="bg-black">Main Vault</option>
                        {userAlbums.map(a => <option key={a.id} value={a.id} className="bg-black">{a.name}</option>)}
                    </select>

                    {uploadTab === "file" ? (
                      <div className="relative border-2 border-dashed border-white/10 rounded-[2rem] p-20 text-center">
                        <input type="file" multiple onChange={handleBulkUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                        <Upload className="mx-auto mb-4 text-[#A68A56]" size={32} />
                        <p className="text-[10px] font-black opacity-40">SELECT LOCAL ASSETS</p>
                      </div>
                    ) : (
                      <form onSubmit={handleLinkUpload} className="space-y-4">
                        <input type="text" placeholder="ASSET NAME" value={webLinkName} onChange={(e) => setWebLinkName(e.target.value)} className="w-full p-5 rounded-3xl bg-white/5 border border-white/10 text-white text-xs" />
                        <input type="url" placeholder="PASTE IMAGE URL" value={webLink} onChange={(e) => setWebLink(e.target.value)} required className="w-full p-5 rounded-3xl bg-white/5 border border-white/10 text-white text-xs" />
                        <button type="submit" className="w-full py-5 bg-[#A68A56] text-black rounded-full font-black text-[10px]">PRESERVE LINK</button>
                      </form>
                    )}
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;