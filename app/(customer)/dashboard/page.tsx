import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { prisma } from "@/prisma";
import type { PageParams } from "@/types/next";
import Link from "next/link";
import { ReviewItem } from "../../(user)/wall/[slug]/ReviewCard";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  const productsCount = await prisma.product.count({
    where: {
      userId: user.id,
    },
  });

  const reviewsCount = await prisma.review.count({
    where: {
      product: {
        userId: user.id,
      },
    },
  });

  const lastReview = await prisma.review.findFirst({
    where: {
      product: {
        userId: user.id,
      },
      text: {
        not: null,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <Layout>
      <LayoutTitle>Dashboard</LayoutTitle>
      <h2 className="text-xl font-bold">Welcome back, {user.name}</h2>
      <div className="flex flex-wrap items-start gap-4">
        <Card className="min-w-52">
          <CardHeader>
            <CardDescription>Products</CardDescription>
            <CardTitle>{productsCount}</CardTitle>
          </CardHeader>
          <CardHeader>
            <CardDescription>Reviews</CardDescription>
            <CardTitle>{reviewsCount}</CardTitle>
          </CardHeader>
        </Card>

        <Card className="min-w-52">
          <CardHeader>
            <CardTitle>Last review</CardTitle>
          </CardHeader>
          <CardContent className="max-w-lg">
            {lastReview ? (
              <ReviewItem review={lastReview} />
            ) : (
              <p>no review yet</p>
            )}
          </CardContent>
        </Card>
        <Card className="min-w-52">
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Link
              href="/products/new"
              className={buttonVariants({ size: "lg" })}
            >
              Create a product
            </Link>
            <Link href="/products" className={buttonVariants({ size: "lg" })}>
              Products list
            </Link>
          </CardContent>
        </Card>
        <Card className="min-w-52">
          <CardHeader>
            <CardTitle>Plan</CardTitle>
            <CardDescription>{user.plan}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <p>Max {user.plan === "FREE" ? 100 : "Inifnity"} reviews</p>
            <Progress value={(reviewsCount * 100) / 100} />
            {productsCount === 1}
            <p>Max {user.plan === "FREE" ? 1 : "Inifnity"} products</p>
            <Progress value={(productsCount * 100) / 1} />
            {productsCount === 1}
            {user.plan === "FREE" &&
              (productsCount === 1 || reviewsCount === 100) && (
                <Alert>
                  <AlertTitle>
                    You reached the limit of your free plan, please upgrade
                  </AlertTitle>
                  <Link
                    className={buttonVariants({ size: "sm" })}
                    href="/upgrade"
                  >
                    Upgrade
                  </Link>
                </Alert>
              )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
