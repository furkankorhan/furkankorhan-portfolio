import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://furkankorhan.com"),
  title: "Furkan Korhan | Informatik Portfolio",
  description:
    "Furkan Korhan dokumentiert seinen Weg in die Informatik: IT-Systeme, Webentwicklung, Fehleranalyse, Projekte und Lernen in der Praxis.",
  keywords: [
    "Furkan Korhan",
    "Informatik",
    "IT-Ausbildung",
    "Hildesheim",
    "IT-Systeme",
    "Webentwicklung",
    "Fehleranalyse",
    "GitHub",
    "Portfolio",
  ],
  authors: [{ name: "Furkan Korhan", url: "https://furkankorhan.com" }],
  creator: "Furkan Korhan",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    url: "https://furkankorhan.com",
    title: "Furkan Korhan | Informatik Portfolio",
    description:
      "Furkan Korhan dokumentiert seinen Weg in die Informatik: IT-Systeme, Webentwicklung, Fehleranalyse, Projekte und Lernen in der Praxis.",
    siteName: "Furkan Korhan Portfolio",
    images: [
      {
        url: "/og-image",
        width: 1200,
        height: 630,
        alt: "Furkan Korhan – Informatik Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Furkan Korhan | Informatik Portfolio",
    description:
      "Furkan Korhan dokumentiert seinen Weg in die Informatik: IT-Systeme, Webentwicklung, Fehleranalyse, Projekte und Lernen in der Praxis.",
    images: ["/og-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="de"
      className={`${inter.variable} h-full antialiased`}
    >
      {/* Blocking script: runs BEFORE React hydration — prevents theme flash */}
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var saved = localStorage.getItem('theme');
                var isLight = saved === 'light';
                document.documentElement.classList.toggle('light', isLight);
              })()
            `,
          }}
        />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {children}
      </body>
    </html>
  );
}
