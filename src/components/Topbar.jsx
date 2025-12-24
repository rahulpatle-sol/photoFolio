export default function Topbar() {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h2 className="text-2xl font-semibold text-white">
          Hello Rahul 👋
        </h2>
        <p className="text-white/60 text-sm">
          Welcome back to PhotoFolio
        </p>
      </div>

      <div className="flex items-center gap-4">
        <button className="text-white/70">🔍</button>
        <button className="text-white/70">🔔</button>
        <div className="w-10 h-10 rounded-full bg-white/30" />
      </div>
    </div>
  );
}
