import Footer from "@/components/ui/home/Footer";
import Hero from "@/components/ui/home/Hero";
import Navbar from "@/components/ui/home/NavBar";
import Register from "@/components/ui/home/Register";
import Whats from "@/components/ui/home/Whats";
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
