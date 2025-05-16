import api from '../api/api'

export const getCulturas = async () => {
  const { data } = await api.get('/cultura')
  return data
}

export const getCulturaPorId = async (id: string) => {
  const { data } = await api.get(`/cultura/${id}`)
  return data
}

export const cadastrarCultura = async (cultura: any) => {
  const { data } = await api.post('/cultura', cultura)
  return data
}

export const atualizarCultura = async (cultura: any) => {
  const { data } = await api.put('/cultura', cultura)
  return data
}

export const deletarCultura = async (id: string) => {
  await api.delete(`/cultura/${id}`)
}
