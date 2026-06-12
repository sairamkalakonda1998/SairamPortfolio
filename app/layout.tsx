import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalakonda Sairam | AI-Enabled Full Stack Engineer",
  description:
    "Premium single-page portfolio for Kalakonda Sairam, an AI-enabled full stack engineer specializing in ASP.NET MVC, Angular, SAP Business One, and AI integrations."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-ink font-sans text-pearl antialiased">
        {children}
      </body>
    </html>
  );
}
