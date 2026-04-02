"use client";

import { usePathname } from "next/navigation";
import FollowSocialPopup from "@/components/site/FollowSocialPopup";
import FloatingPaymentButton from "@/components/site/FloatingPaymentButton";
import SiteFooter from "@/components/site/SiteFooter";
import SiteHeader from "@/components/site/SiteHeader";

interface SiteShellProps {
  children: React.ReactNode;
}

const shellHiddenPrefixes = ["/admin", "/login", "/auth/callback"];

export default function SiteShell({ children }: SiteShellProps) {
  const pathname = usePathname();
  const shouldHideShell = shellHiddenPrefixes.some((prefix) => pathname.startsWith(prefix));

  if (shouldHideShell) {
    return <>{children}</>;
  }

  return (
    <>
      <FollowSocialPopup />
      <SiteHeader />
      <div className="relative z-10">{children}</div>
      <SiteFooter />
      <FloatingPaymentButton />
    </>
  );
}
