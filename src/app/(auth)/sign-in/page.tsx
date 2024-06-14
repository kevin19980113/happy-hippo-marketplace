"use client";

import { Icons } from "@/components/Icons";
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

export default function SignInPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<LoginSchemaType>({
    resolver: zodResolver(LoginSchema),
  });
  //useForm<FormInput type>
  // The generic type TAuthCredentialsValidator is used to type the form data,
  //ensuring type safety.

  // register : This method allows you to register an input or select element and apply validation rules to React Hook Form.
  // handleSubmit : this function will receive the form data if form validation is successful
  // formSate.errors : This object contains all the validation errors.
  // formState.isSubmitting : This boolean value indicates whether the form is currently being submitted.
  // formState.isSubmitSuccessful : This boolean value indicates whether the form has been submitted Successfully.s
  // formState.getValues : This method returns the current values of the form inputs.

  const onSubmit = async () => {
    const { email, password } = getValues();

    await requestLogin({ email, password }).then((data) => {
      data?.error
        ? toast.error(data.error)
        : toast.success(`Welcome back ${email} 😊`);
      //throw an Error
    });
    //server action
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
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
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

                <div className="grid gap-2 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("password")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.password,
                    })}
                    placeholder="Password"
                  />
                  {errors?.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                <Button
                  disabled={isSubmitting}
                  className="disabled:bg-blue-400"
                >
                  Sign in
                </Button>
              </div>
            </form>

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

            <Button variant="secondary" type="button">
              Continue as seller
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
