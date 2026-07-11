import type { Metadata } from "next";
import { Archivo, Bebas_Neue, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const archivo = Archivo({ variable: "--font-sans", subsets: ["latin"] });
const display = Bebas_Neue({ variable: "--font-display", weight: "400", subsets: ["latin"] });
const serif = Cormorant_Garamond({ variable: "--font-serif", weight: ["500", "600"], subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shubhranshu Sudeepta Panda — Java Backend Developer",
  description: "Java backend developer building dependable systems with Spring Boot, REST APIs, Spring Data JPA, and MySQL.",
  authors: [{ name: "Shubhranshu Sudeepta Panda", url: "https://shubhranshupanda.tech" }],
  creator: "Shubhranshu Sudeepta Panda",
  publisher: "Shubhranshu Sudeepta Panda",
  metadataBase: new URL("https://shubhranshupanda.tech"),
  openGraph: { title: "Shubhranshu Sudeepta Panda", description: "Java Backend Developer · Spring Boot · REST APIs · MySQL", images: ["/og.png"], type: "website" },
  twitter: { card: "summary_large_image", title: "Shubhranshu Sudeepta Panda", description: "Java Backend Developer · Spring Boot · REST APIs · MySQL", images: ["/og.png"] },
  other: { copyright: "© 2026 Shubhranshu Sudeepta Panda. All rights reserved." },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${archivo.variable} ${display.variable} ${serif.variable}`}>{children}</body></html>;
}
