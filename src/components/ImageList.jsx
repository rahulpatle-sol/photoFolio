import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/config";
import ImageForm from "../forms/ImageForm";

export default function ImagesList({ album, goBack }) {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const q = query(
      collection(db, "images"),
      where("albumId", "==", album.id)
    );

    const unsub = onSnapshot(q, (snap) => {
      setImages(snap.docs.map((d) => ({ id: d.id, ...d.data() })));
    });

    return () => unsub();
  }, [album.id]);

  return (
    <div>
      <button onClick={goBack} className="mb-4">⬅ Back</button>

      <ImageForm album={album} />

      <div className="grid grid-cols-3 gap-4">
        {images.map((img) => (
          <img
            key={img.id}
            src={img.imageUrl}
            alt=""
            className="rounded shadow cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
}
