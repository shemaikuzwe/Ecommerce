import { getProduct } from "@/lib/action";
import { notFound } from "next/navigation";
import EditForm from "@/components/admin/edit-form";
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product = await getProduct(id!);

  if (!product) {
    notFound();
  }
  return <EditForm product={product} />;
}
