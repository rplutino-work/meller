import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "MeleRoller - Cortinas y Cerramientos | Buenos Aires, Argentina",
  description: "Especialistas en cortinas roller, blackout, sunscreen, romanas, orientales y tradicionales. Toldos y cerramientos. 3 años de garantía. Visitas sin cargo en Buenos Aires.",
  keywords: "cortinas, roller, blackout, sunscreen, cortinas romanas, paneles orientales, toldos, cerramientos, buenos aires, argentina",
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: "MeleRoller - Cortinas y Cerramientos",
    description: "Especialistas en cortinas roller y cerramientos. Visitas sin cargo.",
    url: "https://www.meleroller.com.ar",
    siteName: "MeleRoller",
    locale: "es_AR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className="antialiased" style={{ margin: 0, padding: 0 }}>
        <main style={{ margin: 0, padding: 0 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
