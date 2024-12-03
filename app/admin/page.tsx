import { Metadata } from "next";
import { Suspense } from "react";
import DashboardCards from "@/components/admin/dashboard-cards";
import DashboardCardsSkeleton from "@/components/skeltons/dashboard-card";

export default async function Dashboard() {
  return (
    <div className=" h-fu;; w-full flex-col mx-4">
      <Suspense fallback={<DashboardCardsSkeleton/>}>
        <DashboardCards/>
      </Suspense>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Admin",
};
