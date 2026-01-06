export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-indigo-600 text-white rounded-[4rem] mx-6 mb-10 overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="text-5xl font-black tracking-tighter mb-6">Want a personal tour?</h2>
        <p className="text-indigo-100 mb-10 text-lg">Hume message karein, hum aapko batayenge ki PhotoFolio aapki life kaise badal sakta hai.</p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <input type="email" placeholder="Enter your email" className="px-8 py-4 rounded-2xl bg-white text-black outline-none w-full md:w-80" />
          <button className="px-10 py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-900 transition-all">Schedule Now</button>
        </div>
      </div>
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
    </section>
  );
}