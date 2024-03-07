"use client";

import { ThemeProvider } from "@/features/theme/ThemeProvider";
import { Toaster } from "@/components/ui/sonner";
import { PropsWithChildren } from "react";

export type ProvidersProps = PropsWithChildren;

export const Providers = (props: ProvidersProps) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Toaster />
      {props.children}
    </ThemeProvider>
  );
};
