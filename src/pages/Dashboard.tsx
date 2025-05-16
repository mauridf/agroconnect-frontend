import { useEffect, useState } from 'react'
import {
  getTotalFazendas,
  getTotalFazendasPorUF,
  getTotalHectares,
  getTotalHectaresPorUF,
  getTotalHectaresAgricultavel,
  getTotalHectaresAgricultavelPorUF,
  getTotalProdutores,
  getTotalProdutoresPorUF,
  getTotalCulturasPlantadas,
  getTotalCulturasPlantadasPorCultura,
  getTotalCulturasPlantadasPorUF,
  getTotalCulturasPlantadasPorCategoria
} from '../services/dashboardService'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const colors = ['#48bb78', '#38a169', '#2f855a', '#276749', '#22543d']

const categoriasMap: Record<number, string> = {
  1: 'Grãos/Cereais',
  2: 'Café',
  3: 'Frutas',
  4: 'Hortaliças',
  5: 'Florestal',
  6: 'Canas Energéticas'
}

type CategoriaItem = {
  categoria: number
  quantidade: number
  areaTotal: number
  categoriaNome?: string
}

export default function Dashboard() {
  const [cards, setCards] = useState({
    fazendas: 0,
    hectares: 0,
    hectaresAgricultaveis: 0,
    produtores: 0,
    culturas: 0
  })
  const [fazendasPorUf, setFazendasPorUf] = useState([])
  const [hectaresPorUf, setHectaresPorUf] = useState([])
  const [hectaresAgricultaveisPorUf, setHectaresAgricultaveisPorUf] = useState([])
  const [produtoresPorUf, setProdutoresPorUf] = useState([])
  const [culturasPorCultura, setCulturasPorCultura] = useState([])
  const [culturasPorUf, setCulturasPorUf] = useState([])
  const [culturasPorCategoria, setCulturasPorCategoria] = useState<CategoriaItem[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const [
        { data: fazendas },
        { data: hectares },
        { data: hectaresAgri },
        { data: produtores },
        { data: culturas }
      ] = await Promise.all([
        getTotalFazendas(),
        getTotalHectares(),
        getTotalHectaresAgricultavel(),
        getTotalProdutores(),
        getTotalCulturasPlantadas()
      ])

      setCards({
        fazendas,
        hectares,
        hectaresAgricultaveis: hectaresAgri,
        produtores,
        culturas
      })

      const [
        { data: fazUf },
        { data: hectUf },
        { data: hectAgriUf },
        { data: prodUf },
        { data: cultCultura },
        { data: cultUf },
        { data: cultCategoria }
      ] = await Promise.all([
        getTotalFazendasPorUF(),
        getTotalHectaresPorUF(),
        getTotalHectaresAgricultavelPorUF(),
        getTotalProdutoresPorUF(),
        getTotalCulturasPlantadasPorCultura(),
        getTotalCulturasPlantadasPorUF(),
        getTotalCulturasPlantadasPorCategoria()
      ])

      setFazendasPorUf(fazUf)
      setHectaresPorUf(hectUf)
      setHectaresAgricultaveisPorUf(hectAgriUf)
      setProdutoresPorUf(prodUf)
      setCulturasPorCultura(cultCultura)
      setCulturasPorUf(cultUf)
      setCulturasPorCategoria(cultCategoria)
    }

    fetchData()
  }, [])

  // Aqui cria o array com nome da categoria, usando o estado atualizado
  const categoriasComNome = culturasPorCategoria.map((item: CategoriaItem) => ({
    ...item,
    categoriaNome: categoriasMap[item.categoria] || 'Desconhecido'
  }))

  const renderCard = (label: string, value: number) => (
    <div
      style={{
        background: 'white',
        padding: '1.5rem',
        borderRadius: '1rem',
        boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
        flex: 1,
        minWidth: '200px'
      }}
    >
      <div style={{ fontSize: '1rem', color: '#4a5568' }}>{label}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: 'bold', color: '#2f855a' }}>{value}</div>
    </div>
  )

  const renderChartTitle = (title: string) => (
    <h3 style={{ margin: '1rem 0', fontSize: '1.25rem', color: '#2f855a' }}>{title}</h3>
  )

  return (
    <div style={{ padding: '2rem', background: '#f7fafc' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2f855a', marginBottom: '2rem' }}>Dashboard</h1>

      {/* Cards */}
      <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        {renderCard('Fazendas', cards.fazendas)}
        {renderCard('Hectares', cards.hectares)}
        {renderCard('Hectares Agricultáveis', cards.hectaresAgricultaveis)}
        {renderCard('Produtores', cards.produtores)}
        {renderCard('Culturas', cards.culturas)}
      </div>

      {/* Gráficos */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        <div>
          {renderChartTitle('Fazendas por UF')}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={fazendasPorUf}>
              <XAxis dataKey="uf" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill="#48bb78" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          {renderChartTitle('Produtores por UF')}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={produtoresPorUf}>
              <XAxis dataKey="uf" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="quantidade" fill="#2f855a" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          {renderChartTitle('Culturas por Cultura')}
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={culturasPorCultura} dataKey="quantidade" nameKey="culturaNome" outerRadius={100}>
                {culturasPorCultura.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div>
        {renderChartTitle('Culturas por Categoria')}
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoriasComNome}>
            <XAxis dataKey="categoriaNome" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="quantidade" fill="#276749" />
            </BarChart>
        </ResponsiveContainer>
        </div>


        <div>
          {renderChartTitle('Hectares por UF')}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hectaresPorUf}>
              <XAxis dataKey="uf" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hectares" fill="#68d391" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          {renderChartTitle('Hectares Agricultáveis por UF')}
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={hectaresAgricultaveisPorUf}>
              <XAxis dataKey="uf" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hectares" fill="#38a169" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
