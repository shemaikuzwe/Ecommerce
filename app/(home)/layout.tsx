import { ReactNode } from "react";
import { Navbar } from "@/components/ui/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full h-full">
      <div>
        <Navbar />
      </div>
      <main className={"bg-muted/50"}>{children}</main>
    </div>
  );
}
