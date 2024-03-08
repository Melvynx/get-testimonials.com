import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Section } from "./Section";

export const CTASection = () => {
  return (
    <Section>
      <Card className="flex flex-col items-center justify-center gap-4 p-12 lg:p-20">
        <h2 className="text-3xl font-bold">Get started today</h2>
        <Link className={buttonVariants({ size: "lg" })} href="#pricing">
          Start now
        </Link>
      </Card>
    </Section>
  );
};
