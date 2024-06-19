"use client";

import { Menu } from "lucide-react";
import Image from "next/image";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { buttonVariants } from "./ui/button";
import { PRODUCT_CATEGORIES } from "@/config";
import Link from "next/link";
import { ScrollArea } from "./ui/scroll-area";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Menu
          className="size-10 lg:hidden relative inline-flex items-center justify-center
           p-2 text-gray-400 hover:text-gray-600 cursor-pointer"
          aria-hidden="true"
        />
      </SheetTrigger>

      <SheetContent
        side="left"
        className="flex flex-col w-full sm:max-w-xl h-full overflow-y-scroll"
      >
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Menu</SheetTitle>
        </SheetHeader>

        <div className="flex-1">
          <ul>
            {PRODUCT_CATEGORIES.map((category) => (
              <li key={category.label} className="space-y-10 px-4 pb-8 pt-10">
                <div className="border-b border-gray-200">
                  <div className="-mb-px flex">
                    <p className="border-transparent text-gray-900 flex-1 whitespace-nowrap border-b-2 py-4 text-base font-medium">
                      {category.label}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-10 gap-x-4">
                  {category.featured.map((item) => (
                    <div key={item.name} className="group relative text-sm">
                      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75">
                        <Image
                          fill
                          src={item.imageSrc}
                          alt="product category image"
                          className="object-cover object-center"
                        />
                      </div>
                      <Link
                        href={item.href}
                        className="mt-6 block font-medium text-gray-900"
                      >
                        {item.name}
                      </Link>
                    </div>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>

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
