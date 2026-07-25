import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://jorpago2.github.io"),
  title: "Jorge Parra · Research Software",
  description:
    "Software abierto para simulación electromagnética, fotónica integrada y automatización experimental.",
  openGraph: {
    title: "Jorge Parra · Research Software",
    description:
      "Herramientas científicas para hacer visible la física, del modelo al laboratorio.",
    url: "https://jorpago2.github.io/",
    siteName: "Jorge Parra · Research Software",
    locale: "es_ES",
    type: "website",
    images: [{ url: "/og.png", alt: "Jorge Parra · Research Software" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jorge Parra · Research Software",
    description:
      "Herramientas científicas para hacer visible la física, del modelo al laboratorio.",
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
