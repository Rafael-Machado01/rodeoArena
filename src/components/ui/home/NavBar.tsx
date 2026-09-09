import Logo from "@/components/ui/home/Logo";
import { TailwindData } from "@/constants/TailwindData";
import { NavbarLinks } from "@/constants/Navbar-Links";
import Link from "next/link";
import { Button } from "../button";
export default function Navbar() {
  return (
    <header className="sticky bg-rodeo-bg h-10 top-0 z-50 shadow-lg border-b border-rodeo-bronze/50">
      <div className="mx-2 md:mx-10 flex items-center justify-between text-center">
        <Logo />
        <div className="flex gap-1 md:gap-8 items-center mt-0.5">
          {NavbarLinks.map((link) => (
            <Link
              className={`${TailwindData.linkHover} text-xs md:text-base`}
              key={link.id}
              href={link.href}
            >
              {link.text}
            </Link>
          ))}
          <Link href="/login">
            <Button className=" rounded-md" variant="default" size="lg">
              Acessar
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
