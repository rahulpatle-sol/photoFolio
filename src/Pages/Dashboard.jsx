import { useState } from "react";
import AlbumsList from "../components/AlbumList";
import ImagesList from  "../components/ImageList"

export default function Dashboard() {
  const [album, setAlbum] = useState(null);

  return (
    <div className="p-6">
      {!album ? (
        <AlbumsList setSelectedAlbum={setAlbum} />
      ) : (
        <ImagesList album={album} goBack={() => setAlbum(null)} />
      )}
    </div>
  );
}
