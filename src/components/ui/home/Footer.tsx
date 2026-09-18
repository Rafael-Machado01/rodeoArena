import { ArrowUpRight, Plus } from "lucide-react";
import Link from "next/link";

import Logo from "@/components/ui/home/Logo";
import { NavbarLinks } from "@/constants/Navbar-Links";
import { TailwindData } from "@/constants/TailwindData";

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-rodeo-gold/15 bg-rodeo-surface/60">
      <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 px-4 py-12 md:flex-row md:px-8">
        <div className="flex max-w-sm flex-col gap-4">
          <Logo />
          <p className="text-sm leading-relaxed text-text-muted">
            Plataforma de alta performance para gerenciamento e cronometragem
            oficial de rodeios profissionais.
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <h4 className="font-heading text-sm font-semibold tracking-widest text-rodeo-gold uppercase">
            Navegação
          </h4>
          {NavbarLinks.map((link) => (
            <Link
              className={`${TailwindData.linkHover} text-sm`}
              key={link.id}
              href={link.href}
            >
              {link.text}
            </Link>
          ))}
        </div>
      </div>
      <div className="border-t border-rodeo-gold/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-4 py-5 sm:flex-row md:px-8">
          <p className="text-xs text-text-muted">
            rodeoArena &copy; 2026. Licença MIT.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="github.com/Rafael-Machado01"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-sm text-text-muted transition-colors hover:text-rodeo-gold"
            >
              <ArrowUpRight className="size-4" />
              Github
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-1 text-sm text-rodeo-gold transition-colors hover:text-rodeo-warning"
            >
              <Plus className="size-4" />
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}