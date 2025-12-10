'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  CalendarCheck, 
  FileText, 
  Clock, 
  CheckCircle2, 
  TrendingUp, 
  ArrowUpRight,
  Eye
} from 'lucide-react'

interface Stats {
  totalVisitas: number
  totalPresupuestos: number
  pendientes: number
  completados: number
  enProceso: number
}

interface Solicitud {
  id: string
  nombre: string
  email: string
  estado: string
  createdAt: string
  tipo: 'visita' | 'presupuesto'
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalVisitas: 0,
    totalPresupuestos: 0,
    pendientes: 0,
    completados: 0,
    enProceso: 0,
  })
  const [recentSolicitudes, setRecentSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchData()
  }, [])

  async function fetchData() {
    try {
      const [visitasRes, presupuestosRes] = await Promise.all([
        fetch('/api/solicitudes/visita'),
        fetch('/api/solicitudes/presupuesto'),
      ])

      const visitas = await visitasRes.json()
      const presupuestos = await presupuestosRes.json()

      const allSolicitudes = [
        ...visitas.map((v: Solicitud) => ({ ...v, tipo: 'visita' as const })),
        ...presupuestos.map((p: Solicitud) => ({ ...p, tipo: 'presupuesto' as const })),
      ].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())

      setStats({
        totalVisitas: visitas.length,
        totalPresupuestos: presupuestos.length,
        pendientes: allSolicitudes.filter((s: Solicitud) => s.estado === 'PENDIENTE').length,
        completados: allSolicitudes.filter((s: Solicitud) => s.estado === 'COMPLETADO').length,
        enProceso: allSolicitudes.filter((s: Solicitud) => s.estado === 'EN_PROCESO').length,
      })

      setRecentSolicitudes(allSolicitudes.slice(0, 5))
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const statCards = [
    {
      title: 'Solicitudes de Visita',
      value: stats.totalVisitas,
      icon: CalendarCheck,
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      change: '+12%',
      href: '/admin/visitas',
    },
    {
      title: 'Presupuestos',
      value: stats.totalPresupuestos,
      icon: FileText,
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      change: '+8%',
      href: '/admin/presupuestos',
    },
    {
      title: 'Pendientes',
      value: stats.pendientes,
      icon: Clock,
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
      change: stats.pendientes > 0 ? 'Requiere atención' : 'Al día',
      href: '/admin/visitas?estado=PENDIENTE',
    },
    {
      title: 'Completados',
      value: stats.completados,
      icon: CheckCircle2,
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
      change: `${Math.round((stats.completados / (stats.totalVisitas + stats.totalPresupuestos)) * 100) || 0}% del total`,
      href: '/admin/visitas?estado=COMPLETADO',
    },
  ]

  const getEstadoBadge = (estado: string) => {
    const styles: Record<string, { bg: string; color: string }> = {
      PENDIENTE: { bg: '#fef3c7', color: '#92400e' },
      EN_PROCESO: { bg: '#dbeafe', color: '#1e40af' },
      COMPLETADO: { bg: '#d1fae5', color: '#065f46' },
      CANCELADO: { bg: '#fee2e2', color: '#991b1b' },
    }
    return styles[estado] || styles.PENDIENTE
  }

  const getEstadoLabel = (estado: string) => {
    const labels: Record<string, string> = {
      PENDIENTE: 'Pendiente',
      EN_PROCESO: 'En Proceso',
      COMPLETADO: 'Completado',
      CANCELADO: 'Cancelado',
    }
    return labels[estado] || estado
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '300px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '40px',
            height: '40px',
            border: '4px solid #3b82f6',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Cargando datos...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Section */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: 700, color: '#1e293b', margin: 0 }}>¡Bienvenido de nuevo!</h1>
          <p style={{ color: '#64748b', marginTop: '4px', fontSize: '14px' }}>Aquí tienes un resumen de tu actividad</p>
        </div>
        <Link 
          href="/admin/visitas"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            background: 'linear-gradient(135deg, #3b82f6, #2563eb)',
            color: 'white',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: 500,
            fontSize: '14px',
            boxShadow: '0 2px 8px rgba(59, 130, 246, 0.3)'
          }}
        >
          <CalendarCheck size={16} />
          Nueva Visita
        </Link>
      </div>

      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: stat.gradient,
              borderRadius: '12px',
              padding: '20px',
              color: 'white',
              position: 'relative',
              overflow: 'hidden',
              minHeight: '140px'
            }}>
              <div style={{
                position: 'absolute',
                top: '-20px',
                right: '-20px',
                width: '100px',
                height: '100px',
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%'
              }}></div>
              <div style={{ position: 'relative' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    background: 'rgba(255,255,255,0.2)',
                    borderRadius: '10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}>
                    <stat.icon size={20} />
                  </div>
                  <span style={{ fontSize: '12px', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <ArrowUpRight size={14} />
                    {stat.change}
                  </span>
                </div>
                <p style={{ fontSize: '32px', fontWeight: 700, margin: '0 0 4px 0' }}>{stat.value}</p>
                <p style={{ fontSize: '14px', opacity: 0.9, margin: 0 }}>{stat.title}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'white',
        borderRadius: '12px',
        border: '1px solid #e2e8f0',
        overflow: 'hidden'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: '1px solid #e2e8f0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#1e293b', margin: 0 }}>Actividad Reciente</h2>
            <p style={{ fontSize: '14px', color: '#64748b', margin: '4px 0 0 0' }}>Últimas solicitudes recibidas</p>
          </div>
          <Link 
            href="/admin/visitas"
            style={{ 
              fontSize: '14px', 
              color: '#3b82f6', 
              textDecoration: 'none', 
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            Ver todas
            <ArrowUpRight size={14} />
          </Link>
        </div>
        
        {recentSolicitudes.length === 0 ? (
          <div style={{ padding: '48px', textAlign: 'center' }}>
            <div style={{
              width: '64px',
              height: '64px',
              background: '#f1f5f9',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <CalendarCheck size={28} style={{ color: '#94a3b8' }} />
            </div>
            <p style={{ color: '#475569', fontWeight: 500, margin: 0 }}>No hay solicitudes aún</p>
            <p style={{ fontSize: '14px', color: '#94a3b8', marginTop: '4px' }}>Las nuevas solicitudes aparecerán aquí</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Cliente</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Tipo</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estado</th>
                  <th style={{ padding: '12px 16px', textAlign: 'left', fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Fecha</th>
                  <th style={{ padding: '12px 16px', width: '50px' }}></th>
                </tr>
              </thead>
              <tbody>
                {recentSolicitudes.map((solicitud) => {
                  const badge = getEstadoBadge(solicitud.estado)
                  return (
                    <tr key={solicitud.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                      <td style={{ padding: '14px 16px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: solicitud.tipo === 'visita' ? '#dbeafe' : '#d1fae5',
                            color: solicitud.tipo === 'visita' ? '#1d4ed8' : '#059669',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 600,
                            fontSize: '14px'
                          }}>
                            {solicitud.nombre.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <p style={{ fontWeight: 500, color: '#1e293b', margin: 0, fontSize: '14px' }}>{solicitud.nombre}</p>
                            <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{solicitud.email}</p>
                          </div>
                        </div>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{ 
                          display: 'inline-flex', 
                          alignItems: 'center', 
                          gap: '6px',
                          fontSize: '14px',
                          color: solicitud.tipo === 'visita' ? '#1d4ed8' : '#059669'
                        }}>
                          {solicitud.tipo === 'visita' ? <CalendarCheck size={14} /> : <FileText size={14} />}
                          {solicitud.tipo === 'visita' ? 'Visita' : 'Presupuesto'}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <span style={{
                          display: 'inline-block',
                          padding: '4px 10px',
                          borderRadius: '9999px',
                          fontSize: '12px',
                          fontWeight: 500,
                          background: badge.bg,
                          color: badge.color
                        }}>
                          {getEstadoLabel(solicitud.estado)}
                        </span>
                      </td>
                      <td style={{ padding: '14px 16px', color: '#64748b', fontSize: '14px' }}>
                        {new Date(solicitud.createdAt).toLocaleDateString('es-AR', {
                          day: '2-digit',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td style={{ padding: '14px 16px' }}>
                        <Link 
                          href={`/admin/${solicitud.tipo === 'visita' ? 'visitas' : 'presupuestos'}`}
                          style={{
                            display: 'inline-flex',
                            padding: '6px',
                            borderRadius: '6px',
                            color: '#94a3b8',
                            textDecoration: 'none'
                          }}
                        >
                          <Eye size={16} />
                        </Link>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Quick Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 600, color: '#1e293b', margin: 0, fontSize: '16px' }}>Tasa de Conversión</h3>
            <TrendingUp size={18} style={{ color: '#10b981' }} />
          </div>
          <p style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px 0' }}>
            {Math.round((stats.completados / (stats.totalVisitas + stats.totalPresupuestos)) * 100) || 0}%
          </p>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Solicitudes completadas</p>
          <div style={{ marginTop: '16px', height: '8px', background: '#f1f5f9', borderRadius: '4px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              background: 'linear-gradient(90deg, #10b981, #059669)',
              borderRadius: '4px',
              width: `${Math.round((stats.completados / (stats.totalVisitas + stats.totalPresupuestos)) * 100) || 0}%`,
              transition: 'width 0.5s ease'
            }}></div>
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 600, color: '#1e293b', margin: 0, fontSize: '16px' }}>En Proceso</h3>
            <Clock size={18} style={{ color: '#3b82f6' }} />
          </div>
          <p style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px 0' }}>{stats.enProceso}</p>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Solicitudes activas</p>
          <div style={{ marginTop: '16px', display: 'flex', gap: '4px' }}>
            {[...Array(5)].map((_, i) => (
              <div 
                key={i}
                style={{
                  flex: 1,
                  height: '8px',
                  borderRadius: '4px',
                  background: i < stats.enProceso ? '#3b82f6' : '#f1f5f9'
                }}
              ></div>
            ))}
          </div>
        </div>

        <div style={{
          background: 'white',
          borderRadius: '12px',
          border: '1px solid #e2e8f0',
          padding: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 600, color: '#1e293b', margin: 0, fontSize: '16px' }}>Pendientes</h3>
            <Clock size={18} style={{ color: '#f59e0b' }} />
          </div>
          <p style={{ fontSize: '32px', fontWeight: 700, color: '#1e293b', margin: '0 0 4px 0' }}>{stats.pendientes}</p>
          <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>Requieren atención</p>
          {stats.pendientes > 0 && (
            <Link 
              href="/admin/visitas?estado=PENDIENTE"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                marginTop: '16px',
                fontSize: '14px',
                color: '#f59e0b',
                textDecoration: 'none',
                fontWeight: 500
              }}
            >
              Revisar ahora
              <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
