import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/config";

export default function AlbumForm() {
  const [name, setName] = useState("");

  const addAlbum = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    await addDoc(collection(db, "albums"), {
      name,
      createdAt: serverTimestamp(),
    });

    setName("");
  };

  return (
    <form onSubmit={addAlbum} className="flex gap-2 mb-4">
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="New Album Name"
        className="border px-3 py-2 rounded w-full"
      />
      <button className="bg-black text-white px-4 rounded">
        Create
      </button>
    </form>
  );
}
