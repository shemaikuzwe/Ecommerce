import Orders from "@/components/orders";
import { getOrders } from "@/lib/action";
import { auth } from "@/app/auth";

export default async function Page() {
  const session = await auth();
  const userId:string|undefined = session?.user?.id;
  const orders = await getOrders(userId);
  return <Orders order={orders} />;
}
