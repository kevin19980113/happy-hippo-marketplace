"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import {
  LoginLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import { Suspense, useEffect } from "react";
import { toast } from "sonner";
import UserAccountNav from "./UserAccountNav";

export default function Navbar() {
  const { user, isLoading } = useKindeBrowserClient();

  useEffect(() => {
    if (
      sessionStorage.getItem("loggingOut") === "true" &&
      !user &&
      !isLoading
    ) {
      console.log("logging out");
      toast.success("you have successfully logged out");
      sessionStorage.removeItem("loggingOut");
    }
    if (user && !sessionStorage.getItem("isLoggedIn")) {
      toast.success(`Welcome back ${user.email} !!`);
      sessionStorage.setItem("isLoggedIn", "true");
    }
    if (!user && !isLoading) {
      sessionStorage.removeItem("isLoggedIn");
    }
  }, [user, isLoading]);

  return (
    <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
      <header className="relative bg-white">
        <MaxWidthWrapper>
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              {/* TO do: Mobile Navbar */}

              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <Icons.logo className="h-10 w-10" />
                </Link>
              </div>

              <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                <NavItems />
              </div>

              <div className="ml-auto flex items-center">
                {!isLoading && (
                  <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                    {user ? null : (
                      <LoginLink
                        className={buttonVariants({
                          variant: "ghost",
                        })}
                      >
                        Sign in
                      </LoginLink>
                    )}

                    {user ? null : (
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    )}

                    {user ? (
                      <p></p>
                    ) : (
                      <RegisterLink
                        className={buttonVariants({
                          variant: "ghost",
                        })}
                      >
                        Create account
                      </RegisterLink>
                    )}

                    {user ? null : (
                      <div className="flex lg:ml-6">
                        <span
                          className="h-6 w-px bg-gray-200"
                          aria-hidden="true"
                        />
                      </div>
                    )}

                    {!user ? null : <UserAccountNav user={user} />}

                    <div className="ml-4 flow-root lg:ml-6">
                      <Cart />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
