import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getFazendas } from '../services/fazendaService';
import { getCulturas } from '../services/culturaService';
import {
  associarCulturaFazenda,
  deletarCulturaFazenda,
  getCulturaFazendaByFazendaId
} from '../services/fazendaculturaService';
import TabelaComBusca from '../components/TabelaComBusca';

interface Fazenda {
  id: string;
  nome: string;
}

interface Cultura {
  id: string;
  nome: string;
}

interface CulturaFazenda {
  id: string;
  fazendaId: string;
  culturaId: string;
  cultura?: Cultura;
  areaUtilizadaHectares: number;
}

export default function CulturaFazendaPage() {
  const [fazendas, setFazendas] = useState<Fazenda[]>([]);
  const [culturas, setCulturas] = useState<Cultura[]>([]);
  const [relacionadas, setRelacionadas] = useState<CulturaFazenda[]>([]);
  const [fazendaSelecionada, setFazendaSelecionada] = useState('');
  const [culturaSelecionada, setCulturaSelecionada] = useState('');
  const [areaUtilizada, setAreaUtilizada] = useState<number>(0);

  const navigate = useNavigate();

  useEffect(() => {
    carregarFazendas();
    carregarCulturas();
  }, []);

  useEffect(() => {
    if (fazendaSelecionada) {
      carregarRelacionadas(fazendaSelecionada);
    } else {
      setRelacionadas([]);
    }
  }, [fazendaSelecionada]);

  const carregarFazendas = async () => {
    const data = await getFazendas();
    setFazendas(data);
  };

  const carregarCulturas = async () => {
    const data = await getCulturas();
    setCulturas(data);
  };

  const carregarRelacionadas = async (fazendaId: string) => {
    const data = await getCulturaFazendaByFazendaId(fazendaId);
    setRelacionadas(data);
  };

  const handleRelacionar = async () => {
    await associarCulturaFazenda({
      fazendaId: fazendaSelecionada,
      culturaId: culturaSelecionada,
      areaUtilizadaHectares: areaUtilizada
    });
    setCulturaSelecionada('');
    setAreaUtilizada(0);
    carregarRelacionadas(fazendaSelecionada);
  };

  const handleDeletar = async (item: CulturaFazenda) => {
    const confirmacao = window.confirm(`Deseja remover a cultura ${item.cultura?.nome}?`);
    if (confirmacao) {
      await deletarCulturaFazenda(item.id);
      carregarRelacionadas(fazendaSelecionada);
    }
  };

  return (
    <div style={{ padding: '2rem', width: '100%' }}>
      <h2 style={{ fontSize: '1.5rem', color: '#276749', marginBottom: '1rem' }}>
        Relacionar Culturas com Fazenda
      </h2>

      <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem' }}>
        <select
          value={fazendaSelecionada}
          onChange={(e) => setFazendaSelecionada(e.target.value)}
          style={{ padding: '0.5rem', minWidth: '200px' }}
        >
          <option value=''>Selecione uma Fazenda</option>
          {fazendas.map((f) => (
            <option key={f.id} value={f.id}>{f.nome}</option>
          ))}
        </select>

        <select
          value={culturaSelecionada}
          onChange={(e) => setCulturaSelecionada(e.target.value)}
          disabled={!fazendaSelecionada}
          style={{ padding: '0.5rem', minWidth: '200px' }}
        >
          <option value=''>Selecione uma Cultura</option>
          {culturas.map((c) => (
            <option key={c.id} value={c.id}>{c.nome}</option>
          ))}
        </select>

        <input
          type='number'
          placeholder='Área Utilizada (ha)'
          value={areaUtilizada || ''}
          onChange={(e) => setAreaUtilizada(Number(e.target.value))}
          disabled={!fazendaSelecionada}
          style={{ padding: '0.5rem', width: '200px' }}
        />

        <button
          onClick={handleRelacionar}
          disabled={!fazendaSelecionada || !culturaSelecionada || areaUtilizada <= 0}
          style={{ background: '#276749', color: 'white', padding: '0.5rem 1rem', border: 'none', borderRadius: '0.375rem', cursor: 'pointer' }}
        >
          Relacionar
        </button>
      </div>

      {relacionadas.length === 0 ? (
        <p style={{ color: '#4a5568' }}>Nenhuma Cultura Relacionada</p>
      ) : (
        <TabelaComBusca
          colunas={[
            { chave: 'culturaNome', rotulo: 'Cultura' },
            { chave: 'areaUtilizadaHectares', rotulo: 'Área Utilizada (ha)' }
          ]}
          dados={relacionadas.map((r) => ({
            ...r,
            culturaNome: r.cultura?.nome || ''
          }))}
          onDeletar={handleDeletar}
        />
      )}
    </div>
  );
}
