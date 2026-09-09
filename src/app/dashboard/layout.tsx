import { AppSidebar } from "@/components/ui/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import getCurrentUser from "@/lib/user";

export default async function RootLayout({
  children,
}: LayoutProps<"/dashboard">) {
  const user = await getCurrentUser();
  return (
    <SidebarProvider>
      <AppSidebar user={user} />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
