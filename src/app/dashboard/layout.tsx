import { AppSidebar } from "@/components/ui/dashboard/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toast";
import getCurrentUser from "@/lib/user";
import { redirect } from "next/navigation";

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
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <Toaster />
    </SidebarProvider>
  );
}
