import { Layout } from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { LoggedInButton } from "../auth/LoggedInButton";
import { ModeToggle } from "../theme/ModeToggle";

export const Header = async () => {
  return (
    <header className="w-full border-b border-border py-1">
      <Layout className="flex flex-row items-center gap-4 py-0">
        <Link href="/" className="flex-1">
          <Image
            src="/icon.png"
            width={32}
            height={32}
            alt="get-testimonials.com logo"
          />
        </Link>
        <div className="flex items-center gap-2">
          <ModeToggle />
          <LoggedInButton />
        </div>
      </Layout>
    </header>
  );
};
