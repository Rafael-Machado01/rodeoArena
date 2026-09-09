interface NavbarLinksType {
  id: number;
  text: string;
  href: string;
}

export const NavbarLinks: NavbarLinksType[] = [
  { id: 1, text: "Início", href: "/" },
  { id: 2, text: "Competidores", href: "#competidores" },
  { id: 3, text: "Animais", href: "#animais" },
];
