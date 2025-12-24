import { useState } from "react";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage, db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

export default function ImageForm({ album }) {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");

  const uploadImage = async (e) => {
    e.preventDefault();
    if (!file) return;

    const imgRef = ref(storage, `images/${album.id}/${file.name}`);
    await uploadBytes(imgRef, file);

    const url = await getDownloadURL(imgRef);

    await addDoc(collection(db, "images"), {
      albumId: album.id,
      title,
      imageUrl: url,
      createdAt: serverTimestamp(),
    });

    setFile(null);
    setTitle("");
  };

  return (
    <form onSubmit={uploadImage} className="mb-4">
      <input
        type="text"
        placeholder="Image title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border px-3 py-2 w-full mb-2"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button className="bg-black text-white px-4 py-2 rounded">
        Upload Image
      </button>
    </form>
  );
}
