import SideNav from "@/components/sideNav";
import { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex p-2">
      <div>{<SideNav />}</div>
      <div>{children}</div>
    </div>
  );
}
