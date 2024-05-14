import { Metadata } from "next";
import { customerCount, productsCount } from "@/app/_lib/action";

export default async function Dashboard() {
  const noOfProducts = await productsCount();
  const noOfCustomers = await customerCount();
  return (
    <div className="p-2">
      <div className="flex gap-2">
        <div className="block p-3 border rounded-md w-56 h-32">
          <span className={"text-xl"}>Products:</span>
          <span>{noOfProducts}</span>
        </div>
        <div className="block p-3 border rounded-md w-56 h-32">
          <span className={"text-xl"}>Customers:</span>
          <span>{noOfCustomers}</span>
        </div>
        <div className="block p-3 border rounded-md w-56 h-32">
          <span className={"text-xl"}>Products:</span>
          <span>{noOfProducts}</span>
        </div>
      </div>
    </div>
  );
}
export const metadata: Metadata = {
  title: "Admin",
};
