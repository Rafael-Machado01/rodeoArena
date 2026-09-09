"use client";
import { buttonVariants } from "../button";
import { TailwindData } from "@/constants/TailwindData";
import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkDashboardProps {
  text: string;
  icon: LucideIcon;
  href: string;
}

export default function LinkDashboard({
  text,
  icon: Icon,
  href,
}: LinkDashboardProps) {
  const pathname = usePathname();
  const active = pathname === href;
  return (
    <Link
      href={href}
      className={cn(
        buttonVariants({ variant: "ghost", size: "default" }),
        "mx-2",
        active
          ? TailwindData.linkDashboardActive
          : TailwindData.linkDashboardBase,
      )}
    >
      <Icon className="size-4 shrink-0 text-text-muted" />
      <span className={active ? TailwindData.spanSection : "text-text-muted"}>
        {text}
      </span>
    </Link>
  );
}
