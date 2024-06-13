import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type MaxWidthWrapperProps = {
  className?: string;
  children: ReactNode;
};

export default function MaxWidthWrapper({
  className,
  children,
}: MaxWidthWrapperProps) {
  return (
    <div
      className={cn("w-full max-w-screen-xl px-3 md:px-20 mx-auto", className)}
    >
      {children}
    </div>
  );
}
