import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function Sidebar() {
  const navigate = useNavigate()
  const [userInfo, setUserInfo] = useState({
    nomeUsuario: '',
    email: '',
    tipoUsuario: ''
  })

  useEffect(() => {
    const nomeUsuario = localStorage.getItem('nomeUsuario') || ''
    const email = localStorage.getItem('email') || ''
    const tipo = localStorage.getItem('tipoUsuario') || ''

    const tipoUsuarioMap: Record<string, string> = {
      '1': 'Admin',
      '2': 'Atendente',
      '3': 'Produtor'
    }

    setUserInfo({
      nomeUsuario,
      email,
      tipoUsuario: tipoUsuarioMap[tipo] || 'Desconhecido'
    })
  }, [])

  const handleLogout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div style={{
      width: '16rem',
      height: '100vh',
      background: 'linear-gradient(to bottom, #2f855a, #276749)',
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      padding: '2rem',
      boxShadow: '4px 0 12px rgba(0, 0, 0, 0.1)'
    }}>
      <h2 style={{
        fontSize: '1.75rem',
        fontWeight: 'bold',
        marginBottom: '1rem'
      }}>
        AgroConnect
      </h2>

      {/* Informações do usuário */}
      <div style={{ marginBottom: '2rem', fontSize: '0.9rem' }}>
        <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '0.5rem' }}>👤</span>
          {userInfo.nomeUsuario}
        </div>
        <div style={{ marginBottom: '0.5rem', display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '0.5rem' }}>🔑</span>
          {userInfo.tipoUsuario}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: '0.5rem' }}>📧</span>
          {userInfo.email}
        </div>
      </div>

      <nav style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <Link to="/dashboard" style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          color: 'white',
          background: 'rgba(255, 255, 255, 0.1)'
        }}>
          Dashboard
        </Link>
        <Link to="/cultura" style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          color: 'white',
          background: 'rgba(255, 255, 255, 0.1)'
        }}>
          Cultura
        </Link>
         <Link to="/produtor" style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          color: 'white',
          background: 'rgba(255, 255, 255, 0.1)'
        }}>
          Produtor Rural
        </Link>
        <Link to="/fazenda" style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          color: 'white',
          background: 'rgba(255, 255, 255, 0.1)'
        }}>
          Fazenda
        </Link>
        <Link to="/fazendacultura" style={{
          padding: '0.75rem 1rem',
          borderRadius: '0.5rem',
          textDecoration: 'none',
          color: 'white',
          background: 'rgba(255, 255, 255, 0.1)'
        }}>
          Relacionar Cultura a Fazenda
        </Link>
        <button
          onClick={handleLogout}
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '0.5rem',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: 'white',
            cursor: 'pointer',
            textAlign: 'left'
          }}
        >
          Logout
        </button>
      </nav>
    </div>
  )
}