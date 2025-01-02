import { DashSidebar } from "@/components/admin/sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Columns2 } from "lucide-react";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex p-2 w-full min-h-screen ">
        <DashSidebar />
        <SidebarTrigger>
         <div className=" flex gap-2 z-10">
         <Columns2 />
         </div>
        </SidebarTrigger>
        <main className="p-6 flex-1  bg-muted/50">{children}</main>
      </div>
    </SidebarProvider>
  );
}
