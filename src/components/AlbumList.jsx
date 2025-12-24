import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import AlbumForm from  "../forms/AlbumForm"

export default function AlbumsList({ setSelectedAlbum }) {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "albums"), (snap) => {
      setAlbums(
        snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      );
    });
    return () => unsub();
  }, []);

  return (
    <div>
      <AlbumForm />

      <div className="grid grid-cols-2 gap-4">
        {albums.map((a) => (
          <div
            key={a.id}
            onClick={() => setSelectedAlbum(a)}
            className="p-4 border rounded cursor-pointer hover:bg-gray-100"
          >
            📁 {a.name}
          </div>
        ))}
      </div>
    </div>
  );
}
