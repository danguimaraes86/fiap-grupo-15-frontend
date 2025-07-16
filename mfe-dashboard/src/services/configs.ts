import { AxiosError } from 'axios'
import { http } from '../lib/api'

export enum TipoTransacao {
  deposito = 'Depósito',
  transferencia = 'Transferência'
}

export enum Categoria {
  entrada = "Entrada",
  nao_classificado = "Não Classificado",
  moradia = "Moradia",
  transporte = "Transporte",
  lazer = "Lazer",
  educacao = "Educação",
  pets = "Pets",
}

export async function getTiposTransacao() {
  try {
    return (await http.get<TipoTransacao>('/config/transacao')).data
  } catch (err) {
    const error = err as AxiosError
    if (!error.status) {
      throw "erro de conexão"
    }
    throw error.response?.data
  }
}

export async function getCategorias() {
  try {
    return (await http.get<Categoria>('/config/categoria')).data
  } catch (err) {
    const error = err as AxiosError
    if (!error.status) {
      throw "erro de conexão"
    }
    throw error.response?.data
  }
}