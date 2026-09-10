import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { inter, playfair } from "./fonts";
import { EdgeStoreProvider } from "@/lib/edgestore";

export const metadata: Metadata = {
  title: "rodeoArena",
  description: "Seu sistema de gerenciamento de rodeio.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      className={cn("font-sans", inter.variable, playfair.variable)}
    >
      <body className="bg-rodeo-bg">
        <EdgeStoreProvider>{children}</EdgeStoreProvider>
      </body>
    </html>
  );
}
