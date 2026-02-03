import { GlobalLayoutWrapper } from "@/components/GlobalLayoutWrapper";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalLayoutWrapper>
      {children}
    </GlobalLayoutWrapper>
  );
}
