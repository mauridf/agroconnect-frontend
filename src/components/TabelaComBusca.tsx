import React, { useState } from 'react'

interface Coluna {
  chave: string
  rotulo: string
}

interface TabelaProps {
  colunas: Coluna[]
  dados: any[]
  onEditar?: (item: any) => void
  onDeletar?: (item: any) => void
}

export default function TabelaComBusca({ colunas, dados, onEditar, onDeletar }: TabelaProps) {
  const [busca, setBusca] = useState('')
  const [paginaAtual, setPaginaAtual] = useState(1)
  const itensPorPagina = 5

  const dadosFiltrados = dados.filter(item =>
    colunas.some(col => (item[col.chave] || '').toLowerCase().includes(busca.toLowerCase()))
  )

  const inicio = (paginaAtual - 1) * itensPorPagina
  const fim = inicio + itensPorPagina
  const pagina = dadosFiltrados.slice(inicio, fim)
  const totalPaginas = Math.ceil(dadosFiltrados.length / itensPorPagina)

  return (
    <div>
      <input
        placeholder="Buscar..."
        value={busca}
        onChange={(e) => {
          setBusca(e.target.value)
          setPaginaAtual(1)
        }}
        style={{
          padding: '0.5rem',
          marginBottom: '1rem',
          borderRadius: '0.375rem',
          border: '1px solid #ccc',
          width: '100%'
        }}
      />
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {colunas.map(col => (
              <th key={col.chave} style={{ padding: '0.5rem', background: '#276749', color: 'white' }}>
                {col.rotulo}
              </th>
            ))}
            {(onEditar || onDeletar) && <th style={{ background: '#276749', color: 'white' }}>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {pagina.map((item, index) => (
            <tr key={index}>
              {colunas.map(col => (
                <td key={col.chave} style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
                  {item[col.chave]}
                </td>
              ))}
              {(onEditar || onDeletar) && (
                <td style={{ padding: '0.5rem', borderBottom: '1px solid #ccc' }}>
                  {onEditar && <button onClick={() => onEditar(item)} style={{ marginRight: '0.5rem' }}>✏️</button>}
                  {onDeletar && <button onClick={() => onDeletar(item)}>🗑️</button>}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1rem', textAlign: 'center' }}>
        {Array.from({ length: totalPaginas }, (_, i) => (
          <button
            key={i}
            onClick={() => setPaginaAtual(i + 1)}
            style={{
              margin: '0 0.25rem',
              padding: '0.25rem 0.5rem',
              background: paginaAtual === i + 1 ? '#276749' : '#e2e8f0',
              color: paginaAtual === i + 1 ? 'white' : '#1a202c',
              borderRadius: '0.25rem',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
