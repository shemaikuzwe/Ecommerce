import { DashSidebar } from "@/components/admin/sidebar"
import { SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex p-2 w-full min-h-screen ">
        <DashSidebar />
        <main className="p-6 flex-1">{children}</main>
      </div>
    </SidebarProvider>
  );
}
