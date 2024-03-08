"use client";

import { motion, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";
import { SignInButton } from "../auth/SignInButton";
import { ModeToggle } from "../theme/ModeToggle";

function useBoundedScroll(threshold: number) {
  let { scrollY } = useScroll();
  let scrollYBounded = useMotionValue(0);
  let scrollYBoundedProgress = useTransform(
    scrollYBounded,
    [0, threshold],
    [0, 1]
  );

  useEffect(() => {
    return scrollY.on("change", (current) => {
      let previous = scrollY.getPrevious();
      if (!previous) return;
      let diff = current - previous;
      let newScrollYBounded = scrollYBounded.get() + diff;

      scrollYBounded.set(clamp(newScrollYBounded, 0, threshold));
    });
  }, [threshold, scrollY, scrollYBounded]);

  return { scrollYBounded, scrollYBoundedProgress };
}

export function LandingHeader() {
  let { scrollYBoundedProgress } = useBoundedScroll(400);
  let scrollYBoundedProgressDelayed = useTransform(
    scrollYBoundedProgress,
    [0, 0.75, 1],
    [0, 0, 1]
  );

  return (
    <motion.header
      style={{
        height: useTransform(scrollYBoundedProgressDelayed, [0, 1], [80, 50]),
      }}
      className="fixed inset-x-0 flex h-20 shadow backdrop-blur-md"
    >
      <div className="mx-auto flex w-full max-w-3xl items-center justify-between px-8">
        <motion.div
          style={{
            scale: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0.9]
            ),
          }}
          className="flex origin-left items-center text-xl font-semibold uppercase"
        >
          <Image
            src="/icon.png"
            width={32}
            height={32}
            alt="get-testimonials.com logo"
          />
        </motion.div>
        <motion.nav
          style={{
            opacity: useTransform(
              scrollYBoundedProgressDelayed,
              [0, 1],
              [1, 0]
            ),
          }}
          className="flex items-center gap-4 text-sm font-medium text-muted-foreground"
        >
          <a href="#pricing">Pricing</a>
          <a href="#features">Feathures</a>
          <AppButton />
          <ModeToggle />
        </motion.nav>
      </div>
    </motion.header>
  );
}

let clamp = (number: number, min: number, max: number) =>
  Math.min(Math.max(number, min), max);

const AppButton = () => {
  const session = useSession();

  if (session.data?.user) {
    return <a href="/products">App</a>;
  } else {
    return <SignInButton />;
  }
};
