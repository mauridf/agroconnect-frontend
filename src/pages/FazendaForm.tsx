import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  cadastrarFazenda,
  atualizarFazenda,
  obterFazendaPorId
} from '../services/fazendaService'
import { getProdutores } from '../services/produtorService'
import { buscarEnderecoPorCEP } from '../services/cepService'
import { UFs } from '../utils/ufs'

interface Endereco {
  logradouro: string
  cidade: string
  uf: string
  cep: string
}

interface Fazenda {
  id?: string
  produtorId: string
  nome: string
  cnpj: string
  endereco: Endereco
  usarEnderecoProdutor: boolean
  areaTotalHectares: string
  areaAgricultavelHectares: string
  areaVegetacaoHectares: string
  areaConstruidaHectares: string
}

interface Produtor {
  id: string
  nome: string
}

export default function FazendaForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [produtores, setProdutores] = useState<Produtor[]>([])
  const [erro, setErro] = useState('')
  const [formData, setFormData] = useState<Fazenda>({
    produtorId: '',
    nome: '',
    cnpj: '',
    endereco: { logradouro: '', cidade: '', uf: '', cep: '' },
    usarEnderecoProdutor: false,
    areaTotalHectares: '',
    areaAgricultavelHectares: '',
    areaVegetacaoHectares: '',
    areaConstruidaHectares: ''
  })

  useEffect(() => {
    const carregarProdutores = async () => {
      try {
        const lista = await getProdutores()
        if (lista.length === 0) {
          setErro('Nenhum produtor rural encontrado. Cadastre um produtor antes.')
        } else {
          setProdutores(lista)
        }
      } catch {
        setErro('Erro ao carregar produtores.')
      }
    }

    carregarProdutores()

    if (id) {
      obterFazendaPorId(id)
        .then(data =>
          setFormData({
            ...data,
            areaTotalHectares: String(data.areaTotalHectares ?? ''),
            areaAgricultavelHectares: String(data.areaAgricultavelHectares ?? ''),
            areaVegetacaoHectares: String(data.areaVegetacaoHectares ?? ''),
            areaConstruidaHectares: String(data.areaConstruidaHectares ?? '')
          })
        )
        .catch(() => setErro('Erro ao carregar dados da fazenda.'))
    }
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target

    if (type === 'checkbox' && name === 'usarEnderecoProdutor') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({
        ...prev,
        usarEnderecoProdutor: checked,
        endereco: checked ? { logradouro: '', cidade: '', uf: '', cep: '' } : prev.endereco
      }))
    } else if (name in formData.endereco) {
      setFormData(prev => ({
        ...prev,
        endereco: { ...prev.endereco, [name]: value }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleCEPBlur = async () => {
    const cep = formData.endereco.cep.replace(/\D/g, '')
    if (cep.length === 8 && !formData.usarEnderecoProdutor) {
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
      const payload = {
        ...formData,
        areaTotalHectares: parseFloat(formData.areaTotalHectares) || 0,
        areaAgricultavelHectares: parseFloat(formData.areaAgricultavelHectares) || 0,
        areaVegetacaoHectares: parseFloat(formData.areaVegetacaoHectares) || 0,
        areaConstruidaHectares: parseFloat(formData.areaConstruidaHectares) || 0
      }

      if (id) {
        await atualizarFazenda({ ...payload, id })
      } else {
        await cadastrarFazenda(payload)
      }
      navigate('/fazenda')
    } catch {
      setErro('Erro ao salvar dados. Verifique as informações e tente novamente.')
    }
  }

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#276749', marginBottom: '1rem' }}>
        {id ? 'Editar Fazenda' : 'Cadastrar Fazenda'}
      </h2>
      {erro && <p style={{ color: 'red' }}>{erro}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <select name="produtorId" value={formData.produtorId} onChange={handleChange} required>
          <option value="">Selecione o Produtor</option>
          {produtores.map(p => (
            <option key={p.id} value={p.id}>{p.nome}</option>
          ))}
        </select>

        <input
          name="nome"
          placeholder="Nome da Fazenda"
          value={formData.nome}
          onChange={handleChange}
          required
        />

        <input
          name="cnpj"
          placeholder="CNPJ"
          value={formData.cnpj}
          onChange={handleChange}
          required
        />

        <label>
          <input
            type="checkbox"
            name="usarEnderecoProdutor"
            checked={formData.usarEnderecoProdutor}
            onChange={handleChange}
          />
          Mesmo Endereço do Produtor
        </label>

        {!formData.usarEnderecoProdutor && (
          <>
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
          </>
        )}

        <label>
          Área Total (ha):
          <input
            name="areaTotalHectares"
            type="number"
            placeholder="Área Total"
            value={formData.areaTotalHectares}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Área Agricultável (ha):
          <input
            name="areaAgricultavelHectares"
            type="number"
            placeholder="Área Agricultável"
            value={formData.areaAgricultavelHectares}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Área de Vegetação (ha):
          <input
            name="areaVegetacaoHectares"
            type="number"
            placeholder="Área de Vegetação"
            value={formData.areaVegetacaoHectares}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Área Construída (ha):
          <input
            name="areaConstruidaHectares"
            type="number"
            placeholder="Área Construída"
            value={formData.areaConstruidaHectares}
            onChange={handleChange}
            required
          />
        </label>

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
