"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Clock, XCircle } from 'lucide-react'

interface Order {
  id: string
  customer: string
  date: string
  total: number
  status: "completed" | "pending" | "failed"
}

const orders: Order[] = [
  { id: "ORD001", customer: "John Doe", date: "2023-11-28", total: 150.00, status: "completed" },
  { id: "ORD002", customer: "Jane Smith", date: "2023-11-29", total: 200.50, status: "pending" },
  { id: "ORD003", customer: "Bob Johnson", date: "2023-11-30", total: 75.25, status: "failed" },
  { id: "ORD004", customer: "Alice Brown", date: "2023-12-01", total: 300.00, status: "completed" },
  { id: "ORD005", customer: "Charlie Davis", date: "2023-12-02", total: 180.75, status: "pending" },
]

export function OrderManagement() {
  const [activeTab, setActiveTab] = useState("completed")

  const filteredOrders = orders.filter(order => order.status === activeTab)

  const getStatusBadge = (status: Order["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Completed</Badge>
      case "pending":
        return <Badge variant="secondary"><Clock className="w-3 h-3 mr-1" /> Pending</Badge>
      case "failed":
        return <Badge variant="destructive"><XCircle className="w-3 h-3 mr-1" /> Failed</Badge>
    }
  }

  return (
    <div className="space-y-4">
      <Tabs value={activeTab} onValueChange={setActiveTab} >
        <TabsList className=" w-96">
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="failed">Failed</TabsTrigger>
        </TabsList>
        {["completed", "pending", "failed"].map((status) => (
          <TabsContent key={status} value={status} className="border rounded-lg p-4">
            <h2 className="text-2xl font-bold mb-4 capitalize">{status} Orders</h2>
            {filteredOrders.length === 0 ? (
              <p className="text-center text-muted-foreground">No {status} orders found.</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Order ID</TableHead>
                      <TableHead>Customer</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Total</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell className="font-medium">{order.id}</TableCell>
                        <TableCell>{order.customer}</TableCell>
                        <TableCell>{order.date}</TableCell>
                        <TableCell>${order.total.toFixed(2)}</TableCell>
                        <TableCell>{getStatusBadge(order.status)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

