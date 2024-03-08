import { requiredCurrentUser } from "@/auth/current-user";
import { Layout, LayoutTitle } from "@/components/layout";
import { PricingSection } from "@/features/landing/PricingSection";
import type { PageParams } from "@/types/next";
import { redirect } from "next/navigation";

export default async function RoutePage(props: PageParams<{}>) {
  const user = await requiredCurrentUser();

  if (user.plan === "PREMIUM") {
    redirect("/dashboard");
  }

  return (
    <Layout>
      <LayoutTitle>Upgrade</LayoutTitle>
      <PricingSection />
    </Layout>
  );
}
