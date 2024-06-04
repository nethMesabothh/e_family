"use client";

import { ClerkProvider } from "@clerk/nextjs";

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkProvider publishableKey="pk_test_cmVzdGVkLW1vbGx5LTM3LmNsZXJrLmFjY291bnRzLmRldiQ">
      {children}
    </ClerkProvider>
  );
};
