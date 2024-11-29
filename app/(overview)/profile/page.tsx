import UserProfile from '@/components/UserProfile'
import { getUserOrders } from '@/lib/action';
import { Metadata } from 'next';

export default async function ProfilePage() {
  const orders = getUserOrders()
  return <UserProfile orders={orders} />
}
export const metadata: Metadata = {
  title: "Profile",
};
