"use client"

import { LogOut, LayoutDashboard, ShoppingCart, Package, Users } from 'lucide-react'
import Link from "next/link"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import User from '../user/user'
import Image from 'next/image'
export function DashSidebar() {
  return (
    <Sidebar className="bg-primary border-none w-72">
      <SidebarHeader className="p-4 border-none">
        <div className="flex items-center gap-2">
          <Image src={"/logo.png"} alt='logo' height={90} width={90}/>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-10  text-white">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin">
                <LayoutDashboard className="w-6 h-6" />
                <span className=' text-lg font-semibold'>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild >
              <Link href="/admin/products">
                <Package className="w-6 h-6" />
                <span  className=' text-lg font-semibold'>Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild >
              <Link href="/admin/orders">
                <ShoppingCart className="w-6 h-6" />
                <span  className=' text-lg font-semibold'>Orders</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild >
              <Link href="/admin/users">
                <Users className="w-6 h-6" />
                <span  className=' text-lg font-semibold'>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 mt-auto border-none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild >
                <User/>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

