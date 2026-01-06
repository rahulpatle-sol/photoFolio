import { Check } from "lucide-react";

export default function Pricing() {
  return (
    <section className="py-32 bg-[#fafafa]">
      <div className="max-w-5xl mx-auto px-10 text-center">
        <h2 className="text-5xl font-black tracking-tighter mb-4">Simple, honest pricing.</h2>
        <p className="text-gray-500 mb-16">No hidden fees. Choose the plan that fits your needs.</p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Free Plan */}
          <div className="bg-white p-10 rounded-[3rem] border border-black/5 text-left hover:shadow-xl transition-all group">
            <h3 className="text-xl font-bold mb-2">Starter</h3>
            <div className="text-4xl font-black mb-6">$0 <span className="text-lg font-medium text-gray-400">/forever</span></div>
            <ul className="space-y-4 mb-10">
              <PricingItem text="Up to 100 Photos" />
              <PricingItem text="Standard Support" />
              <PricingItem text="Mobile Access" />
            </ul>
            <button className="w-full py-4 bg-gray-100 rounded-2xl font-bold hover:bg-black hover:text-white transition-all">Get Started</button>
          </div>

          {/* Pro Plan */}
          <div className="bg-black p-10 rounded-[3rem] text-left shadow-2xl shadow-indigo-500/20 relative overflow-hidden group">
            <div className="absolute top-6 right-6 px-4 py-1 bg-indigo-500 text-white text-[10px] font-black rounded-full">POPULAR</div>
            <h3 className="text-xl font-bold mb-2 text-white">Legendary</h3>
            <div className="text-4xl font-black mb-6 text-white">$9 <span className="text-lg font-medium text-gray-500">/month</span></div>
            <ul className="space-y-4 mb-10">
              <PricingItem text="Unlimited Storage" isDark />
              <PricingItem text="High-Res Video Support" isDark />
              <PricingItem text="Priority Cloud Sync" isDark />
              <PricingItem text="Custom Domain Folio" isDark />
            </ul>
            <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all">Upgrade Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

const PricingItem = ({ text, isDark }) => (
  <li className={`flex items-center gap-3 text-sm font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
    <div className={`p-1 rounded-full ${isDark ? 'bg-indigo-500/20 text-indigo-400' : 'bg-indigo-50 text-indigo-600'}`}>
      <Check size={14} />
    </div>
    {text}
  </li>
);