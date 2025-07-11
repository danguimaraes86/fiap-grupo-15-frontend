import axios, { AxiosError } from 'axios'
import type { AuthResponse, LoginRequest, RegistrationRequest } from './http-usuario.models'

const http = axios.create({
  baseURL: 'https://fiap-grupo-15-bytebank-backend-9f339827bd67.herokuapp.com/'
})

export async function postCreateUsuario(payload: RegistrationRequest) {
  try {
    return (await http.post<AuthResponse>('/usuario', payload)).data
  } catch (err) {
    const error = err as AxiosError
    if (!error.status) {
      throw "erro de conexão"
    }
    throw error.response?.data
  }
}

export async function postLogin(payload: LoginRequest) {
  try {
    return (await http.post<AuthResponse>('/usuario/token', payload)).data
  } catch (err) {
    const error = err as AxiosError
    if (!error.status) {
      throw "erro de conexão"
    }
    throw error.response?.data
  }
}
