export default function Sidebar() {
  return (
    <aside className="w-20 md:w-64 h-screen fixed left-0 top-0 
      bg-gradient-to-b from-indigo-600 to-blue-700
      text-white flex flex-col items-center py-6 gap-8">

      <div className="text-xl font-bold">📸</div>

      <nav className="flex flex-col gap-6 text-white/80">
        <button className="hover:text-white">🏠</button>
        <button className="hover:text-white">🖼</button>
        <button className="hover:text-white">📅</button>
        <button className="hover:text-white">🔍</button>
        <button className="hover:text-white">👤</button>
      </nav>
    </aside>
  );
}
