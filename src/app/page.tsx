import Navbar from "@/components/ui/home/NavBar";
import Hero from "@/components/ui/home/Hero";
import Whats from "@/components/ui/home/Whats";
import Register from "@/components/ui/home/Register";
import Footer from "@/components/ui/home/Footer";
export default function Home() {
  return (
    <main className="flex flex-col gap-5">
      <Navbar />
      <Hero />
      <Whats />
      <Register />
      <Footer />
    </main>
  );
}
