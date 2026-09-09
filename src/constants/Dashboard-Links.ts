import {
  LayoutDashboard,
  ListOrdered,
  Target,
  UserGroup,
  type LucideIcon,
  PawPrint,
  Medal,
} from "lucide-react";

interface DashboardLinksProps {
  id: number;
  text: string;
  icon: LucideIcon;
  href: string;
}

export const DashboardLinks: DashboardLinksProps[] = [
  {
    id: 1,
    text: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    id: 2,
    text: "Rounds",
    icon: ListOrdered,
    href: "/dashboard/rounds",
  },
  {
    id: 3,
    text: "Simulador",
    icon: Target,
    href: "/dashboard/simulator",
  },
  {
    id: 4,
    text: "Competidores",
    icon: UserGroup,
    href: "/dashboard/competitors",
  },
  {
    id: 5,
    text: "Animais",
    icon: PawPrint,
    href: "/dashboard/animals",
  },
  {
    id: 6,
    text: "Ranking",
    icon: Medal,
    href: "/dashboard/ranking",
  },
];
