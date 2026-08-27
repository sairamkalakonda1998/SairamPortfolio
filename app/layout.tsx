import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kalakonda Sairam | Software Developer (.NET, APIs & AI-Assisted Engineering)",
  description:
    "Portfolio of Kalakonda Sairam — Software Developer with 4+ years of experience specializing in C#, ASP.NET MVC, SAP HANA SQL, and AI-assisted engineering with Codex & Antigravity."
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
