import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gaurav Setia — Mobile Lead Engineer | Android • React Native • Backend",
  description:
    "Mobile Lead Engineer with 12+ years of experience in Android, React Native & Backend development. Building scalable mobile apps, IoT solutions & cloud-connected products.",
  keywords: [
    "Android",
    "Kotlin",
    "React Native",
    "IoT",
    "BLE",
    "MQTT",
    "Mobile Architect",
    "Backend",
    "Spring Boot",
  ],
  openGraph: {
    title: "Gaurav Setia — Mobile Lead Engineer",
    description:
      "Mobile Lead Engineer with expertise in Android, React Native & Backend. Building scalable apps and IoT solutions.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen overflow-x-hidden">{children}</body>
    </html>
  );
}
