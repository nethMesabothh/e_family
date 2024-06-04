import { AuthHeader } from "@/components/headers/header-auth";
import { ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { RefreshCw } from "lucide-react";
import { navLinks } from "@/constants";
import Link from "next/link";

export const Header = () => {
  const renderedLinks = navLinks.map((navLink) => {
    return (
      <Link key={navLink.name} href={navLink.href}>
        <ul>
          <li>{navLink.name}</li>
        </ul>
      </Link>
    );
  });

  return (
    <nav className="py-4 border-b-2">
      <div className="container flex justify-between items-center">
        {/* Logo */}
        <div>E-family</div>
        {/* Navigate */}
        <div className="flex gap-6 items-center">{renderedLinks}</div>
        {/*Clerk User Button */}
        <div>
          <ClerkLoaded>
            <AuthHeader />
          </ClerkLoaded>
          <ClerkLoading>
            <h1 className="px-[1.15rem]">
              <RefreshCw className="w-10 h-10 animate-spin transition-all duration-700" />
            </h1>
          </ClerkLoading>
        </div>
      </div>
    </nav>
  );
};
