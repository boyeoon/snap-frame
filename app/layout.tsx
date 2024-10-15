import type { Metadata } from "next";
// import localFont from "next/font/local";
import "./globals.css";

// const pretendard = localFont({
//   src: "./fonts/PretendardVariable.woff2",
//   display: "swap",
//   weight: "45 920",
//   variable: "--font-pretendard",
// });

export const metadata: Metadata = {
  title: "Snap Frame",
  description: "A web application that allows photo capture from live video streams, offers various background color options, and provides download functionality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/favicon.ico" sizes="any" />
      <body
        // className={`${pretendard.variable} font-pretendard`}
      >
        {children}
      </body>
    </html>
  );
}
