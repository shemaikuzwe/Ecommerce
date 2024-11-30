import { Metadata } from "next";
import { Suspense } from "react";
import DashboardCards from "@/components/dashboard-cards";
import DashboardCardsSkeleton from "@/components/skeltons/dashboard-card";

export default async function Dashboard() {
  return (
    <div className=" h-screen w-full flex-col gap-2 mx-4">
      <Suspense fallback={<DashboardCardsSkeleton/>}>
        <DashboardCards/>
      </Suspense>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Admin",
};
