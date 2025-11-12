export const metadata = {
  title: "ESVIEM Consulting",
  description: "Юридичне, фінансове, будівельне та земельне консалтингування. 15+ років практики.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <head />
      <body style={{ margin: 0, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial" }}>
        {children}
      </body>
    </html>
  );
}
