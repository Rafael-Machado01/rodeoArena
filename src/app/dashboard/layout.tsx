import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/ui/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toast";
import getCurrentUser from "@/lib/user";

export default async function RootLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/");
  }
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main className="w-full p-2 overflow-x-hidden">
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
