import InputGroup from "@/app/_components/inputGroup";
import Button from "@/app/_components/button";
import Google from "@/app/_components/google";
import { Metadata } from "next";

export default function Page() {
  return (
    <div className="flex-col  mx-auto justify-center items-center  h-screen m-14 w-[50vh]">
      <div className={"p-6 border rounded-md"}>
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
        <center>
          {" "}
          <Button name={"Login"} type={"submit"} />
        </center>
        <center className={"mt-4"}>OR</center>
      </div>
      <Google />
    </div>
  );
}
export const metadata: Metadata = {
  title: "Login",
};
