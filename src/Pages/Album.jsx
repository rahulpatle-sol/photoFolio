export default function Albums() {
  const albums = [
    { name: "Goa Trip", keyword: "beach", count: 120 },
    { name: "Mountains", keyword: "mountains", count: 80 },
    { name: "Night City", keyword: "city night", count: 64 },
    { name: "Family", keyword: "family", count: 42 },
  ];

  return (
    <div className="text-white">
      <h1 className="text-3xl font-semibold mb-6">Your Albums</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
        {albums.map((a, i) => (
          <AlbumCard key={i} {...a} />
        ))}
      </div>
    </div>
  );
}
