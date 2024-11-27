import Google from "@/components/google";
import { authenticate } from "@/lib/action";
import LoginForm from "@/components/login-form";
import { Metadata } from "next";

export default function Page() {
  return (
    <>
      <div className="flex-col  mx-auto justify-center items-center  h-screen m-14 w-[55vh]">
        <LoginForm />
        <Google />
      </div>
    </>
  );
}
export const metadata: Metadata = {
  title: "Login",
};
