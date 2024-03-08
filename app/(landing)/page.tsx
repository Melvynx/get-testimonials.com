import { currentUser } from "@/auth/current-user";
import { redirect } from "next/navigation";
import Home from "./home/page";

export default async function Index() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return <Home />;
}
