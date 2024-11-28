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

export { productSchema, editProductSchema };
