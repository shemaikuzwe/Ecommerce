"use server";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";
import { State } from "@/app/_lib/definition";
import fs from "fs/promises";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
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
  const noOfProducts = await db.product.count();
  return noOfProducts;
}
export async function customerCount() {
  const noOfCustomers = await db.user.count();
  return noOfCustomers;
}
export async function deleteProduct(id: number) {
  const productId = parseInt(id);
  await db.product.delete({
    where: {
      id: productId,
    },
  });
  revalidatePath("/admin/products");
  redirect("/admin/products");
}

export async function getProduct(id: number) {
  const prodId = parseInt(id);
  const product = await db.product.findMany({
    where: {
      id: prodId,
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
// export async function getOptions() {
//   const options: [] = await db.$queryRaw`SELECT DISTINCT type FROM product`;
//   return options;
// }
// export async function getProductByType(type: string) {
//   const products = await db.product.findMany({
//     where: {
//       type: type,
//     },
//   });
//   if (products) return products;
// }

export async function paginate() {
  const no_of_pages = await db.product.count();
  return no_of_pages;
}

export async function getSearchProduct(search: string) {
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
  const take = 4;
  let products = await db.product.findMany({
    skip: skip,
    take: take,
  });

  return products;
}
