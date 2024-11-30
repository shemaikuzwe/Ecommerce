import { customerCount, productsCount } from "@/lib/action";
import DashboardCard from "./dashboard-card";
export default async function DashboardCards() {
    const noOfProducts = await productsCount();
    const noOfCustomers = await customerCount();
  return <div className="flex w-full gap-2">
       
     <DashboardCard
       label="Products"
       content={noOfProducts}
        icon="money"
      />
       <DashboardCard
       label="Customers"
       content={noOfCustomers}
        icon="money"
      />
       <DashboardCard
       label="All Orders"
       content={noOfProducts}
        icon="money"
      />
      <DashboardCard
       label="Pending Orders"
       content={noOfProducts}
        icon="money"
      />
  </div>;
}
