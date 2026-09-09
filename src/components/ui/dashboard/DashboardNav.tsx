"use client";

import { DashboardLinks } from "@/constants/Dashboard-Links";
import LinkDashboard from "@/components/ui/dashboard/LinkDashboard";

export default function DashboardNav() {
  return (
    <>
      {DashboardLinks.map((link) => (
        <LinkDashboard
          key={link.id}
          text={link.text}
          href={link.href}
          icon={link.icon}
        />
      ))}
    </>
  );
}