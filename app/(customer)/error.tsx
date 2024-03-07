"use client";

import { Layout } from "@/components/layout";
import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { SignInButton } from "@/features/auth/SignInButton";

export default function RouteError() {
  return (
    <Layout>
      <Card>
        <CardHeader>
          <CardTitle>
            Sorry, you need to be logged in to view this page.
          </CardTitle>
        </CardHeader>
        <CardFooter>
          <SignInButton />
        </CardFooter>
      </Card>
    </Layout>
  );
}
