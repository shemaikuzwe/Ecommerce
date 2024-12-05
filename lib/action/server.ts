import "server-only";
import { db } from "@/lib/db";
import { ChartData, Order } from "@/lib/types/types";
import { User } from "@prisma/client";
import { auth } from "@/app/auth";

export async function getProducts() {
  return db.product.findMany();
}

export async function getProduct(id: string) {
  return db.product.findFirst({
    where: {
      id: id,
    },
  });
}

export async function getOrders() {
  const orders = await db.order.findMany({
    include: {
      user: true,
    },
  });
  return orders as Array<Order & { user: User }>;
}

export async function getAllProducts() {
  return db.product.findMany();
}

export async function getAllUsers() {
  return await db.user.findMany({
    include: { orders: true },
    orderBy: {
      orders: {
        _count: "desc",
      },
    },
  });
}

export async function getOrderById(id: string | undefined) {
  return await db.order.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      date: "desc",
    },
  });
}

export async function getUserOrders() {
  try {
    const session = await auth();
    const userId = session?.user?.id as string;
    return await db.order.count({
      where: {
        userId,
      },
    });
  } catch (err) {
    throw err;
  }
}

export async function getUser(email: string, password: string) {
  const user = await db.user.findFirst({
    where: {
      AND: [
        {
          email: email,
        },
        {
          password: password,
        },
      ],
    },
  });
  if (!user) return null;
  return user;
}

export async function getPendingOrders() {
  return await db.order.findMany({
    where: {
      status: "PENDING",
    },
    include: {
      user: true,
    },
  });
}

export async function getChartData() {
  try {
    const dashboardData = (await db.order.findMany()) as Order[];
    const productOrdersMap = new Map<string, Set<string>>();
    dashboardData.forEach((order) => {
      const productsInThisOrder = new Set<string>();

      order?.products?.forEach((product) => {
        if (!productsInThisOrder.has(product.name)) {
          const existingSet = productOrdersMap.get(product.name) || new Set();
          existingSet.add(order.id);
          productOrdersMap.set(product.name, existingSet);
          productsInThisOrder.add(product.name);
        }
      });
    });
    const chartData: ChartData[] = Array.from(productOrdersMap).map(
      ([product, orderSet]) => ({
        product,
        orders: orderSet.size,
      })
    );

    return chartData;
  } catch (err) {
    console.log(err);
    throw err;
  }
}
