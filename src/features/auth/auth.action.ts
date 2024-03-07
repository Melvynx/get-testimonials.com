"use server";

import { signOut } from "@/auth/auth";

export const singOutAction = async () => {
  await signOut();
};
