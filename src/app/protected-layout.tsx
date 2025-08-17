import { ProtectedLayout } from "@/components/protected-layout";

export default function ProtectedPageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedLayout>{children}</ProtectedLayout>;
}