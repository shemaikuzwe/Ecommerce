import { DocumentTextIcon } from "@heroicons/react/24/solid";
import {
  XMarkIcon,
  MinusIcon,
  PlusIcon,
  BookmarkIcon,
} from "@heroicons/react/16/solid";
import Cart from "@/app/_components/cart";
import Button from "@/app/_components/button";

export default function Page() {
  return (
    <div className="flex flex-col p-14 w-6/12 mx-auto border border-gray-300 rounded-md gap-2">
      {/*<div className={"mx-auto"}>*/}
      {/*  <DocumentTextIcon width={"70"} height={"70"} className={"mx-auto"} />*/}
      {/*  <span className={"text-lg font-medium mx-auto"}>*/}
      {/*    No items available*/}
      {/*  </span>*/}
      {/*</div>*/}
      <Cart />
      <Cart />
      <Cart />
      <div className={"flex justify-between mt-4"}>
        <span className={"text-lg font-medium mt-4"}>Total price:2000rwf</span>
        <Button
          name={"Order"}
          type={"submit"}
          icon={<BookmarkIcon width={"20"} height={"20"} />}
        />
      </div>
    </div>
  );
}
