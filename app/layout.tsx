import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const cafeMeongi = localFont({
  src: "./font/Cafe24Meongi-B-v1.0.woff2",
  variable: "--font-cafe-meongi",
  display: "swap",
  // weight: "100 900",
});

export const metadata: Metadata = {
  title: "Snap Frame",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body className={`${cafeMeongi.variable}`}>{children}</body>
    </html>
  );
}
