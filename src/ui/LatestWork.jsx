export default function LatestWork() {
  const works = [
    { url: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34", title: "Paris Trip" },
    { url: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e", title: "Mountains" },
    { url: "https://images.unsplash.com/photo-1519741497674-611481863552", title: "Wedding" }
  ];

  return (
    <section id="work" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-10">
        <h2 className="text-3xl font-black mb-12">Latest User Folios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {works.map((work, i) => (
            <div key={i} className="group relative rounded-3xl overflow-hidden aspect-square">
              <img src={work.url} className="w-full h-full object-cover transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                <p className="text-white font-bold">{work.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}