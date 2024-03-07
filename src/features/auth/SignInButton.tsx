"use client";

import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import { signInAction } from "./auth.action";

export const SignInButton = () => {
  return (
    <form>
      <Button
        variant="secondary"
        size="sm"
        onClick={async () => {
          await signInAction();
        }}
      >
        <LogIn size={16} className="mr-2" />
        Sign In
      </Button>
    </form>
  );
};
