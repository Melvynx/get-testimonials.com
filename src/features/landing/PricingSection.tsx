import { currentUser } from "@/auth/current-user";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import Link from "next/link";
import { PropsWithChildren } from "react";
import { upgradeToPremium } from "./upgrade-premium.action";

export const PricingSection = async () => {
  const user = await currentUser();

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-screen-xl px-4 py-8 lg:px-6 lg:py-16">
        <div className="mx-auto mb-8 max-w-screen-md text-center lg:mb-12">
          <h2 className="mb-4 text-4xl font-extrabold tracking-tight text-gray-900 dark:text-white">
            Increase your testimonials by 2
          </h2>
          <p className="mb-5 font-light text-gray-500 dark:text-gray-400 sm:text-xl">
            We offer a simple plan for everyone.
          </p>
        </div>
        <div className="flex justify-center gap-4 max-lg:flex-col">
          <PricingCard
            title="Starter"
            price={0}
            description="To try our product"
            items={["Create 1 product", "Get 10 reviews"]}
          >
            <Link
              href="/api/auth/signin"
              className={cn(
                buttonVariants({
                  size: "lg",
                  variant: "outline",
                }),
                "w-full"
              )}
            >
              Sign Up
            </Link>
          </PricingCard>
          <PricingCard
            title="Premium"
            price={39}
            description="For business that want to grow with the best review experience"
            items={[
              "Create infinite product",
              "Get infinite reviews",
              "Customize your review page",
              "Customize your colors",
              "Get a 'wall of reviews'",
            ]}
          >
            {user ? (
              <form>
                <Button
                  formAction={async () => {
                    "use server";
                    await upgradeToPremium("");
                  }}
                  size="lg"
                  variant="default"
                  className="w-full"
                >
                  Grab it
                </Button>
              </form>
            ) : (
              <Link
                href="/api/auth/signin"
                className={cn(
                  buttonVariants({
                    size: "lg",
                    variant: "outline",
                  }),
                  "w-full"
                )}
              >
                Sign Up
              </Link>
            )}
          </PricingCard>
        </div>
      </div>
    </section>
  );
};

type PricingCardProps = PropsWithChildren<{
  title: string;
  description: string;
  items: string[];
  price: number;
}>;

const PricingCard = (props: PricingCardProps) => {
  return (
    <Card
      style={{
        width: 300,
      }}
      className="h-fit"
    >
      <CardHeader>
        <CardTitle>{props.title}</CardTitle>
        <CardDescription>{props.description}</CardDescription>
      </CardHeader>
      <CardContent className="my-8 flex items-baseline justify-center">
        <span className="mr-2 text-5xl font-extrabold">${props.price}</span>
        <span className="text-muted-foreground">/month</span>
      </CardContent>

      <CardContent>
        <ul role="list" className="mb-8 space-y-4 text-left">
          {props.items.map((item) => (
            <PricingItem key={item}>{item}</PricingItem>
          ))}
        </ul>
      </CardContent>
      <CardFooter>{props.children}</CardFooter>
    </Card>
  );
};

const PricingItem = ({ children }: PropsWithChildren) => {
  return (
    <li className="flex items-center space-x-3">
      <Check size={16} className="text-green-500" />
      <span>{children}</span>
    </li>
  );
};
