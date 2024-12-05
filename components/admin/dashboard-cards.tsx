import DashboardCard from "./dashboard-card";
import {getAllUsers, getProducts} from "@/lib/action/server";
export default async function DashboardCards() {
    const noOfProducts = await getProducts();
    const noOfCustomers = await getAllUsers();
  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
       
     <DashboardCard
       label="Products"
       content={noOfProducts.length}
        icon="money"
      />
       <DashboardCard
       label="Customers"
       content={noOfCustomers.length}
        icon="money"
      />
       <DashboardCard
       label="All Orders"
       content={noOfProducts.length}
        icon="money"
      />
      <DashboardCard
       label="Pending Orders"
       content={noOfProducts.length}
        icon="money"
      />
  </div>;
}
