import { signIn } from "@/app/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login",
  description: "Urban deals shop ",
};
export default function LoginForm() {
  return (
    <div className="flex min-h-screen justify-center  bg-slate-50 p-4">
      <Card className="w-full max-w-md h-72 sm:mt-20 mt-14 ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 justify-center items-center">
            <form
              action={async () => {
                "use server";
                await signIn("github");
              }}
              className="flex justify-center items-center"
            >
              <Button
                type="submit"
                variant="outline"
                className="hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <Github className="mr-2 h-4 w-4" />
                Continue with GitHub
              </Button>
            </form>
            <form
              action={async () => {
                "use server";
                await signIn("google");
              }}
              className="flex justify-center items-center"
            >
              <Button
                variant="outline"
                className="hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <svg
                  className="mr-2 h-4 w-4"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continue with Google
              </Button>
            </form>
          </div>
          {/* <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div> */}
          {/* <div className="grid gap-2">
            <Button variant="secondary">
              <Mail className="mr-2 h-4 w-4" />
              Sign up with Email
            </Button>
          </div> */}
        </CardContent>
      </Card>
    </div>
  );
}
