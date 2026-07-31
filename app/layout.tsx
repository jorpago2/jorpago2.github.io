import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jorpago2.github.io"),
  title: "Online Simulators & Tools",
  description:
    "Open-source browser simulators for computational electromagnetics, photonics, and semiconductor devices.",
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Jorge Parra · Scientific Simulators",
    description:
      "Interactive tools for computational physics, available directly in the browser.",
    url: "https://jorpago2.github.io/",
    siteName: "Jorge Parra · Scientific Simulators",
    locale: "en_US",
    type: "website",
    images: [{ url: "/og.png", alt: "Jorge Parra · Scientific Simulators" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Parra · Scientific Simulators",
    description:
      "Interactive tools for computational physics, available directly in the browser.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
