export default function Demo() {
  // Dummy order data
  const order = {
    id: "1",
    userId: "user1",
    products: [
      {
        name: "Cactus",
        quantity: 2,
        price: 20000
      },
      {
        name: "Yeezy",
        quantity: 2,
        price: 20000
      }
    ],
    total_price: 80000,
    date: new Date("2024-11-28"),
    status: false
  }

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <OrderCard order={order} />
    </div>
  )
}

