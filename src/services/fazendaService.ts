import api from '../api/api'

export const getFazendas = async () => {
  const response = await api.get('/fazenda')
  return response.data
}

export const deleteFazenda = async (id: string) => {
  const response = await api.delete(`/fazenda/${id}`)
  return response.data
}

export const cadastrarFazenda = async (dados: any) => {
  const response = await api.post('/fazenda', dados)
  return response.data
}

export const obterFazendaPorId = async (id: string) => {
  const response = await api.get(`/fazenda/${id}`)
  return response.data
}

export const obterFazendaPorUf = async (uf: string) => {
    const response = await api.get(`/fazenda/uf/${uf}`)
    return response.data
}

export const obterFazendaPorCNPJ = async (cnpj: string) => {
    const response = await api.get(`/fazenda/cnpj/${cnpj}`)
    return response.data
}

export const obterFazendaPorProdutor = async (produtorId: string) => {
    const response = await api.get(`/fazenda/produtor/${produtorId}`)
    return response.data
}

export const atualizarFazenda = async (dados: any) => {
  const response = await api.put('/fazenda', dados)
  return response.data
}