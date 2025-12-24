import Navbar from "../components/Navbar";
import HowItWorksDraggable from "../ui/Features";
import Hero from "../ui/Hero";

export default function Landing() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#f7fafa] to-[#eef6f9]">
      <Navbar />
      <Hero />
      <HowItWorksDraggable/>
    </main>
  );
}
