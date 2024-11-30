import { OrderManagement } from "@/components/order-management";
import { getAllOrders } from "@/lib/action";

export default async function Page() {
  // const orders = await getAllOrders();
  // console.log(orders);

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold mb-6">Orders</h1>
      <OrderManagement />
    </div>
  );
}
