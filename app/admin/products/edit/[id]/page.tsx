import InputGroup from "@/components/inputGroup";
import Button from "@/components/button";
import { editProduct, getProduct } from "@/lib/action";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  const id = params.id ;
  const data = await getProduct(id!);
  const product = data[0];

  return (
    <div className="flex justify-center items-center  p-6 border rounded-md ml-10 mt-10">
      <form
        action={async (formData: FormData) => {
          "use server";
          await editProduct(formData, id);
        }}
      >
        <h2 className={"font-medium text-xl text-black"}>Edit Product</h2>
        <InputGroup type={"text"} label={"product"} Inputvalue={product.name} />
        <InputGroup
          type={"text"}
          label={"description"}
          Inputvalue={product.description}
        />
        <InputGroup
          type={"number"}
          label={"price"}
          Inputvalue={product.price}
        />
        <InputGroup type={"text"} label={"type"} Inputvalue={product.type} />
        {/*<InputGroup type={"file"} label={"image"} />*/}
        <Button name={"Edit"} type={"submit"} />
      </form>
    </div>
  );
}
