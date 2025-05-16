import api from '../api/api'

export async function login(nomeUsuario: string, senha: string) {
  const response = await api.post(`/autenticacao/login`, {
    nomeUsuario,
    senha
  })

  const { usuario, token, refreshToken } = response.data

  // Armazenar no localStorage
  localStorage.setItem('token', token)
  localStorage.setItem('refreshToken', refreshToken)
  localStorage.setItem('id', usuario.id)
  localStorage.setItem('nomeUsuario', usuario.nomeUsuario)
  localStorage.setItem('tipoUsuario', usuario.tipoUsuario.toString())
  localStorage.setItem('email', usuario.email)
  localStorage.setItem('emailConfirmado', JSON.stringify(usuario.emailConfirmado))

  console.log({
    token: localStorage.getItem('token'),
    refreshToken: localStorage.getItem('refreshToken'),
    id: localStorage.getItem('id'),
    nomeUsuario: localStorage.getItem('nomeUsuario'),
    tipoUsuario: localStorage.getItem('tipoUsuario'),
    email: localStorage.getItem('email'),
    emailConfirmado: localStorage.getItem('emailConfirmado')
  })

  return response.data
}

export const refresh = async (refreshToken: string) => {
  const response = await api.post('/autenticacao/refresh-token', {
    refreshToken,
  })
  return response.data
}

export const revoke = async () => {
  const response = await api.post('/autenticacao/revoke-token')
  return response.data
}

export const register = async (userData: {
  nomeUsuario: string
  senha: string
  email: string
  emailConfirmado: boolean
  tipoUsuario: number
}) => {
  const response = await api.post('/autenticacao/register', userData)
  return response.data
}
