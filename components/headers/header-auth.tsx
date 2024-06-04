import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import React from "react";
import { Button } from "@/components/ui/button";

export const AuthHeader = () => {
  return (
    <div className="flex items-center my-1.5">
      <SignedIn>
        <UserButton />
      </SignedIn>
      <SignedOut>
        <Button asChild>
          <SignInButton />
        </Button>
      </SignedOut>
    </div>
  );
};
