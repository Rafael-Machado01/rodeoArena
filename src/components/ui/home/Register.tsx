import { Button } from "@/components/ui/button";
import { TailwindData } from "@/constants/TailwindData";

export default function Register() {
  return (
    <section className={`${TailwindData.centered} flex-col gap-3 mt-9`}>
      <h5 className={TailwindData.sectionHeading}>
        Pronto para gerenciar seus rounds?
      </h5>
      <p className="text-text-muted">
        Acesse as melhores ferramentas de acompanhamento <br /> profissional de
        rodeio. Crie sua conta hoje mesmo.
      </p>
      <Button className="rounded-md" size="lg">
        Criar minha conta grátis
      </Button>
    </section>
  );
}
