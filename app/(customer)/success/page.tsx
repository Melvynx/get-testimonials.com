import { Layout, LayoutTitle } from "@/components/layout";
import { buttonVariants } from "@/components/ui/button";
import type { PageParams } from "@/types/next";
import Link from "next/link";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutTitle>Yeah ! You are now a premium user</LayoutTitle>
      <div className="flex gap-4">
        <Link
          className={buttonVariants({ size: "lg", variant: "secondary" })}
          href="/products"
        >
          Go to products
        </Link>
        <Link className={buttonVariants({ size: "lg" })} href="/products/new">
          Create your next product
        </Link>
      </div>
    </Layout>
  );
}
