import { z } from "zod";
const fileSchema = z.instanceof(File, { message: "please upload image" });
const productSchema = z.object({
  id: z.string(),
  product: z.string().min(1, { message: "Enter product name" }),
  description: z.string().min(1, { message: "Enter product description" }),
  type: z.string().min(1, { message: "Enter product type" }),
  price: z.coerce.number().gt(0, "Enter product price"),
  image: fileSchema.refine((file) => file.size > 0, "Upload image"),
});
const editProductSchema = productSchema.omit({ id: true, image: true });

const changePasswordShema = z
  .object({
    currentPassword: z
      .string()
      .min(3, { message: "This Passsword is not strong" }),
    newPassword: z.string().min(3, { message: "This password is not strong" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword !== data.currentPassword, {
    message: "Password mismatch",
    path: ["confirmPassword"],
  });

const UpdateUserProfileSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  fullName: z.string().min(5, { message: "Enter your full names" }),
});
export { productSchema, editProductSchema, changePasswordShema,UpdateUserProfileSchema };
