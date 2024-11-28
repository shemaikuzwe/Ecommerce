"use server";
import { PrismaClient } from "@prisma/client";
import { LoginError } from "@/lib/definition";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/app/auth";
import { CredentialsSignin } from "next-auth";
import { unstable_noStore as no_store } from "next/cache";
import { OrderState } from "./definition";
import { editProductSchema, productSchema } from "./schema";
import { db } from "./db";
const AddProduct = productSchema.omit({ id: true });
export async function addProduct(prevState: State, formData: FormData) {
  const validate = AddProduct.safeParse({
    product: formData.get("product"),
    price: formData.get("price"),
    description: formData.get("description"),
    type: formData.get("type"),
    image: formData.get("image"),
  });
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Missing fields",
    };
  }

  const { product, price, description, type, image } = validate.data;
  // TODO: Use stroge bucket
  await db.product.create({
    data: {
      name: product,
      price: price,
      description: description,
      type: type,
      image: "",
    },
  });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function getProducts(query?: string) {
  no_store();
  let products = await db.product.findMany();
  if (query == "All") {
    products = await db.product.findMany({
      take: 4,
    });
  } else {
    products = await db.product.findMany({
      take: 4,
      where: {
        type: query,
      },
      orderBy: {
        id: "desc",
      },
    });
  }

  return products;
}
export async function productsCount() {
  no_store();
  const noOfProducts = await db.product.count();
  return noOfProducts;
}
export async function customerCount() {
  no_store();
  const noOfCustomers = await db.user.count();
  return noOfCustomers;
}
export async function deleteProduct(id: string) {
  await db.product.delete({
    where: {
      id: id,
    },
  });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function getProduct(id: string) {
  const product = await db.product.findMany({
    where: {
      id: id,
    },
  });
  if (product) return product;
}


export async function editProduct(formData: FormData, id: string) {
  const validate = editProductSchema.safeParse({
    product: formData.get("product"),
    price: formData.get("price"),
    description: formData.get("description"),
    type: formData.get("type"),
  });
  if (!validate.success) {
    return {
      errors: validate.error.flatten().fieldErrors,
      message: "empty fields",
    };
  }
  const { product, description, price, type } = validate.data;
  await db.product.update({
    where: {
      id: id,
    },

    data: {
      name: product,
      description: description,
      price: price,
      type: type,
    },
  });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function paginate() {
  no_store();
  const no_of_pages = await db.product.count();
  return no_of_pages;
}

export async function getSearchProduct(search: string) {
  no_store();
  const product = await db.product.findMany({
    where: {
      OR: [
        {
          type: {
            contains: search,
          },
        },
        {
          name: {
            contains: search,
          },
        },
        {
          description: {
            contains: search,
          },
        },
      ],
    },
  });
  return product;
}
export async function getAllProducts(skip: number = 0) {
  no_store();

  let products = await db.product.findMany();

  return products;
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

type State = {
  errors?: {
    email: string[];
    password: string[];
  };
  message?: string | null;
};

export async function authenticate(
  prevState: LoginError | undefined,
  formData: FormData
): Promise<LoginError | undefined> {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return { message: "Invalid credentials" };
    }
    throw error;
  }
}
export async function getAllUsers() {
  no_store();
  const users = await db.user.findMany();
  return users;
}

export async function addOrder(
  prevState: OrderState | undefined,
  formData: FormData
) {
  try {
    const cart = formData.get("cart") as string;
    const totalPrice = formData.get("totalPrice") as string;
    const userId = formData.get("userId") as string;

    await db.order.create({
      data: {
        userId: userId,
        products: JSON.parse(cart),
        total_price: parseInt(totalPrice),
      },
    });

    return { status: "success", message: "Order created successfully" };
  } catch (e) {
    return { status: "error", message: "Something went wrong try again" };
  }
}
export async function getOrders(id: string | undefined) {
  const orders = await db.order.findMany({
    where: {
      userId: id,
    },
    orderBy: {
      date: "desc",
    },
  });
  return orders;
}

export async function createPassword(prevState:string|undefined, formData: FormData) {
  const password = formData.get("password") as string;
  const cpassword = formData.get("cpassword") as string;
  const id = formData.get("id") as string;
  if (cpassword === password) {
    await db.user.update({
      where: {
        id: id,
      },
      data: {
        password: password,
      },
    });
    revalidatePath("/");
    redirect("/");
  }
  return "Password mis match";
}
export async function changePassword(
  prevState: { type: null; message: null },
  formData: FormData
) {
  const password = formData.get("password") as string;
  const newPassword = formData.get("newPassword") as string;
  const cpassword = formData.get("cpassword") as string;
  const userId = formData.get("userId") as string;
  console.log(password, newPassword, cpassword, userId);

  if (newPassword == cpassword) {
    if (await find_password(userId, password)) {
      try {
        await db.user.update({
          where: {
            id: userId,
          },
          data: {
            password: newPassword,
          },
        });
        {
          return { type: "success", message: "password changed" };
        }
      } catch (e) {
        return {
          type: "error",
          message: "password not changed",
        };
      }
    }
    return {
      type: "error",
      message: "invalid current password",
    };
  }
  return {
    type: "error",
    message: "invalid current password",
  };
}
const find_password = async (id: string, pass: string) => {
  const psw = await db.user.findFirst({
    where: {
      AND: [
        {
          id: id,
        },
        {
          password: pass,
        },
      ],
    },
  });
  if (psw) {
    return true;
  }
  return false;
};
