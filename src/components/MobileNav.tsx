"use client";

import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "./ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu
          className="size-10 md:hidden relative inline-flex items-center justify-center
           p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-hidden="true"
        />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex flex-col w-full sm:max-w-md h-full overflow-y-scroll"
      >
        <SheetHeader>
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col items-start gap-y-2">
          <SheetTrigger asChild>
            <Link className={cn(buttonVariants({ variant: "link" }))} href="/">
              Home
            </Link>
          </SheetTrigger>

          <SheetTrigger asChild>
            <Link
              className={cn(buttonVariants({ variant: "link" }))}
              href="/products"
            >
              Products
            </Link>
          </SheetTrigger>
        </div>

        <hr className="w-full h-1" />

        <SheetTrigger asChild>
          <LoginLink
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Sign in
          </LoginLink>
        </SheetTrigger>
        <SheetTrigger asChild>
          <RegisterLink
            className={buttonVariants({
              className: "w-full",
            })}
          >
            Sign up
          </RegisterLink>
        </SheetTrigger>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
