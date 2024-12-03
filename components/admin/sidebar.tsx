"use client"

import { LayoutDashboard, ShoppingCart, Package, Users } from 'lucide-react'
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
import User from '../user/admin-avatar'
import Image from 'next/image'
export function DashSidebar() {
  return (
    <Sidebar variant={"sidebar"} className="bg-card border-none ">
      <SidebarHeader className="p-2 border-b-border">
        <div className="flex items-center gap-2">
          <Image src={"/logo.png"} alt='logo' height={90} width={90}/>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-10  ">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link href="/admin">
                <LayoutDashboard className="w-6 h-6" />
                <span className=' text-base'>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild >
              <Link href="/admin/products">
                <Package className="w-6 h-6" />
                <span  className=' text-base'>Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild >
              <Link href="/admin/orders">
                <ShoppingCart className="w-6 h-6" />
                <span  className=' text-base'>Orders</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild >
              <Link href="/admin/users">
                <Users className="w-6 h-6" />
                <span  className=' text-base'>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="py-2 w-full border-t-border  mt-auto border-none">
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

