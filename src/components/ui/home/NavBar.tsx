import Link from "next/link";

import { Button } from "@/components/ui/button";
import Logo from "@/components/ui/home/Logo";
import { NavbarLinks } from "@/constants/Navbar-Links";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-rodeo-gold/20 bg-rodeo-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-8">
        <Logo />
        <nav className="flex items-center gap-6">
          {NavbarLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="relative text-sm font-medium text-text-muted transition-colors hover:text-text after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:bg-linear-to-r after:from-rodeo-gold after:to-rodeo-bronze after:transition-all hover:after:w-full"
            >
              {link.text}
            </Link>
          ))}
          <Link href="/login">
            <Button
              className="border-rodeo-gold/40 bg-rodeo-surface text-rodeo-gold hover:bg-rodeo-gold/10"
              size="lg"
            >
              Acessar
            </Button>
          </Link>
        </nav>
      </div>
    </header>
  );
}