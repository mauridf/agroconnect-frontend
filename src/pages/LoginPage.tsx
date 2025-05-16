import { useState } from 'react'
import { User, Lock } from 'lucide-react'
import { login } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'

export default function LoginPage() {
  const [nomeUsuario, setNomeUsuario] = useState('')
  const [senha, setSenha] = useState('')
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
        const result = await login(nomeUsuario, senha)
        console.log('Token recebido:', result.token)
        navigate('/dashboard')
    } catch (err) {
        console.error('Erro no login', err)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(to bottom right, #48bb78, #2f855a)',
      padding: '1rem'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        padding: '2rem',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        width: '100%',
        maxWidth: '28rem',
        border: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{
            fontSize: '2.25rem',
            fontWeight: '700',
            background: 'linear-gradient(to right, #25855a, #2c7a7b)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}>
            AgroConnect
          </h2>
          <p style={{ color: '#4a5568', marginTop: '0.5rem' }}>Acesse sua conta para continuar</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Campo Usuário */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Usuário</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #e5e7eb',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              transition: 'all 0.2s'
            }}>
              <User style={{ color: '#25855a', marginRight: '0.5rem' }} size={20} />
              <input
                type="text"
                placeholder="Digite seu usuário"
                value={nomeUsuario}
                onChange={(e) => setNomeUsuario(e.target.value)}
                style={{
                  width: '100%',
                  outline: 'none',
                  background: 'transparent',
                  color: '#374151'
                }}
                required
              />
            </div>
          </div>

          {/* Campo Senha */}
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', color: '#374151', marginBottom: '0.5rem' }}>Senha</label>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              border: '2px solid #e5e7eb',
              borderRadius: '0.75rem',
              padding: '0.75rem 1rem',
              transition: 'all 0.2s'
            }}>
              <Lock style={{ color: '#25855a', marginRight: '0.5rem' }} size={20} />
              <input
                type="password"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                style={{
                  width: '100%',
                  outline: 'none',
                  background: 'transparent',
                  color: '#374151'
                }}
                required
              />
            </div>
          </div>

          {/* Botão */}
          <button
            type="submit"
            style={{
              width: '100%',
              background: 'linear-gradient(to right, #48bb78, #38a169)',
              color: 'white',
              padding: '0.75rem',
              borderRadius: '0.75rem',
              fontWeight: '500',
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
              transition: 'all 0.3s'
            }}
          >
            Entrar
          </button>
        </form>

        {/* Links extras */}
        <div style={{ marginTop: '2rem', paddingTop: '1.25rem', borderTop: '1px solid rgba(229, 231, 235, 0.5)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', fontSize: '0.875rem' }}>
            <Link 
              to="/register"
              style={{
                color: '#25855a',
                transition: 'color 0.2s',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem',
                textDecoration: 'none'
              }}
            >
            Criar uma conta
            </Link>
            <a 
              href="#" 
              style={{
                color: '#25855a',
                transition: 'color 0.2s',
                padding: '0.25rem 0.5rem',
                borderRadius: '0.375rem'
              }}
            >
              Recuperar senha
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}