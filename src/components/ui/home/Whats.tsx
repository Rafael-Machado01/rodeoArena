import WhatsCard from "@/components/ui/home/WhatsCard";

export default function Whats() {
  return (
    <section id="simulador" className="mx-auto max-w-6xl px-4 py-20 md:py-24">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <span className="text-sm font-semibold tracking-widest text-rodeo-gold uppercase">
          Tecnologia na arena
        </span>
        <h2 className="font-heading text-3xl text-text md:text-5xl">
          O que é o rodeoArena?
        </h2>
        <p className="max-w-2xl text-balance text-text-muted">
          A plataforma digital construída para digitalizar, organizar e
          gerenciar todos os aspectos dos rodeios profissionais. Unimos
          tradição e tecnologia.
        </p>
      </div>
      <WhatsCard />
    </section>
  );
}