export const buscarEnderecoPorCEP = async (cep: string) => {
  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`)
  if (!response.ok) throw new Error('Erro ao buscar CEP')
  return response.json()
}