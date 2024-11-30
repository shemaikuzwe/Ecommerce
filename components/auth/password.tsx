"use client";
import { useFormStatus } from "react-dom";
import InputGroup from "./inputGroup";
import { createPassword } from "@/lib/action";
import { useActionState } from "react";
import { useSession } from "next-auth/react";

export default function Password() {
  const session = useSession();
  const uId = session?.data?.user?.id;

  const [state, dispatch] = useActionState(createPassword, undefined);
  return (
    <div className={"p-6 border rounded-md"}>
      <form action={dispatch}>
        <input type="hidden" name="id" value={uId} />
        <h2 className={"text-2xl mb-4 font-medium"}>Create Passowrd</h2>
        <InputGroup
          type={"text"}
          label={"password"}
          placeholder={"Enter password"}
        />

        <InputGroup
          type={"text"}
          label={"cpassword"}
          placeholder={"Confirm password"}
        />
        {state && <label className=" text-red-500"> {state}</label>}
        <center>
          <LoginButton />
        </center>
      </form>
    </div>
  );
}
function LoginButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="flex mt-5 gap-2 px-5  bg-indigo-600 disabled:bg-indigo-400
     disabled:cursor-pointer max-w-[20vh] py-2 text-white rounded-md"
    >
      Next
    </button>
  );
}
