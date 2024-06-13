"use client";
import { useFormStatus } from "react-dom";
import InputGroup from "./inputGroup";
import { authenticate } from "../_lib/action";
import { useFormState } from "react-dom";
import { LoginError } from "../_lib/definition";
export default function LoginForm() {
  const initial:LoginError={message:""}
  const [state, dispatch] = useFormState(authenticate, initial);
  return (
    <div className={"p-6 border rounded-md"}>
      <form action={dispatch}>
        <h2 className={"text-2xl mb-4 font-medium"}>Enter Your credentials</h2>
        <InputGroup
          type={"text"}
          label={"email"}
          placeholder={"Enter your email"}
        />

        <InputGroup
          type={"password"}
          label={"password"}
          placeholder={"Enter your password"}
        />
        {state && <label className=" text-red-500"> {state.message}</label>}
        <center>
          <LoginButton />
        </center>

        <center className={"mt-4"}>OR</center>
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
      Login
    </button>
  );
}
