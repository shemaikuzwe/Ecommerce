import "server-only";
import { db } from "@/lib/db";
import { ChartData, Order } from "@/lib/types/types";
import { User } from "@prisma/client";
import { auth } from "@/app/auth";
import { unstable_cacheTag as cacheTag } from "next/cache";
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
  return orders;
}
export type OrderUser = Awaited<ReturnType<typeof getOrders>>;
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
    const dashboardData = await db.order.findMany();
    const productOrdersMap = new Map<string, Set<string>>();
    dashboardData.forEach((order) => {
      const productsInThisOrder = new Set<string>();

      order?.products?.forEach((product) => {
        //@ts-ignore
        if (product && product.name && !productsInThisOrder.has(product.name)) {
          //@ts-ignore
          const existingSet = productOrdersMap.get(product.name) || new Set();
          existingSet.add(order.id);
          //@ts-ignore
          productOrdersMap.set(product.name, existingSet);
          //@ts-ignore
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
