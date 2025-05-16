import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { CategoriaCultura, ExigenciaClimatica } from '../utils/enums'
import {
  cadastrarCultura,
  atualizarCultura,
  getCulturaPorId
} from '../services/culturaService'

interface Cultura {
  id?: string
  nome: string
  categoria: number
  tempoColheita: string
  exigenciaClimatica: number
  detalhes: string
}

export default function CulturaForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [erro, setErro] = useState('')
  const [formData, setFormData] = useState<Cultura>({
    nome: '',
    categoria: 1,
    tempoColheita: '',
    exigenciaClimatica: 1,
    detalhes: ''
  })

  useEffect(() => {
    if (id) {
      getCulturaPorId(id)
        .then(data => setFormData(data))
        .catch(() => setErro('Erro ao carregar dados da cultura.'))
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: name === 'categoria' || name === 'exigenciaClimatica' ? parseInt(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id) {
        await atualizarCultura({ ...formData, id })
      } else {
        await cadastrarCultura(formData)
      }
      navigate('/cultura')
    } catch {
      setErro('Erro ao salvar dados. Verifique as informações e tente novamente.')
    }
  }

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#276749', marginBottom: '1rem' }}>
        {id ? 'Editar Cultura' : 'Cadastrar Cultura'}
      </h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          name="nome"
          placeholder="Nome da Cultura"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <select
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a Categoria</option>
          {Object.entries(CategoriaCultura).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>

        <input
          name="tempoColheita"
          placeholder="Tempo de Colheita (ex: 90 dias)"
          value={formData.tempoColheita}
          onChange={handleChange}
          required
        />

        <select
          name="exigenciaClimatica"
          value={formData.exigenciaClimatica}
          onChange={handleChange}
          required
        >
          <option value="">Selecione a Exigência Climática</option>
          {Object.entries(ExigenciaClimatica).map(([key, value]) => (
            <option key={key} value={key}>{value}</option>
          ))}
        </select>

        <textarea
          name="detalhes"
          placeholder="Detalhes adicionais"
          value={formData.detalhes}
          onChange={handleChange}
          rows={4}
          required
        />

        <button
          type="submit"
          style={{
            background: '#276749',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Salvar
        </button>
      </form>
    </div>
  )
}
