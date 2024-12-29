'use client'
import { Order, Status } from "@prisma/client"
import { useEffect, useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card } from "@/components/ui/card"
import OrdersCard from "@/components/order/ordersCard"
import { Package } from 'lucide-react'
import { OrderUser } from "@/lib/action/server"

export default function Orders({ order }: { order: OrderUser }) {
  const [items, setItems] = useState<Status>(Status.PENDING)
  const [orders, setOrders] = useState(order)

  const handleStatusChange = (status: Status) => {
    setItems(status)
  }

  useEffect(() => {
    let filtered = order
    if (items !== Status.PENDING) {
      filtered = order.filter((order) => order.status === items)
    }
    setOrders(filtered)
  }, [items, order])

  return (
    <div className="container mx-auto px-4 py-6 max-w-4xl">
      <Card className="p-6 rounded-md">
        <Tabs
          defaultValue={Status.PENDING}
          className="w-full"
          onValueChange={(value) => handleStatusChange(value as Status)}
        >
          <TabsList className="grid w-full grid-cols-3 max-w-xl mx-auto mb-6">
            {[Status.COMPLETED, Status.PENDING, Status.FAILED].map((status) => (
              <TabsTrigger key={status} value={status} className="capitalize">
                {status.toLowerCase()}
              </TabsTrigger>
            ))}
          </TabsList>

          {[Status.COMPLETED,Status.PENDING,  Status.FAILED].map((status) => (
            <TabsContent key={status} value={status}>
              {orders.length === 0 ? (
                <div className="text-center py-12">
                  <Package className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <h3 className="mt-4 text-lg font-semibold">No {status.toLowerCase()} orders</h3>
                  <p className="text-muted-foreground mt-2">
                    When orders are {status.toLowerCase()}, they will appear here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4">
                  {orders.map((order: Order) => (
                    //@ts-ignore
                    <OrdersCard key={order.id} order={order} />
                  ))}
                </div>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </Card>
    </div>
  )
}

