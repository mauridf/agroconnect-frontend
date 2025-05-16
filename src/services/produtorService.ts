import api from '../api/api'

export const getProdutores = async () => {
  const response = await api.get('/produtor')
  return response.data
}

export const deleteProdutor = async (id: string) => {
  const response = await api.delete(`/produtor/${id}`)
  return response.data
}

export const cadastrarProdutor = async (dados: any) => {
  const response = await api.post('/produtor', dados)
  return response.data
}

export const obterProdutorPorId = async (id: string) => {
  const response = await api.get(`/produtor/${id}`)
  return response.data
}

export const atualizarProdutor = async (dados: any) => {
  const response = await api.put('/produtor', dados)
  return response.data
}