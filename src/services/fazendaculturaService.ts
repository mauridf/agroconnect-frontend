import api from '../api/api';

export interface CulturaFazendaRequest {
  fazendaId: string;
  culturaId: string;
  areaUtilizadaHectares: number;
}

export const associarCulturaFazenda = async (dados: CulturaFazendaRequest) => {
  const response = await api.post('/fazendacultura', dados);
  return response.data;
};

export const getCulturaFazendaByFazendaId = async (fazendaId: string) => {
  const response = await api.get(`/fazendacultura/fazenda/${fazendaId}`);
  return response.data;
};

export const getCulturaFazendaById = async (id: string) => {
  const response = await api.get(`/fazendacultura/${id}`);
  return response.data;
};

export const atualizarCulturaFazenda = async (dados: any) => {
  const response = await api.put('/fazendacultura', dados);
  return response.data;
};

export const deletarCulturaFazenda = async (id: string) => {
  const response = await api.delete(`/fazendacultura/${id}`);
  return response.data;
};

export const getAreaUtilizadaPorFazenda = async (fazendaId: string) => {
  const response = await api.get(`/fazendacultura/areautilizada/${fazendaId}`);
  return response.data;
};
