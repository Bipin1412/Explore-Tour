import { Suspense } from "react";
import type { Metadata } from "next";
import AuthScreen from "@/components/auth/AuthScreen";

export const metadata: Metadata = {
  title: "Login | Explorer Tours",
  description: "Login or create an account before booking your next trip."
};

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <AuthScreen />
    </Suspense>
  );
}
