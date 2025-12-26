import PromoBanner from "@/components/home/PromoBanner";
import HeroSection from "@/components/home/HeroSection";
import ProductCards from "@/components/home/ProductCards";
import ValuesSection from "@/components/home/ValuesSection";
import ContactSection from "@/components/home/ContactSection";
import MantenimientoScreen from "@/components/MantenimientoScreen";
import { prisma } from "@/lib/prisma";

async function getMantenimientoConfig() {
  try {
    const config = await prisma.configuracion.findUnique({
      where: { clave: 'mantenimiento' },
    });
    
    if (config && config.valor) {
      const parsed = JSON.parse(config.valor);
      return parsed;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching mantenimiento config:', error);
    return null;
  }
}

export default async function Home() {
  const mantenimiento = await getMantenimientoConfig();

  // Si el mantenimiento está activo, mostrar la pantalla de mantenimiento
  if (mantenimiento && mantenimiento.activo) {
    return (
      <div style={{ margin: 0, padding: 0 }}>
        <MantenimientoScreen
          titulo={mantenimiento.titulo || 'Sitio en Mantenimiento'}
          mensaje={mantenimiento.mensaje || 'Estamos realizando mejoras en nuestro sitio. Volveremos pronto.'}
          mostrarEmail={mantenimiento.mostrarEmail || false}
          email={mantenimiento.email || 'info@meleroller.com.ar'}
          mostrarTelefono={mantenimiento.mostrarTelefono || false}
          telefono={mantenimiento.telefono || ''}
        />
      </div>
    );
  }

  return (
    <>
      <PromoBanner />
      <HeroSection />
      <ProductCards />
      <ValuesSection />
      <ContactSection />
    </>
  );
}
