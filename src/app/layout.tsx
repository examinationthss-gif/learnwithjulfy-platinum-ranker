import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Configure premium fonts
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

// Advanced SEO Metadata targeting AHSEC Class 12 Education
export const metadata: Metadata = {
  title: "LearnWithJulfy Platinum Ranker | Class 12 Education (AHSEC)",
  description:
    "Master the AHSEC Class 12 Education syllabus. Access chapter notes, MCQ banks, mock tests, and board prediction papers curated by Julfy.",
  keywords: [
    "AHSEC Class 12 Education",
    "LearnWithJulfy Education",
    "Class 12 Education Notes",
    "Assam Board Class 12 Education",
    "AHSEC MCQ Bank",
    "Education Mock Test papers",
    "Platinum Ranker Series",
  ],
  authors: [{ name: "Julfy" }],
  robots: "index, follow",
  openGraph: {
    title: "LearnWithJulfy Platinum Ranker | Class 12 Education (AHSEC)",
    description:
      "Your ultimate preparation hub for Class 12 Education (AHSEC). Notes, MCQs, and Tests.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${outfit.variable} font-sans antialiased min-h-screen flex flex-col justify-between`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LanguageProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
