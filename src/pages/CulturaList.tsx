import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getCulturas, deletarCultura } from '../services/culturaService'
import { CategoriaCultura, ExigenciaClimatica } from '../utils/enums'
import TabelaComBusca from '../components/TabelaComBusca'

interface Cultura {
  id: string
  nome: string
  categoria: number
  tempoColheita: string
  exigenciaClimatica: number
  detalhes: string
  dataCriacao: string
}

export default function CulturaList() {
  const [culturas, setCulturas] = useState<Cultura[]>([])
  const navigate = useNavigate()

  const carregarCulturas = async () => {
    try {
      const lista = await getCulturas()
      setCulturas(lista)
    } catch {
      alert('Erro ao carregar culturas.')
    }
  }

  const handleDelete = async (item: Cultura) => {
    const confirmacao = window.confirm(`Deseja realmente deletar a cultura ${item.nome}?`)
    if (confirmacao) {
      await deletarCultura(item.id)
      carregarCulturas()
    }
  }

  useEffect(() => {
    carregarCulturas()
  }, [])

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#276749' }}>Culturas</h2>
        <button
          onClick={() => navigate('/cultura/nova')}
          style={{
            background: '#276749',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Nova Cultura
        </button>
      </div>

      {culturas.length === 0 ? (
        <p style={{ color: '#4a5568' }}>Nenhuma Cultura Cadastrada</p>
      ) : (
        <TabelaComBusca
          colunas={[
            { chave: 'nome', rotulo: 'Nome' },
            { chave: 'categoriaNome', rotulo: 'Categoria' },
            { chave: 'tempoColheita', rotulo: 'Tempo de Colheita' },
            { chave: 'exigenciaNome', rotulo: 'Exigência Climática' }
          ]}
          dados={culturas.map(c => ({
            ...c,
            categoriaNome: CategoriaCultura[c.categoria],
            exigenciaNome: ExigenciaClimatica[c.exigenciaClimatica]
          }))}
          onEditar={(item) => navigate(`/cultura/editar/${item.id}`)}
          onDeletar={handleDelete}
        />
      )}
    </div>
  )
}
