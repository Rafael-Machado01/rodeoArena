import { Button } from "@/components/ui/button";
import { TailwindData } from "@/constants/TailwindData";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="mt-30 mx-2">
      <div className={`${TailwindData.centered}  flex-col gap-4 `}>
        <span className={TailwindData.spanSection}>SISTEMA DE RODEIO</span>
        <h1 className="text-2xl md:text-8xl text-text font-heading">
          Cada Round,
          <br /> Registrado.
        </h1>
        <p className="text-text-muted">
          Gerencie competidores, animais,e rounds de rodeio em um sistema <br />
          pensado para quem leva o esporte a sério.
        </p>
        <div className={`${TailwindData.centered} gap-1`}>
          <Link href="/login">
            <Button className="shadow-2xl" size="lg">
              Acessar o sistema
            </Button>
          </Link>
          <Link href="#simulador">
            <Button className="shadow-2xl" size="lg" variant="outline">
              Simular um round
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
