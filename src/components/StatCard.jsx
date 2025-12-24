export function StatCard({ title, value }) {
  return (
    <div className="bg-white/10 backdrop-blur-lg border border-white/20
      rounded-xl p-4 text-white shadow">
      <p className="text-sm text-white/60">{title}</p>
      <h3 className="text-2xl font-bold">{value}</h3>
    </div>
  );
}
