import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { register } from '../services/authService'

export default function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    nomeUsuario: '',
    email: '',
    senha: '',
    tipoUsuario: '3' // Default para "Produtor"
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register({
        ...formData,
        emailConfirmado: false,
        tipoUsuario: parseInt(formData.tipoUsuario)
      })
      navigate('/') // Redireciona para Login
    } catch (err) {
      setError('Erro ao cadastrar. Verifique os dados e tente novamente.')
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f7fafc' }}>
      <form onSubmit={handleSubmit} style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '1rem',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', color: '#2f855a', textAlign: 'center' }}>Criar Conta</h2>

        {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#4a5568' }}>Nome de Usuário</label>
          <input
            type="text"
            name="nomeUsuario"
            value={formData.nomeUsuario}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#4a5568' }}>E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label style={{ color: '#4a5568' }}>Senha</label>
          <input
            type="password"
            name="senha"
            value={formData.senha}
            onChange={handleChange}
            required
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ color: '#4a5568' }}>Tipo de Usuário</label>
          <select
            name="tipoUsuario"
            value={formData.tipoUsuario}
            onChange={handleChange}
            required
            style={{ ...inputStyle, padding: '0.5rem' }}
          >
            <option value="1">Admin</option>
            <option value="2">Atendente</option>
            <option value="3">Produtor</option>
          </select>
        </div>

        <button type="submit" style={{
          background: '#2f855a',
          color: 'white',
          padding: '0.75rem',
          width: '100%',
          border: 'none',
          borderRadius: '0.5rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          Salvar
        </button>
      </form>
    </div>
  )
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.5rem',
  border: '1px solid #cbd5e0',
  borderRadius: '0.5rem',
  marginTop: '0.25rem'
}