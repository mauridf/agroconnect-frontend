import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getProdutores, deleteProdutor } from '../services/produtorService'
import TabelaComBusca from '../components/TabelaComBusca'

interface Endereco {
  logradouro: string
  cidade: string
  uf: string
  cep: string
}

interface Produtor {
  id: string
  nome: string
  cpf: string
  email: string
  telefone: string
  endereco: Endereco
  dataCriacao: string
  dataAtualizacao: string
}

export default function ProdutorRural() {
  const [produtores, setProdutores] = useState<Produtor[]>([])
  const navigate = useNavigate()

  const carregarDados = async () => {
    const dados = await getProdutores()
    setProdutores(dados)
  }

  const handleDelete = async (item: Produtor) => {
    const confirm = window.confirm(`Deseja realmente deletar o produtor ${item.nome}?`)
    if (confirm) {
      await deleteProdutor(item.id)
      carregarDados()
    }
  }

  useEffect(() => {
    carregarDados()
  }, [])

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <h2 style={{ fontSize: '1.5rem', color: '#276749' }}>Produtores Rurais</h2>
        <button
          onClick={() => navigate('/produtor/cadastro')}
          style={{
            background: '#276749',
            color: 'white',
            padding: '0.5rem 1rem',
            border: 'none',
            borderRadius: '0.375rem',
            cursor: 'pointer'
          }}
        >
          Cadastrar Novo
        </button>
      </div>

      {produtores.length === 0 ? (
        <p style={{ color: '#4a5568' }}>Nenhum Produtor Rural Cadastrado</p>
      ) : (
        <TabelaComBusca
          colunas={[
            { chave: 'nome', rotulo: 'Nome' },
            { chave: 'cpf', rotulo: 'CPF' },
            { chave: 'email', rotulo: 'Email' },
            { chave: 'telefone', rotulo: 'Telefone' },
            { chave: 'uf', rotulo: 'UF' }
          ]}
          dados={produtores.map(p => ({
            ...p,
            uf: p.endereco.uf // Adiciona a chave uf manualmente
          }))}
          onEditar={(item) => navigate(`/produtor/editar/${item.id}`)}
          onDeletar={handleDelete}
        />
      )}
    </div>
  )
}
