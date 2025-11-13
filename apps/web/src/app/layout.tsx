import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ESVIEM Consulting — Комплексний консалтинг для бізнесу",
  description:
    "Юридичний, фінансовий, будівельний та земельний консалтинг з 15+ роками досвіду. Повний супровід проєктів в Україні.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body>{children}</body>
    </html>
  );
}
