import Orders from "@/app/_components/orders";
import { getOrders } from "@/app/_lib/action";
import { auth } from "@/app/auth";

export default async function Page() {
  const session = await auth();
  const userId: string = session?.user?.id;
  const orders = await getOrders(userId);
  return <Orders order={orders} />;
}
