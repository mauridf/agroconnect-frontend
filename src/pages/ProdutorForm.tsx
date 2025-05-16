import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  cadastrarProdutor,
  atualizarProdutor,
  obterProdutorPorId
} from '../services/produtorService'
import { buscarEnderecoPorCEP } from '../services/cepService'
import { UFs } from '../utils/ufs'

interface Endereco {
  logradouro: string
  cidade: string
  uf: string
  cep: string
}

interface Produtor {
  id?: string
  nome: string
  cpf: string
  email: string
  telefone: string
  endereco: Endereco
}

export default function ProdutorForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [formData, setFormData] = useState<Produtor>({
    nome: '',
    cpf: '',
    email: '',
    telefone: '',
    endereco: {
      logradouro: '',
      cidade: '',
      uf: '',
      cep: ''
    }
  })
  const [erro, setErro] = useState('')

  useEffect(() => {
    if (id) {
      obterProdutorPorId(id)
        .then(setFormData)
        .catch(() => setErro('Erro ao carregar dados do produtor.'))
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    if (name in formData.endereco) {
      setFormData(prev => ({
        ...prev,
        endereco: { ...prev.endereco, [name]: value }
      }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleCEPBlur = async () => {
    const cep = formData.endereco.cep.replace(/\D/g, '')
    if (cep.length === 8) {
      try {
        const dados = await buscarEnderecoPorCEP(cep)
        setFormData(prev => ({
          ...prev,
          endereco: {
            ...prev.endereco,
            logradouro: dados.logradouro || '',
            cidade: dados.localidade || '',
            uf: dados.uf || ''
          }
        }))
      } catch {
        setErro('CEP não encontrado.')
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (id) {
        await atualizarProdutor({ ...formData, id })
      } else {
        await cadastrarProdutor(formData)
      }
      navigate('/produtor')
    } catch {
      setErro('Erro ao salvar dados. Verifique as informações e tente novamente.')
    }
  }

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#276749', marginBottom: '1rem' }}>
        {id ? 'Editar Produtor Rural' : 'Cadastrar Produtor Rural'}
      </h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <input
          name="nome"
          placeholder="Nome"
          value={formData.nome}
          onChange={handleChange}
          required
        />
        <input
          name="cpf"
          placeholder="CPF"
          value={formData.cpf}
          onChange={handleChange}
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          name="telefone"
          placeholder="Telefone"
          value={formData.telefone}
          onChange={handleChange}
          required
        />
        <input
          name="cep"
          placeholder="CEP"
          value={formData.endereco.cep}
          onChange={handleChange}
          onBlur={handleCEPBlur}
          required
        />
        <input
          name="logradouro"
          placeholder="Logradouro"
          value={formData.endereco.logradouro}
          onChange={handleChange}
          required
        />
        <input
          name="cidade"
          placeholder="Cidade"
          value={formData.endereco.cidade}
          onChange={handleChange}
          required
        />
        <select
          name="uf"
          value={formData.endereco.uf}
          onChange={handleChange}
          required
        >
          <option value="">Selecione o UF</option>
          {UFs.map(uf => (
            <option key={uf} value={uf}>{uf}</option>
          ))}
        </select>
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
