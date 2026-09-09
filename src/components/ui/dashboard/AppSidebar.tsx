import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

import Logo from "@/components/ui/home/Logo";
import { TailwindData } from "@/constants/TailwindData";

import type { User as userType } from "@/types/User";
import CardUser from "@/components/ui/dashboard/CardUser";
import DashboardNav from "@/components/ui/dashboard/DashboardNav";

interface AppSideBarProps {
  user: userType | null;
}

export function AppSidebar({ user }: AppSideBarProps) {
  return (
    <Sidebar>
      <SidebarHeader className={TailwindData.centered}>
        <Logo />
      </SidebarHeader>
      <SidebarContent className="gap-2">
        <DashboardNav />
      </SidebarContent>
      <SidebarFooter>{user && <CardUser user={user} />}</SidebarFooter>
    </Sidebar>
  );
}