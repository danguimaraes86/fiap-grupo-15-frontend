import { AxiosError } from "axios";
import { http } from "../lib/api";

export interface UsuarioResponse {
  id: number
  nome: string
  email: string
}

export async function getUsuarioLogado() {
  try {
    return (await http.get<UsuarioResponse>('/usuario')).data
  } catch (err) {
    const error = err as AxiosError
    if (!error.status) {
      throw "erro de conexão"
    }
    throw error.response?.data
  }
}