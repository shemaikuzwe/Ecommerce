"use server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { State } from "@/app/_lib/definition";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "../auth";
import { CredentialsSignin } from "next-auth";
import { unstable_noStore as no_store } from "next/cache";
import { auth } from "../auth";

const db = new PrismaClient();
const fileSchema = z.instanceof(File, { message: "please upload image" });
const ProductSchema = z.object({
  id: z.number(),
  product: z.string().min(1, { message: "Enter product name" }),
  description: z.string().min(1, { message: "Enter product description" }),
  type: z.string().min(1, { message: "Enter product type" }),
  price: z.coerce.number().gt(0, "Enter product price"),
  image: fileSchema.refine((file) => file.size > 0, "Upload image"),
});
const AddProduct = ProductSchema.omit({ id: true });
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
  await fs.mkdir("public", { recursive: true });
  const { product, price, description, type, image } = validate.data;
  const filePath = `public/${crypto.randomUUID()}-${image.name}`;
  await fs.writeFile(filePath, Buffer.from(await image.arrayBuffer()));
  const imagePath = filePath.replace(/^public\//, "");
  await db.product.create({
    data: {
      name: product,
      price: price,
      description: description,
      type: type,
      image: imagePath,
    },
  });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function getProducts(query?: string | null) {
  no_store();
  let products = await db.product.findMany();
  if (query == "All") {
    products = await db.product.findMany({});
  } else {
    products = await db.product.findMany({
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

const EditProduct = ProductSchema.omit({ id: true, image: true });
export async function editProduct(formData: FormData, id: number) {
  const validate = EditProduct.safeParse({
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
  const prodId = parseInt(id);
  await db.product.update({
    where: {
      id: prodId,
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
export async function getOptions() {
  const options: any = await db.$queryRaw`SELECT DISTINCT type FROM product`;
  return options;
}
// export async function getProductByType(type: string) {
//   const products = await db.product.findMany({
//     where: {
//       type: type,
//     },
//   });
//   if (products) return products;
// }

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
  const take = 4;
  let products = await db.product.findMany({
    skip: skip,
    take: take,
  });

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
// const userSchema=z.object({
//   email:z.string().email({
//     message:"This field is required"
//   }),
//   password:z.string().max(6,{
//     message: "This field is required"
//   })
// })
export async function authenticate(prevState: State, formData: FormData) {
  try {
    await signIn("credentials", formData);
  } catch (error) {
    if (error instanceof CredentialsSignin) {
      return "Invalid credentials";
    } else {
      return "some thing went wrong";
    }
  }
}
export async function getAllUsers() {
  no_store();
  const users = await db.user.findMany();
  return users;
}
export async function addOrder(formData: FormData) {
  const cart = formData.get("cart");
  const totalPrice = formData.get("totalPrice");
  const userId =formData.get("userId")
  await db.order.create({
    data: {
      user_id: userId,
      products: JSON.parse(cart),
      total_price: parseInt(totalPrice),
    },
  });

  revalidatePath("/");
  redirect("/");
}
