"use client";

import { Icons } from "@/components/Icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  CreateAccountSchema,
  CreateAccountSchemaType,
} from "@/app/schema/schema";
import { ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { requestCreateAccount } from "@/lib/action";
import { useRef } from "react";
import { RegisterLink } from "@kinde-oss/kinde-auth-nextjs";

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<CreateAccountSchemaType>({
    resolver: zodResolver(CreateAccountSchema),
  });
  const RegisterButtonRef = useRef<HTMLButtonElement>(null);
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
    // const { email, password, name } = getValues();
    // await requestCreateAccount({ email, password, name }).then((data) => {
    //   data?.error
    //     ? toast.error(data.error)
    //     : toast.success(`Created account ${email} successfully!`);
    //   //throw an Error
    // });
    //server action
    RegisterButtonRef.current?.click();
  };

  return (
    <>
      <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col items-center space-y-2 text-center">
            <Icons.logo className="h-20 w-20" />
            <h1 className="text-2xl font-semibold tracking-tight">
              Create an account
            </h1>

            <Link
              className={buttonVariants({
                variant: "link",
                className: "gap-1.5",
              })}
              href="/sign-in"
            >
              Already have an account? Sign-in
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-6">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-2">
                <div className="grid gap-2 py-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    {...register("firstName")}
                    className={cn({
                      "focus-visible:ring-red-500": errors.firstName,
                    })}
                    placeholder="First Name"
                  />
                  {errors?.firstName && (
                    <p className="text-sm text-red-500">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-2 py-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    {...register("lastName")}
                    type="password"
                    className={cn({
                      "focus-visible:ring-red-500": errors.lastName,
                    })}
                    placeholder="Last Name"
                  />
                  {errors?.lastName && (
                    <p className="text-sm text-red-500">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

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

                <RegisterLink>
                  <Button
                    disabled={isSubmitting}
                    className="disabled:bg-blue-400 w-full"
                    ref={RegisterButtonRef}
                  >
                    Sign up
                  </Button>
                </RegisterLink>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
