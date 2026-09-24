import type { Metadata } from "next";
import localFont from "next/font/local";
import { Poppins } from "next/font/google";
import { SmoothScrollProvider } from "@/shared/components/layout";
import "./globals.css";



const instrumentSerif = localFont({
  src: [
    {
      path: "../public/fonts/InstrumentSerif-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/InstrumentSerif-Italic.ttf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-display-raw",
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-body-raw",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Project Runway",
  description: "The Emmy-winning Project Runway is in Africa.",
  icons: {
    icon: "/logo/project-runway-logo.svg",
    shortcut: "/logo/project-runway-logo.svg",
    apple: "/logo/project-runway-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/*
          Set scroll restoration to 'manual' as the very first thing the browser
          does. This runs synchronously during HTML parsing — before scroll
          restoration, before React hydration, before any useEffect. Without this,
          the browser reads the session history on every reload/restart and jumps
          to the last scroll position before our JS can prevent it.
        */}
        <script dangerouslySetInnerHTML={{ __html: "history.scrollRestoration = 'manual';" }} />
        <link rel="icon" type="image/svg+xml" href="/logo/project-runway-logo.svg" />
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${instrumentSerif.variable} ${poppins.variable} antialiased`}
      >
        <SmoothScrollProvider>{children}</SmoothScrollProvider>

      </body>
    </html>
  );
}
