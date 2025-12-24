import { useState } from "react";
import { storage, db } from "../firebase/config";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

export default function ImageForm({ albumId }) {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file || !title) return alert("Missing data");

    try {
      setLoading(true);

      const imageRef = ref(
        storage,
        `albums/${albumId}/${Date.now()}-${file.name}`
      );

      await uploadBytes(imageRef, file);
      const url = await getDownloadURL(imageRef);

      await addDoc(collection(db, "albums", albumId, "images"), {
        title,
        url,
        createdAt: new Date(),
      });

      setTitle("");
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-xl shadow mb-6">
      <input
        type="text"
        placeholder="Image title"
        className="w-full mb-3 p-2 border rounded"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className="mt-3 px-4 py-2 bg-black text-white rounded"
      >
        {loading ? "Uploading..." : "Upload Image"}
      </button>
    </div>
  );
}
