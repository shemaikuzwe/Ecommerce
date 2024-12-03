import Profile from '@/components/user/profile'
import { Metadata } from 'next';
import {getUserOrders} from "@/lib/action/server";

export default async function ProfilePage() {
  const orders = getUserOrders()
  return <Profile orders={orders} />
}
export const metadata: Metadata = {
  title: "Profile",
};
