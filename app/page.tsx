import Image from "next/image";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { SignedIn, SignedOut } from "@clerk/nextjs";

const Page = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our App</h1>

      <SignedOut>
        <p className="mb-4">Please sign in or sign up to access the dashboard.</p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/sign-in">Sign In</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/sign-up">Sign Up</Link>
          </Button>
        </div>
      </SignedOut>

      <SignedIn>
        <p className="mb-4">You are signed in!</p>
        <Button asChild>
          <Link href="/Dashboard">Go to Dashboard</Link>
        </Button>
      </SignedIn>
    </div>
  );
};

export default Page;
