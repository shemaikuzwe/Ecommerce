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
import User from './user'

export function DashSidebar() {
  return (
    <Sidebar className="bg-primary border-none">
      <SidebarHeader className="p-4 border-none">
        <div className="flex items-center gap-2">
          <div className="bg-white/10 p-2 rounded-lg">
            <ShoppingCart className="w-5 h-5" />
          </div>
          <span className="font-semibold text-lg">Ecommerce</span>
        </div>
      </SidebarHeader>
      <SidebarContent className="px-2 pt-10">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-white/10 data-[active=true]:bg-white/10">
              <Link href="/admin">
                <LayoutDashboard className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-white/10 data-[active=true]:bg-white/10">
              <Link href="/admin/products">
                <Package className="w-4 h-4" />
                <span>Products</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-white/10 data-[active=true]:bg-white/10">
              <Link href="/admin/orders">
                <ShoppingCart className="w-4 h-4" />
                <span>Orders</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-white/10 data-[active=true]:bg-white/10">
              <Link href="/admin/users">
                <Users className="w-4 h-4" />
                <span>Users</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4 mt-auto border-none">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="hover:bg-white/10">
                <User/>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}

