"use client";
import InputGroup from "@/components/inputGroup";
import Button from "@/components/button";
import { addProduct } from "@/lib/action";
import { useFormState } from "react-dom";

export default function Page() {
  const initialState = { errors: {}, message: null };
  const [state, dispatch] = useFormState(addProduct, initialState);
  return (
    <div className="flex justify-center items-center  p-6 border rounded-md ml-10 mt-10">
      <form action={dispatch}>
        <h2 className="font-medium text-xl text-black">Add Product</h2>

        <InputGroup
          type={"text"}
          placeholder={"Enter product name"}
          label={"product"}
          aria={"product-error"}
        />
        <div id={"product-error"} aria-atomic={"true"} aria-live={"polite"}>
          {state?.errors?.product &&
            state.errors.product.map((error) => (
              <p key={error} className="mt-2 text-red-500 text-sm">
                {error}
              </p>
            ))}
        </div>
        <InputGroup
          type={"text"}
          label={"description"}
          placeholder={"Enter product description"}
          aria={"description"}
        />
        <div id={"description-error"} aria-atomic={"true"} aria-live={"polite"}>
          {state?.errors?.description &&
            state.errors.description.map((error) => (
              <p key={error} className="mt-2 text-red-500 text-sm">
                {error}
              </p>
            ))}
        </div>
        <InputGroup
          type={"number"}
          placeholder={"Enter product price"}
          label={"price"}
          aria={"price-error"}
        />

        <div id={"price-error"} aria-atomic={"true"} aria-live={"polite"}>
          {state?.errors?.price &&
            state.errors.price.map((error) => (
              <p key={error} className="mt-2 text-red-500 text-sm">
                {error}
              </p>
            ))}
        </div>
        <InputGroup
          type={"text"}
          label={"type"}
          placeholder={"Enter product type"}
          aria={"type-error"}
        />
        <div id={"type-error"} aria-atomic={"true"} aria-live={"polite"}>
          {state?.errors?.type &&
            state.errors.type.map((error) => (
              <p key={error} className="mt-2 text-red-500 text-sm">
                {error}
              </p>
            ))}
        </div>
        <InputGroup type={"file"} label={"image"} aria={"image-error"} />
        <div id="image-error" aria-atomic="true" aria-live="polite">
          {state?.errors?.image &&
            state.errors.image.map((error) => (
              <p key={error} className="mt-2 text-red-500 text-sm">
                {error}
              </p>
            ))}
        </div>
        <Button name={"Add"} type={"submit"} />
      </form>
    </div>
  );
}
