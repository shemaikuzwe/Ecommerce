"use client";
import React from "react";
import InputGroup from "@/components/inputGroup";
import { LockClosedIcon } from "@heroicons/react/24/solid";
import { useFormStatus } from "react-dom";
import { useActionState } from "react";
import { changePassword } from "@/lib/action";
import { useSession } from "next-auth/react";
import { Alert } from "@mui/material";
import Link from "next/link";
const Page = () => {
  const initial = { type: null, message: null };
  const [state, dispatch] = useActionState(changePassword, initial);
  const session = useSession();
  const userId = session?.data?.user?.id;
 
  return (
    <div className="flex-col border   mx-auto justify-center items-center p-6 rounded-md m-14 w-[50vh]">
      <form action={dispatch}>
        {state?.type && (
          <Alert variant="filled" severity={state.type}>
            {state.message}
            {state?.type=="success"&& <Link href={"/profile"} className="ml-2 underline">return to profile</Link>}
          </Alert>
        )}
        <input type="hidden" name="userId" value={userId} />
        <h2 className={"text-2xl mb-4 font-medium"}>Change Passowrd</h2>
        <InputGroup
          type={"password"}
          label={"password"}
          placeholder={"Enter  current password"}
        />
        <InputGroup
          type={"password"}
          label={"newPassword"}
          placeholder={"Enter password"}
        />

        <InputGroup
          type={"password"}
          label={"cpassword"}
          placeholder={"Confirm password"}
        />

        <div className=" flex justify-center items-center">
          <Btn/>
        </div>
      </form>
    </div>
  );
};

export default Page;
function Btn() {
  const { pending } = useFormStatus();
  return (
    <button
      className="btn btn-primary flex  text-sm disabled:bg-indigo-400 disabled:cursor-not-allowed"
      type="submit"
      disabled={pending}
    >
      <LockClosedIcon width={25} height={25} />
      Change password
    </button>
  );
}
// export const metadata: Metadata = {
//   title: "Profile",
// };
