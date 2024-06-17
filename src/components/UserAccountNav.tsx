"use client";

import { Button } from "./ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type User = {
  id: string;
  email: string | null;
  given_name: string | null;
  family_name: string | null;
  picture: string | null;
} | null;

export default function UserAccountNav({ user }: { user: User }) {
  useEffect(() => {
    if (sessionStorage.getItem("isLoggedIn") === "true") {
      sessionStorage.setItem("loggingOut", "true");
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button variant="ghost" size="sm" className="relative">
          My account
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white w-60" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <p className="font-medium text-sm text-black">{user?.email}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        {/* <DropdownMenuItem asChild>
          <Link href="/sell">Seller Dashboard</Link>
        </DropdownMenuItem> */}

        <DropdownMenuItem className="cusror-pointer">
          <LogoutLink className="w-full">Log out</LogoutLink>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
