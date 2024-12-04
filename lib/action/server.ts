import "server-only";
import { db } from "@/lib/db";
import { Order } from "@/lib/types/types";
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
