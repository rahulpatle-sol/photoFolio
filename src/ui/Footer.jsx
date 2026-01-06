export default function Footer() {
  return (
    <footer className="py-20 bg-white border-t border-black/5">
      <div className="max-w-7xl mx-auto px-10 flex flex-col md:flex-row justify-between items-center gap-10">
        <div>
          <h3 className="text-2xl font-black italic">PhotoFolio.</h3>
          <p className="text-gray-400 text-sm mt-2">© 2026 Your Name. All rights reserved.</p>
        </div>
        <div className="flex gap-10 text-sm font-bold text-gray-500 uppercase tracking-widest">
          <a href="#" className="hover:text-black transition">Twitter</a>
          <a href="#" className="hover:text-black transition">Instagram</a>
          <a href="#" className="hover:text-black transition">Terms</a>
        </div>
      </div>
    </footer>
  );
}