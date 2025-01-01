import { notFound } from "next/navigation";
import EditForm from "@/components/admin/edit-form";
import { getProduct } from "@/lib/action/server";
import { Suspense } from "react";
export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id;
  const product = await getProduct(id!);

  if (!product) {
    notFound();
  }
  return (
    <Suspense fallback={<h2>Loading</h2>}>
      <EditForm product={product} />
    </Suspense>
  );
}
