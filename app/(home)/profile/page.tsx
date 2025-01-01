import Profile from '@/components/user/profile'
import { Metadata } from 'next';
import {getUserOrders} from "@/lib/action/server";
import {Suspense} from "react";
import ProfileSkeleton from '@/components/skeltons/profile-skelton';

export default async function ProfilePage() {
  const orders = getUserOrders()
  return <Suspense fallback={<ProfileSkeleton/>}>
    <Profile orders={orders} />
  </Suspense>
}
export const metadata: Metadata = {
  title: "Profile",
};
