import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getFazendas, deleteFazenda } from '../services/fazendaService'
import TabelaComBusca from '../components/TabelaComBusca'

interface Endereco {
  logradouro: string
  cidade: string
  uf: string
  cep: string
}

interface Cultura {
  id: string
  nome: string
  categoria: number
  areaUtilizadaHectares: number
}

interface Fazenda {
  id: string
  produtorId: string
  nome: string
  cnpj: string
  endereco: Endereco
  areaTotalHectares: number
  areaAgricultavelHectares: number
  areaVegetacaoHectares: number
  areaConstruidaHectares: number
  dataCriacao: string
  dataAtualizacao: string | null
  culturas: Cultura[]
}

export default function Fazenda() {
  const [fazendas, setFazendas] = useState<Fazenda[]>([])
  const navigate = useNavigate()

  const carregarDados = async () => {
    const dados = await getFazendas()
    setFazendas(dados)
  }

  const handleDelete = async (item: Fazenda) => {
    const confirm = window.confirm(`Deseja realmente deletar a fazenda ${item.nome}?`)
    if (confirm) {
      await deleteFazenda(item.id)
      carregarDados()
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#276749' }}>Fazendas</h2>
        <button
          onClick={() => navigate('/fazenda/cadastro')}
          style={{
            background: '#276749',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Cadastrar Nova
        </button>
      </div>

      {fazendas.length === 0 ? (
        <p style={{ color: '#4a5568' }}>Nenhuma Fazenda Cadastrada</p>
      ) : (
        <TabelaComBusca
          colunas={[
            { chave: 'nome', rotulo: 'Nome' },
            { chave: 'cnpj', rotulo: 'CNPJ' },
            { chave: 'uf', rotulo: 'UF' },
            { chave: 'areaTotalHectares', rotulo: 'Área Total (ha)' },
            { chave: 'areaAgricultavelHectares', rotulo: 'Agricultável (ha)' },
            { chave: 'areaVegetacaoHectares', rotulo: 'Vegetação (ha)' },
            { chave: 'areaConstruidaHectares', rotulo: 'Construída (ha)' }
          ]}
          dados={fazendas.map(f => ({
            ...f,
            uf: f.endereco.uf
          }))}
          onEditar={(item) => navigate(`/fazenda/editar/${item.id}`)}
          onDeletar={handleDelete}
        />
      )}
    </div>
  )
}
