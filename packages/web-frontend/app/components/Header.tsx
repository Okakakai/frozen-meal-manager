import { AuthIcon } from "@/app/components/AuthIcon";
import { SignInButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-blue-600">
          冷凍弁当管理
        </Link>
        <>
          <SignedOut>
            <div className="h-fit ml-4 bg-blue-500 w-fit p-2 rounded-md text-white text-sm font-semibold">
              <SignInButton />
            </div>
          </SignedOut>
          <SignedIn>
            <div className="h-fit ml-4 w-fit">
              <AuthIcon />
            </div>
          </SignedIn>
        </>
      </div>
    </header>
  );
}
