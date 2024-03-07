import { Layout } from "@/components/layout";
import type { PageParams } from "@/types/next";

export default async function RoutePage(props: PageParams<{}>) {
  return (
    <Layout>
      <p>hello world</p>
    </Layout>
  );
}
