import Image from "next/image";
import { Product } from "@/lib/definition";
import { Remove } from "@/components/button";
import ButtonLink from "@/components/Link";

export default function ProductsTable({ products }: { products: Product[] }) {
  return (
    <div>
      <table className="border w-[100vh] text-center">
        <thead className="bg-black text-white">
          <tr className="p-1">
            <th className="p-1 border">ID</th>
            <th className="p-1 border items-center">Image</th>
            <th className="p-1 border">Product</th>
            <th className="p-1 border">Descrption</th>
            <th className="p-1 border">Type</th>
            <th className="p-1 border">Price</th>
            <th className={"p-1 border"}>Edit</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {products.length == 0
            ? "No products available"
            : products.map((product: Product) => {
                return (
                  <tr key={product.id} className="border">
                    <td className="border">{product.id}</td>
                    <td className="border">
                      <Image
                        src={`/${product.image}`}
                        alt={"product"}
                        width="70"
                        height="70"
                      />
                    </td>
                    <td className="border">{product.name}</td>
                    <td className="border">{product.description}</td>
                    <td className="border">{product.type}</td>
                    <td className="border">{product.price} Rwf</td>
                    <td className="border p-2">
                      <ButtonLink
                        to={`/admin/products/edit/${product.id}`}
                        name={"Edit"}
                      />
                    </td>
                    <td className={"border p-2"}>
                      <Remove id={product.id} />
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
