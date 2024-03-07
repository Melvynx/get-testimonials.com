import { Layout, LayoutTitle } from "@/components/layout";
import type { PageParams } from "@/types/next";
import { ProductForm } from "../[productId]/edit/ProductForm";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <LayoutTitle>Create product</LayoutTitle>
      <ProductForm />
    </Layout>
  );
}
