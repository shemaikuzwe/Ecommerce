import Google from "@/components/auth/google";
import LoginForm from "@/components/auth/login-form";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Login",
  description: "Login Form Ecommerce App",
};
export default function Page() {
  return (
    <div className="flex-col w-full max-w-sm  mx-auto mt-5 justify-center items-center  h-screen  ">
      <LoginForm />
      <Google />
    </div>
  );
}
