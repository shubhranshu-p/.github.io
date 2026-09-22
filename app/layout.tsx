import type { Metadata, Viewport } from "next";
import { Archivo } from "next/font/google";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0d1422" },
    { media: "(prefers-color-scheme: light)", color: "#f8faff" },
  ],
};

const archivo = Archivo({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shubhranshu Sudeepta Panda — Java Backend Developer",
  description:
    "Computer Science graduate in Umerkote, Odisha, focused on Java, Spring Boot, REST APIs, and MySQL. Explore my skills, planned projects, and resume.",
  authors: [
    {
      name: "Shubhranshu Sudeepta Panda",
      url: "https://shubhranshupanda.tech",
    },
  ],
  creator: "Shubhranshu Sudeepta Panda",
  publisher: "Shubhranshu Sudeepta Panda",
  metadataBase: new URL("https://shubhranshupanda.tech"),
  openGraph: {
    title: "Shubhranshu Sudeepta Panda",
    description: "Java Backend Developer · Spring Boot · REST APIs · MySQL",
    images: ["/og.png"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shubhranshu Sudeepta Panda",
    description: "Java Backend Developer · Spring Boot · REST APIs · MySQL",
    images: ["/og.png"],
  },
  other: {
    copyright: "© 2026 Shubhranshu Sudeepta Panda. All rights reserved.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={archivo.variable}>{children}</body>
    </html>
  );
}
