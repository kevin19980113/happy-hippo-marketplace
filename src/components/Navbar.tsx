"use client";

import Link from "next/link";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { Icons } from "./Icons";
import NavItems from "./NavItems";
import { buttonVariants } from "./ui/button";
import Cart from "./Cart";
import {
  LoginLink,
  LogoutLink,
  RegisterLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

export default function Navbar() {
  const { isAuthenticated } = useKindeBrowserClient();

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
                <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                  {isAuthenticated ? null : (
                    <LoginLink
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Sign in
                    </LoginLink>
                  )}

                  {isAuthenticated ? null : (
                    <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                  )}

                  {isAuthenticated ? (
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

                  {isAuthenticated ? null : (
                    <div className="flex lg:ml-6">
                      <span
                        className="h-6 w-px bg-gray-200"
                        aria-hidden="true"
                      />
                    </div>
                  )}

                  {!isAuthenticated ? (
                    <p></p>
                  ) : (
                    <LogoutLink
                      className={buttonVariants({
                        variant: "ghost",
                      })}
                    >
                      Log out
                    </LogoutLink>
                  )}

                  <div className="ml-4 flow-root lg:ml-6">
                    <Cart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </MaxWidthWrapper>
      </header>
    </div>
  );
}
