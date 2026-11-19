import type { Metadata } from "next";
import { Bebas_Neue, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const bebas = Bebas_Neue({
  variable: "--font-bebas",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Clipnova — Professional video editing, on order",
  description:
    "Place an order, upload your raw footage, and our professional editors deliver a polished, ready-to-publish video — SaaS promos, wedding films, vlogs, reels and post production.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebas.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
