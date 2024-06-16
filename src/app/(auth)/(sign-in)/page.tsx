"use client";

import { Icons } from "@/components/Icons";
import { FcGoogle } from "react-icons/fc";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema, LoginSchemaType } from "@/app/schema/schema";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { requestLogin } from "@/lib/action";
import { toast } from "sonner";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { useRef } from "react";
import { reDirectToHome } from "@/app/action/action";

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  const LoginButtonRef = useRef<HTMLButtonElement>(null);
  const { isAuthenticated } = useKindeBrowserClient();

  if (isAuthenticated) {
    reDirectToHome();
  }

  //useForm<FormInput type>
  // The generic type TAuthCredentialsValidator is used to type the form data,
  //ensuring type safety.

  // register : This method allows you to register an input or select element and apply validation rules to React Hook Form.
  // handleSubmit : this function will receive the form data if form validation is successful
  // formSate.errors : This object contains all the validation errors.
  // formState.isSubmitting : This boolean value indicates whether the form is currently being submitted.
  // formState.isSubmitSuccessful : This boolean value indicates whether the form has been submitted Successfully.s
  // formState.getValues : This method returns the current values of the form inputs.

  const onSubmit = () => {
    // await requestLogin({ email, password }).then((data) => {
    //   data?.error
    //     ? toast.error(data.error)
    //     : toast.success(`Welcome back ${email} 😊`);
    //   //throw an Error
    // });
    // //server action
    LoginButtonRef.current?.click();
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Sign in to your account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-up"
            >
              Don&apos;t have an account?
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <div className="grid gap-2">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2 py-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.email,
                    })}
                    placeholder="you@example.com"
                  />
                  {errors?.email && (
                    <p className="text-sm text-red-500">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </form>

              <LoginLink
                authUrlParams={{
                  connection_id:
                    process.env
                      .NEXT_PUBLIC_KINDE_CONNECTION_EMAIL_PASSWORDLESS || "",
                  login_hint: getValues("email"),
                }}
                postLoginRedirectURL="/"
              >
                <Button
                  className="disabled:bg-blue-400 w-full"
                  ref={LoginButtonRef}
                >
                  Sign in with Email
                </Button>
              </LoginLink>
            </div>

            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute inset-0 flex items-center"
              >
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">or</span>
              </div>
            </div>

            <LoginLink
              authUrlParams={{
                connection_id:
                  process.env.NEXT_PUBLIC_KINDE_CONNECTION_GOOGLE || "",
              }}
              postLoginRedirectURL="/"
            >
              <Button variant="secondary" className="w-full flex gap-2">
                <FcGoogle className="size-5" />
                Sign in with Google
              </Button>
            </LoginLink>
          </div>
        </div>
      </div>
    </>
  );
}
