import { ReactNode } from "react";
import { Navbar } from "@/components/ui/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="w-full">
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
}
