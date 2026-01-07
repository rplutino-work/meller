import type { Metadata } from "next";
import Script from "next/script";
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
      <head>
        {/* Meta Pixel noscript - debe ir en head */}
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src="https://www.facebook.com/tr?id=1595783968105234&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body className="antialiased" style={{ margin: 0, padding: 0 }}>
        {/* Google Tag Manager (noscript) - debe ir justo después del body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KPLQ99RX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>

        {/* Google Tag Manager - Next.js lo inserta automáticamente en el head */}
        <Script
          id="google-tag-manager"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KPLQ99RX');`,
          }}
        />

        {/* Meta Pixel Code - Next.js lo inserta automáticamente en el head */}
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '1595783968105234');
fbq('track', 'PageView');`,
          }}
        />

        <main style={{ margin: 0, padding: 0 }}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
