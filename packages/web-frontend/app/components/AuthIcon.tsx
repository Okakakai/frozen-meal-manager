import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import { Ellipsis } from "lucide-react";

export async function AuthIcon() {
  const user = await currentUser();

  if (!user) {
    return <Ellipsis />;
  }

  return (
    <>
      <SignedOut>
        <div className="h-fit ml-4 bg-blue-500 w-fit p-2 rounded-md text-white text-sm font-semibold">
          <SignInButton />
        </div>
      </SignedOut>
      <SignedIn>
        <div className="h-fit ml-4 w-fit">
          <UserButton />
        </div>
      </SignedIn>
    </>
  );
}
