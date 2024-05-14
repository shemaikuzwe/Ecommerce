import { ReactNode } from "react";
import Navbar from "@/app/_components/navbar";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>{children}</div>
    </div>
  );
}
