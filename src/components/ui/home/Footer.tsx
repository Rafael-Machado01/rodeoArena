import Logo from "@/components/ui/home/Logo";
import { NavbarLinks } from "@/constants/Navbar-Links";
import { TailwindData } from "@/constants/TailwindData";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-t-rodeo-bronze/50 mt-5 py-4">
      <div className="flex justify-between mx-2 md:mx-10">
        <div className="flex flex-col gap-3">
          <Logo />
          <p className="text-text-muted">
            Plataforma de alta performance para <br /> gerencimento e
            cronomentragem oficial de <br /> rodeios profissionais.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="text-text font-heading">Plataforma</h4>
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
      <br />
      <div className={`${TailwindData.centered} gap-4`}>
        <p className="text-text-muted text-xs text-center">
          rodeoArena &copy; 2026. Lincense MIT.
        </p>
        <Link
          href="github.com/Rafael-Machado01"
          className="text-text-muted text-sm"
        >
          🔗 Github
        </Link>
      </div>
    </footer>
  );
}
