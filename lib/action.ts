"use server";
import {
  ChangePasswordState,
  LoginError,
  ProductState,
  updateProfileState,
} from "@/lib/definition";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/app/auth";
import { CredentialsSignin } from "next-auth";
import { OrderState } from "./definition";
import {
  changePasswordShema,
  fileSchema,
  productSchema,
  UpdateUserProfileSchema,
} from "./schema";
import { db } from "./db";
import createAdminClient from "./appwrite/appwrite.config";
import { appWrite } from "./appwrite/config";
import { createFileUrl, getFileId } from "./utils";
import { ID } from "node-appwrite";
import { z } from "zod";

const AddProduct = productSchema.omit({ id: true });

export async function addProduct(
  prevState: ProductState | undefined,
  formData: FormData
): Promise<ProductState | undefined> {
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
      status: "error",
    };
  }

  const { product, price, description, type, image } = validate.data;
  const imagePath = await uploadProduct(image);
  try {
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
  } catch (err) {
    throw err;
  }
}

export async function getProducts() {
  const products = await db.product.findMany();
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
export async function deleteProduct(id: string) {
  try {
    const prod = await getProduct(id);
    await deleteProd(prod?.image as string);
    await db.product.delete({
      where: {
        id: id,
      },
    });
    revalidatePath("/admin/products");
    redirect("/admin/products");
  } catch (err) {
    throw err;
  }
}

export async function getProduct(id: string) {
  const product = await db.product.findFirst({
    where: {
      id: id,
    },
  });
  if (product) return product;
}

export async function editProduct(
  prevState: ProductState | undefined,
  formData: FormData
): Promise<ProductState | undefined> {
  const validate = productSchema
    .omit({
      image: true,
    })
    .extend({
      id: z.string(),
      image: fileSchema.optional(),
    })
    .safeParse(Object.fromEntries(formData.entries()));
  if (!validate.success) {
    console.log(validate.error.errors);

    return {
      errors: validate.error.flatten().fieldErrors,
      message: "Please fill in all fields",
      status: "error",
    };
  }
  const { product, description, price, type, id, image } = validate.data;
  const prod = await getProduct(id);

  let imagePath = prod?.image;
  if (image && image.size) {
    console.log("uploading image");
    
    imagePath = await uploadProduct(image);
  }
  await deleteProd(prod?.image!);

  try {
    await db.product.update({
      where: {
        id: id,
      },

      data: {
        name: product,
        description: description,
        price: price,
        type: type,
        image: imagePath,
      },
    });

    revalidatePath("/admin/products");
    redirect("/admin/products");
  } catch (err) {
    throw err;
  }
}
async function uploadProduct(image: File) {
  try {
    const { storage } = await createAdminClient();
    const product = await storage.createFile(
      appWrite.BUCKET_ID,
      ID.unique(),
      image
    );
    return createFileUrl(product.$id);
  } catch (err) {
    console.log(err);
    throw err;
  }
}
async function deleteProd(imagePath: string) {
  try {
    const fileId = getFileId(imagePath);
    console.log(fileId);

    const { storage } = await createAdminClient();
    await storage.deleteFile(appWrite.BUCKET_ID, fileId);
  } catch (err) {
    if (err instanceof Error) {
      console.log(err.message);
    }
  }
}

export async function getAllOrders() {
  try {
    const orders = await db.product.findMany();
    return orders;
  } catch (err) {
    throw err;
  }
}
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
export async function getAllProducts() {
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
  const users = await db.user.findMany();
  return users;
}

export async function addOrder(
  prevState: OrderState | undefined,
  formData: FormData
): Promise<OrderState | undefined> {
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

export async function createPassword(
  prevState: string | undefined,
  formData: FormData
) {
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
export async function getUserOrders() {
  try {
    const session = await auth();
    const userId = session?.user?.id as string;
    const userOrders = await db.order.count({
      where: {
        userId,
      },
    });

    return userOrders;
  } catch (err) {
    throw err;
  }
}

export async function changePassword(
  prevState: ChangePasswordState | undefined,
  formData: FormData
): Promise<ChangePasswordState | undefined> {
  const session = await auth();
  const userId = session?.user?.id as string;
  const validate = changePasswordShema.safeParse({
    currentPassword: formData.get("currentPassword"),
    newPassword: formData.get("newPassword"),
    confirmPassword: formData.get("confirmPassword"),
  });
  if (!validate.success) {
    return {
      status: "error",
      message: "Please fill in all fields",
      errors: validate.error.flatten().fieldErrors,
    };
  }
  const {
    newPassword,
    confirmPassword: cpassword,
    currentPassword: password,
  } = validate.data;
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
          return { status: "success", message: "password changed" };
        }
      } catch (e) {
        return {
          status: "error",
          message: "password not changed",
        };
      }
    }
    return {
      status: "error",
      message: "invalid current password",
    };
  }
  return {
    status: "error",
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

export async function updateProfile(
  prevState: updateProfileState | undefined,
  formData: FormData
): Promise<updateProfileState | undefined> {
  const session = await auth();
  const userId = session?.user?.id as string;
  const validate = UpdateUserProfileSchema.safeParse({
    email: formData.get("email"),
    fullName: formData.get("fullName"),
  });
  if (!validate.success) {
    return {
      status: "error",
      message: "Please fill in all fields",
      errors: validate.error.flatten().fieldErrors,
    };
  }
  const { email, fullName } = validate.data;

  try {
    await db.user.update({
      where: {
        id: userId,
      },
      data: {
        email,
        name: fullName,
      },
    });
    return {
      status: "success",
      message: "Profile updated",
    };
  } catch (err) {
    return {
      status: "error",
      message: "Something went wrong",
    };
  }
}
