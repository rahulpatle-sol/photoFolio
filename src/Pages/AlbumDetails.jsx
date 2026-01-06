import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { db, auth } from "../firebase/config";
import { collection, query, where, onSnapshot, orderBy, doc, getDoc } from "firebase/firestore";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, Search } from "lucide-react";
import Masonry from "react-masonry-css";

export default function AlbumDetails() {
  const { albumId } = useParams(); // URL se ID uthata hai
  const [photos, setPhotos] = useState([]);
  const [albumData, setAlbumData] = useState(null);
  const navigate = useNavigate();
  const user = auth.currentUser;

  useEffect(() => {
    if (!albumId || !user) return;

    // 1. Album ka naam fetch karo
    getDoc(doc(db, "albums", albumId)).then(snap => {
      if (snap.exists()) setAlbumData(snap.data());
    });

    // 2. Sirf is Album ki photos fetch karo
    const q = query(
      collection(db, "photos"),
      where("albumId", "==", albumId), // Filter by Folder ID
      where("userId", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setPhotos(snapshot.docs.map(d => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [albumId, user]);

  return (
    <div className="min-h-screen bg-[#fafafa] p-6 md:p-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <div className="flex items-center gap-6">
            <button onClick={() => navigate("/albums")} className="p-4 bg-white rounded-2xl shadow-sm hover:scale-105 transition-all">
              <ArrowLeft size={24} />
            </button>
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tighter">
                {albumData?.name || "Loading..."}
              </h1>
              <p className="text-indigo-600 font-bold italic font-serif">Folder Collection</p>
            </div>
          </div>
        </header>

        {/* Photos Grid */}
        {photos.length > 0 ? (
          <Masonry
            breakpointCols={{ default: 4, 1100: 3, 700: 2, 500: 1 }}
            className="flex w-auto gap-6"
            columnClassName="bg-clip-padding"
          >
            {photos.map((photo) => (
              <motion.div 
                layout key={photo.id}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="rounded-[2rem] overflow-hidden mb-6 border border-black/5 shadow-sm group relative"
              >
                <img src={photo.url} alt={photo.name} className="w-full h-auto block" />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </Masonry>
        ) : (
          <div className="text-center py-32 opacity-20 border-2 border-dashed border-gray-300 rounded-[3rem]">
            <ImageIcon size={80} className="mx-auto mb-4" />
            <p className="text-2xl font-black italic">No photos in this folder yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}