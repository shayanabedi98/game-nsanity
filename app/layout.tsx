import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import NextAuthProvider from "@/components/Providers";
import ContentWarning from "@/components/ContentWarning";

export const metadata: Metadata = {
  title: "GAME NSANITY",
  description:
    "Welcome to GAME NSANITY, where we dive deep into the world of video games, bringing you the latest reviews, insights, and more!",
  keywords: [
    "video games",
    "game reviews",
    "GAME NSANITY",
    "gaming",
    "YouTube",
  ],
  authors: [{ name: "Shayan Abedi", url: "https://www.youtube.com/@gamensanity" }],
  creator: "Shayan Abedi",
  publisher: "GAME NSANITY",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font bg-secondary`}>
        <div className="flex min-h-screen flex-col">
          <NextAuthProvider>
            <ContentWarning />
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <Toaster />
          </NextAuthProvider>
        </div>
      </body>
    </html>
  );
}
