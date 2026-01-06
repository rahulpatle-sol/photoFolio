import { ShieldCheck, Zap, Share, Cloud } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  { icon: <ShieldCheck size={30}/>, title: "Private by Default", desc: "Aapka data, aapki marzi. Hum kabhi aapki photos nahi dekhte." },
  { icon: <Zap size={30}/>, title: "Lightning Fast", desc: "Optimized compression ki wajah se photos turant load hoti hain." },
  { icon: <Share size={30}/>, title: "Easy Sharing", desc: "Ek click mein private links generate karein aur doston ko bhejein." },
  { icon: <Cloud size={30}/>, title: "Auto Sync", desc: "Aapka data Firestore aur Storage mein hamesha sync rehta hai." }
];

export default function About() {
  return (
    <section className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl font-black tracking-tighter mb-6 leading-tight">
              A vault designed for <br/> <span className="text-indigo-600 italic font-serif">your life story.</span>
            </h2>
            <p className="text-gray-500 text-lg mb-10 leading-relaxed">
              PhotoFolio sirf ek gallery nahi hai, ye ek legacy hai. Humne ise aise design kiya hai ki aap 50 saal baad bhi apni yaadon ko usi quality mein dekh sakein.
            </p>
            <div className="grid grid-cols-2 gap-8">
              {features.map((f, i) => (
                <div key={i} className="space-y-3">
                  <div className="text-indigo-600">{f.icon}</div>
                  <h4 className="font-bold text-gray-900">{f.title}</h4>
                  <p className="text-sm text-gray-500">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
          <motion.div 
            whileInView={{ scale: [0.9, 1], opacity: [0, 1] }}
            className="bg-indigo-50 rounded-[3rem] p-12 aspect-square flex items-center justify-center relative overflow-hidden"
          >
             <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(circle, #4f46e5 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
             <div className="bg-white p-8 rounded-[2rem] shadow-2xl z-10 border border-indigo-100">
                <img src="https://images.unsplash.com/photo-1554080353-a576cf803bda?q=80&w=500" className="rounded-2xl mb-4" alt="photography" />
                <p className="text-center font-bold text-gray-800 tracking-tight">Relive Every Detail</p>
             </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}