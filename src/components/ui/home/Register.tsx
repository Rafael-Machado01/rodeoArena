import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Register() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-20 md:py-24">
      <div className="rounded-3xl border border-rodeo-gold/25 bg-rodeo-surface px-6 py-14 text-center md:py-16">
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-heading text-3xl text-text md:text-5xl">
            Pronto para gerenciar seus rounds?
          </h2>
          <p className="max-w-xl text-balance text-text-muted">
            Acesse as melhores ferramentas de acompanhamento profissional de
            rodeio. Crie sua conta hoje mesmo.
          </p>
          <Link href="/login">
            <Button
              size="lg"
              className="mt-2 border-rodeo-gold/40 bg-rodeo-surface text-rodeo-gold hover:bg-rodeo-gold/10"
            >
              Criar minha conta grátis
              <ArrowRight className="ml-2 size-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}