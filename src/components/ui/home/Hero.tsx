import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="px-4 py-24 md:py-32">
      <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 text-center">
        <h1 className="font-heading text-4xl leading-tight text-text md:text-7xl">
          Cada Round,
          <br />
          <span className="bg-linear-to-r from-rodeo-gold via-rodeo-warning to-rodeo-bronze bg-clip-text text-transparent">
            Registrado.
          </span>
        </h1>
        <p className="max-w-2xl text-balance text-base text-text-muted md:text-lg">
          Gerencie competidores, animais e rounds de rodeio em um sistema
          pensado para quem leva o esporte a sério.
        </p>
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href="/login">
            <Button
              size="lg"
              className="border-rodeo-gold/40 bg-rodeo-surface text-rodeo-gold hover:bg-rodeo-gold/10"
            >
              Acessar o sistema
            </Button>
          </Link>
          <Link href="#simulador">
            <Button size="lg" variant="outline">
              Simular um round
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
