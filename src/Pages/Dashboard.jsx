import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { StatCard } from "../components/StatCard";
import AlbumsList from "../components/AlbumList";
import ImagesList from "../components/ImageList";
import { useState } from "react";

export default function Dashboard() {
  const [album, setAlbum] = useState(null);

  return (
    <div className="bg-gradient-to-br from-slate-900 via-indigo-900 to-blue-900 min-h-screen">

      <Sidebar />

      <main className="ml-20 md:ml-64 p-6">
        <Topbar />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <StatCard title="Total Albums" value="12" />
          <StatCard title="Total Photos" value="248" />
          <StatCard title="Storage Used" value="1.8 GB" />
        </div>

        {/* Main Content */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10
          rounded-2xl p-4">
          {!album ? (
            <AlbumsList setSelectedAlbum={setAlbum} />
          ) : (
            <ImagesList album={album} goBack={() => setAlbum(null)} />
          )}
        </div>
      </main>
    </div>
  );
}
