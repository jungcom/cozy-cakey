import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/MainPage/NavBar";
import { LanguageProvider } from "@/context/LanguageContext";

export const pacifico = Pacifico({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-pacifico",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased bg-gray-50 flex flex-col min-h-screen`}
      >
        <LanguageProvider>
          <NavBar />
          <main className="flex-grow">
            {children}
          </main>
        </LanguageProvider>
      </body>
    </html>
  );
}
