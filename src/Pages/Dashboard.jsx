import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import { 
  ImageIcon, Upload, Plus, LogOut, Search, 
  Grid, X, Trash2, Folder, Link as LinkIcon, Menu, Maximize2 
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
  const [darkMode, setDarkMode] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [webLink, setWebLink] = useState("");
  const [webLinkName, setWebLinkName] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        const qPhotos = query(collection(db, "photos"), where("userId", "==", user.uid), orderBy("createdAt", "desc"));
        const unsubPhotos = onSnapshot(qPhotos, (snap) => setPhotos(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
        const qAlbums = query(collection(db, "albums"), where("userId", "==", user.uid));
        const unsubAlbums = onSnapshot(qAlbums, (snap) => setUserAlbums(snap.docs.map(d => ({ id: d.id, ...d.data() }))));
        return () => { unsubPhotos(); unsubAlbums(); };
      } else { navigate("/login"); }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  const copyToClipboard = (text, msg) => {
    navigator.clipboard.writeText(text);
    toast.success(msg);
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
      toast.success("Folder Uploaded!");
      setShowModal(false);
    } catch (err) { toast.error("Upload Error!"); }
    finally { setUploading(false); setProgress(0); }
  };

  const handleLinkUpload = async (e) => {
    e.preventDefault();
    setUploading(true);
    try {
      await addDoc(collection(db, "photos"), {
        url: webLink, name: webLinkName || "Web Image", userId: currentUser.uid, albumId: selectedAlbum, createdAt: serverTimestamp()
      });
      toast.success("Saved!");
      setShowModal(false); setWebLink(""); setWebLinkName("");
    } catch (err) { toast.error("Error!"); }
    finally { setUploading(false); }
  };

  const filteredPhotos = useMemo(() => photos.filter(p => p.name?.toLowerCase().includes(searchQuery.toLowerCase())), [photos, searchQuery]);

  return (
    <div className={`min-h-screen flex flex-col md:flex-row ${darkMode ? 'bg-[#050505] text-white' : 'bg-[#f8f9fa] text-gray-900'}`}>
      <aside className={`fixed md:relative z-[60] w-72 h-screen border-r p-6 flex flex-col ${darkMode ? 'bg-[#0a0a0a] border-white/5' : 'bg-white border-gray-200'} ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} transition-transform duration-300`}>
        <div className="flex items-center gap-3 mb-10">
          <div className="p-2 bg-indigo-600 rounded-xl text-white"><ImageIcon size={24} /></div>
          <h1 className="text-xl font-black italic tracking-tighter uppercase">PhotoFolio</h1>
        </div>
        <button onClick={() => setShowModal(true)} className="w-full py-4 bg-indigo-600 text-white rounded-2xl flex items-center justify-center gap-2 font-black text-xs mb-8 shadow-xl shadow-indigo-600/20"><Plus size={20} /> ADD MEMORY</button>
        <nav className="flex-1 space-y-2">
          <button onClick={() => navigate("/dashboard")} className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-sm font-bold bg-white/5 text-indigo-400"><Grid size={18}/> Library</button>
          <button onClick={() => navigate("/albums")} className="w-full flex items-center gap-4 px-5 py-4 text-gray-500 hover:text-indigo-600 rounded-2xl text-sm font-bold"><Folder size={18}/> Albums</button>
        </nav>
        <div className="mt-auto space-y-4 pt-4 border-t border-white/5">
          <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/5">
            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${currentUser?.email}`} className="w-10 h-10 rounded-full border border-indigo-500/20" alt="pfp" />
            <p className="text-sm font-bold truncate">{currentUser?.email?.split('@')[0]}</p>
          </div>
          <button onClick={() => signOut(auth)} className="w-full p-3 bg-red-500/10 text-red-500 rounded-xl font-bold text-xs">Logout</button>
        </div>
      </aside>

      <main className="flex-1 h-screen overflow-y-auto w-full">
        <header className="sticky top-0 z-40 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center gap-4 bg-[#050505]/60">
          <button className="md:hidden" onClick={() => setIsSidebarOpen(!isSidebarOpen)}><Menu/></button>
          <div className="relative max-w-md w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search by name..." onChange={(e) => setSearchQuery(e.target.value)} className="w-full pl-11 pr-4 py-2.5 rounded-xl text-sm outline-none bg-white/5 border border-white/5 focus:border-indigo-500" />
          </div>
        </header>

        <div className="p-6">
          <Masonry breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }} className="flex w-auto gap-6">
            {filteredPhotos.map((photo) => (
              <motion.div layout key={photo.id} className="rounded-[2rem] overflow-hidden mb-6 border border-white/5 group relative bg-black/5" onClick={() => setPreviewImage(photo.url)}>
                <img src={photo.url} className="w-full h-auto cursor-zoom-in" loading="lazy" />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                  <div className="w-full">
                    <p className="text-[10px] font-black text-white mb-3 uppercase truncate">{photo.name}</p>
                    <div className="flex gap-2">
                      <button onClick={(e) => { e.stopPropagation(); copyToClipboard(photo.url, "Link Copied! 🖼️"); }} className="flex-1 py-2 bg-indigo-600 text-white rounded-lg text-[10px] font-black flex items-center justify-center gap-2"><LinkIcon size={12}/> SHARE</button>
                      <button onClick={(e) => { e.stopPropagation(); deleteDoc(doc(db, "photos", photo.id)); }} className="p-2 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white rounded-lg"><Trash2 size={14}/></button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </Masonry>
        </div>

        <AnimatePresence>
          {showModal && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
              <div className="p-8 rounded-[2.5rem] w-full max-w-md bg-[#121212] border border-white/10 text-white">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-black italic">Add Memory</h3>
                  <button onClick={() => setShowModal(false)}><X/></button>
                </div>
                <div className="flex bg-white/5 p-1 rounded-2xl mb-6">
                  <button onClick={() => setUploadTab("file")} className={`flex-1 py-3 rounded-xl text-[10px] font-black ${uploadTab === 'file' ? 'bg-indigo-600' : ''}`}>FILES</button>
                  <button onClick={() => setUploadTab("link")} className={`flex-1 py-3 rounded-xl text-[10px] font-black ${uploadTab === 'link' ? 'bg-indigo-600' : ''}`}>LINK</button>
                </div>
                <div className="space-y-4 mb-6 text-black">
                   <select value={selectedAlbum} onChange={(e) => setSelectedAlbum(e.target.value)} className="w-full p-4 rounded-2xl font-bold text-sm bg-gray-100">
                     <option value="">Library (All)</option>
                     {userAlbums.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
                   </select>
                   {uploadTab === "link" && <input type="text" placeholder="Memory Name" value={webLinkName} onChange={(e) => setWebLinkName(e.target.value)} className="w-full p-4 rounded-2xl font-bold text-sm bg-gray-100" />}
                </div>
                {uploadTab === "file" ? (
                  <div className="border-2 border-dashed border-white/10 rounded-[2rem] p-12 text-center relative group">
                    <input type="file" multiple onChange={handleBulkUpload} className="absolute inset-0 opacity-0 cursor-pointer" />
                    <Upload className="mx-auto mb-2 text-indigo-500" size={32} />
                    <p className="text-sm font-bold text-gray-400">Upload Folder/Photos</p>
                  </div>
                ) : (
                  <form onSubmit={handleLinkUpload} className="space-y-4">
                    <input type="url" placeholder="Paste link..." value={webLink} onChange={(e) => setWebLink(e.target.value)} required className="w-full p-4 rounded-2xl bg-gray-100 text-black text-sm" />
                    <button type="submit" className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs">SAVE</button>
                  </form>
                )}
              </div>
            </div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Dashboard;