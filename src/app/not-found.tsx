import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Ban } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <MaxWidthWrapper>
      <div className="w-full flex flex-col items-center text-center gap-y-8 py-28">
        <Ban className="text-blue-600 size-28 md:size-56" />
        <h2 className="w-full text-blue-700 text-3xl md:text-6xl font-bold">
          404 Not Found
        </h2>
        <p className="w-full text-blue-500 text-lg md:text-2xl font-semibold">
          Could not find requested resource
        </p>
        <Link
          href="/"
          className={cn(buttonVariants(), "md:text-lg md:px-12 md:py-6")}
        >
          Return Home
        </Link>
      </div>
    </MaxWidthWrapper>
  );
}
