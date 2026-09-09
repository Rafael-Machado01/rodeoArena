import WhatsCard from "@/components/ui/home/WhatsCard";
import { TailwindData } from "@/constants/TailwindData";

export default function Whats() {
  return (
    <section className="mt-20">
      <div className={`${TailwindData.centered} flex-col gap-4`}>
        <span className={TailwindData.spanSection}>TECNOLOGIA NA ARENA</span>
        <h2 className={TailwindData.sectionHeading}>
          O que é o rodeoArena?
        </h2>
        <p className="text-text-muted">
          A plataforma digital construída para digitalizar,orgainzar e gerenciar
          todos os aspectos <br /> dos rodeios profissionais. Unimos tradição e
          tecnlogia.
        </p>
        <WhatsCard />
      </div>
    </section>
  );
}
