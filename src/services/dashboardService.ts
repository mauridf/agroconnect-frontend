import api from '../api/api'

export const getTotalFazendas = () => api.get('/dashboard/total-fazendas')
export const getTotalFazendasPorUF = () => api.get('/dashboard/total-fazendas-por-uf')

export const getTotalHectares = () => api.get('/dashboard/total-hectares')
export const getTotalHectaresPorUF = () => api.get('/dashboard/total-hectares-por-uf')

export const getTotalHectaresAgricultavel = () => api.get('/dashboard/total-hectares-agricultavel')
export const getTotalHectaresAgricultavelPorUF = () => api.get('/dashboard/total-hectares-agricultavel-por-uf')

export const getTotalProdutores = () => api.get('/dashboard/total-produtores')
export const getTotalProdutoresPorUF = () => api.get('/dashboard/total-produtores-por-uf')

export const getTotalCulturasPlantadas = () => api.get('/dashboard/total-culturas-plantadas')
export const getTotalCulturasPlantadasPorCultura = () => api.get('/dashboard/total-culturas-plantadas-por-cultura')
export const getTotalCulturasPlantadasPorUF = () => api.get('/dashboard/total-culturas-plantadas-por-uf')
export const getTotalCulturasPlantadasPorCategoria = () => api.get('/dashboard/total-culturas-plantadas-por-categoria')
