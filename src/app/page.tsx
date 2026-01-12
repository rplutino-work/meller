import PromoBanner from "@/components/home/PromoBanner";
import HeroSection from "@/components/home/HeroSection";
import ProductCards from "@/components/home/ProductCards";
import ValuesSection from "@/components/home/ValuesSection";
import ContactSection from "@/components/home/ContactSection";
import MantenimientoScreen from "@/components/MantenimientoScreen";
import Loader from "@/components/Loader";

async function getMantenimientoConfig() {
  // Skip database check in development if DB is unavailable
  // or if there's a connection error
  try {
    const { prisma } = await import("@/lib/prisma");
    
    // Add a timeout to prevent hanging
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Database timeout')), 3000)
    );
    
    const queryPromise = prisma.configuracion.findUnique({
      where: { clave: 'mantenimiento' },
    });
    
    const config = await Promise.race([queryPromise, timeoutPromise]) as { valor: string } | null;
    
    if (config && config.valor) {
      const parsed = JSON.parse(config.valor);
      return parsed;
    }
    
    return null;
  } catch (error) {
    // Log error but don't block the page from rendering
    console.warn('Database unavailable, skipping maintenance check:', error instanceof Error ? error.message : 'Unknown error');
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
      <Loader />
      <PromoBanner />
      <HeroSection />
      <ProductCards />
      <ValuesSection />
      <ContactSection />
    </>
  );
}
