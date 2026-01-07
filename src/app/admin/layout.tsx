'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import SessionProvider from '@/components/providers/SessionProvider'
import { 
  LayoutDashboard, 
  CalendarCheck, 
  FileText, 
  Settings, 
  Menu, 
  X,
  LogOut,
  ExternalLink,
  ChevronRight,
  Bell,
  Search,
  Image,
  CreditCard
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard, requiresPermission: null },
  { name: 'Solicitudes de Visita', href: '/admin/visitas', icon: CalendarCheck, requiresPermission: 'canManageVisitas' },
  { name: 'Presupuestos', href: '/admin/presupuestos', icon: FileText, requiresPermission: 'canManagePresupuestos' },
  { name: 'Pagos', href: '/admin/pagos', icon: CreditCard, requiresPermission: null },
  { name: 'Configuración', href: '/admin/configuracion', icon: Settings, requiresPermission: null },
]

function AdminLayoutContent({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const router = useRouter()
  const { data: session, status } = useSession()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)

  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth >= 1024)
    checkDesktop()
    window.addEventListener('resize', checkDesktop)
    return () => window.removeEventListener('resize', checkDesktop)
  }, [])

  useEffect(() => {
    if (status === 'unauthenticated' && pathname !== '/admin/login') {
      router.push('/admin/login')
    }
  }, [status, pathname, router])

  // Hide footer for admin pages
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (footer) {
      footer.style.display = 'none'
    }
    return () => {
      if (footer) {
        footer.style.display = ''
      }
    }
  }, [])

  if (pathname === '/admin/login') {
    return <>{children}</>
  }

  if (status === 'loading') {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f1f5f9',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '48px',
            height: '48px',
            border: '4px solid #3b82f6',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b', fontWeight: 500 }}>Cargando...</p>
        </div>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/admin/login' })
  }

  const getPageTitle = () => {
    const current = navigation.find(item => pathname === item.href || pathname.startsWith(item.href + '/'))
    return current?.name || 'Dashboard'
  }

  const showSidebar = isDesktop || sidebarOpen

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        
        .admin-wrapper, .admin-wrapper * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
          box-sizing: border-box;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      
      <div className="admin-wrapper" style={{
        minHeight: '100vh',
        background: '#f1f5f9',
        fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif'
      }}>
        {/* Mobile sidebar backdrop */}
        {sidebarOpen && !isDesktop && (
          <div 
            onClick={() => setSidebarOpen(false)}
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(15, 23, 42, 0.6)',
              backdropFilter: 'blur(4px)',
              zIndex: 40
            }}
          />
        )}

        {/* Sidebar - Always visible on desktop */}
        <aside style={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '260px',
          background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          zIndex: 50,
          transform: showSidebar ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.3s ease',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Close button mobile */}
          {!isDesktop && (
            <button
              onClick={() => setSidebarOpen(false)}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                padding: '8px',
                borderRadius: '8px',
                background: 'transparent',
                border: 'none',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              <X size={20} />
            </button>
          )}

          {/* Logo */}
          <div style={{ padding: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
            <Link href="/admin" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: '#3b82f6',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <span style={{ color: 'white', fontWeight: 700, fontSize: '18px' }}>M</span>
              </div>
              <div>
                <h1 style={{ color: 'white', fontWeight: 600, fontSize: '18px', margin: 0 }}>MeleRoller</h1>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0 }}>Panel de Admin</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav style={{ padding: '16px', flex: 1 }}>
            <p style={{
              color: '#64748b',
              fontSize: '11px',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              padding: '0 12px',
              marginBottom: '12px'
            }}>
              Menú Principal
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {navigation
                .filter((item) => {
                  // Si no requiere permiso, siempre mostrar
                  if (!item.requiresPermission) return true
                  // Si requiere permiso, verificar que el usuario lo tenga
                  // SUPERADMIN siempre tiene todos los permisos
                  if (session?.user?.role === 'SUPERADMIN') return true
                  // Verificar el permiso específico
                  return session?.user?.[item.requiresPermission as 'canManageVisitas' | 'canManagePresupuestos'] === true
                })
                .map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '10px 12px',
                        borderRadius: '8px',
                        textDecoration: 'none',
                        color: isActive ? 'white' : '#cbd5e1',
                        background: isActive ? 'linear-gradient(90deg, #3b82f6 0%, #2563eb 100%)' : 'transparent',
                        boxShadow: isActive ? '0 4px 12px rgba(59, 130, 246, 0.4)' : 'none',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <item.icon size={20} strokeWidth={1.5} />
                      <span style={{ fontWeight: 500, fontSize: '14px', flex: 1 }}>{item.name}</span>
                      {isActive && <ChevronRight size={16} />}
                    </Link>
                  )
                })}
            </div>
          </nav>

          {/* User section */}
          <div style={{
            padding: '16px',
            borderTop: '1px solid rgba(255,255,255,0.1)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontWeight: 600
              }}>
                {session.user?.name?.[0] || session.user?.email?.[0] || 'A'}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ color: 'white', fontSize: '14px', fontWeight: 500, margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {session.user?.name || 'Administrador'}
                </p>
                <p style={{ color: '#94a3b8', fontSize: '12px', margin: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {session.user?.email}
                </p>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <Link
                href="/"
                target="_blank"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#cbd5e1',
                  fontSize: '12px',
                  textDecoration: 'none',
                  border: 'none'
                }}
              >
                <ExternalLink size={14} />
                <span>Ver sitio</span>
              </Link>
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'rgba(248,113,113,0.1)',
                  color: '#f87171',
                  fontSize: '12px',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <LogOut size={14} />
                <span>Salir</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div style={{ 
          marginLeft: isDesktop ? '260px' : '0',
          minHeight: '100vh',
          transition: 'margin-left 0.3s ease'
        }}>
          {/* Top bar */}
          <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 30,
            background: 'white',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: isDesktop ? '0 24px' : '0 16px',
              height: '64px'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {!isDesktop && (
                  <button
                    onClick={() => setSidebarOpen(true)}
                    style={{
                      padding: '8px',
                      borderRadius: '8px',
                      background: 'transparent',
                      border: 'none',
                      color: '#64748b',
                      cursor: 'pointer'
                    }}
                  >
                    <Menu size={22} />
                  </button>
                )}
                
                <div>
                  <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>{getPageTitle()}</h2>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                {/* Search - hidden on mobile */}
                {isDesktop && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    background: '#f1f5f9',
                    width: '220px'
                  }}>
                    <Search size={16} style={{ color: '#94a3b8' }} />
                    <input 
                      type="text" 
                      placeholder="Buscar..." 
                      style={{
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        marginLeft: '8px',
                        width: '100%',
                        fontSize: '14px',
                        color: '#334155',
                        fontFamily: 'inherit'
                      }}
                    />
                  </div>
                )}

                {/* Notifications */}
                <button style={{
                  position: 'relative',
                  padding: '8px',
                  borderRadius: '8px',
                  background: 'transparent',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer'
                }}>
                  <Bell size={20} />
                  <span style={{
                    position: 'absolute',
                    top: '6px',
                    right: '6px',
                    width: '8px',
                    height: '8px',
                    background: '#ef4444',
                    borderRadius: '50%'
                  }}></span>
                </button>

                {/* User avatar - hidden on mobile */}
                {isDesktop && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    paddingLeft: '12px',
                    borderLeft: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'white',
                      fontSize: '14px',
                      fontWeight: 500
                    }}>
                      {session.user?.name?.[0] || 'A'}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </header>

          {/* Page content */}
          <main style={{ padding: isDesktop ? '24px' : '16px' }}>
            {children}
          </main>
        </div>
      </div>
    </>
  )
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SessionProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </SessionProvider>
  )
}
