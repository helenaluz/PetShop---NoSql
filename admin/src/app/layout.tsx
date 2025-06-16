import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "./Footer";
import Script from "next/script";
import Header from "./header";

export const metadata: Metadata = {
  title: "Animalia",
  description: "Aqui você encontra o seu animalzinho",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />
      </head>
      <body>
        <Header />
        {children}
        <Footer />
        <Script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.6/dist/umd/popper.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.min.js"></Script>
      </body>
    </html>
  );
}
