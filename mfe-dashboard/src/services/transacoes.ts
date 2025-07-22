import type { AxiosError } from "axios";
import { http } from "../lib/api";

export interface TransacaoRequest {
  descricao: string
  valor: number
  tipoTransacao: string
  categoria: string
}

export interface TransacaoResponse {
  id: number
  descricao: string
  valor: number
  dataCriacao: string
  tipoTransacao: 'deposito' | 'transferencia'
  categoria: string
}

export async function createTransacao(
  payload: TransacaoRequest,
  anexo: File | null
) {
  try {
    const transacao = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });

    const formData = new FormData();
    formData.append("transacao", transacao);

    if (anexo) {
      formData.append("anexo", anexo);
    }

    return (await http.post<TransacaoResponse>("/transacao", formData)).data;
  } catch (err) {
    const error = err as AxiosError;
    if (!error.status) {
      throw "erro de conexão";
    }
    throw error.response?.data;
  }
}

export async function getTransacaoList() {
  try {
    return (await http.get<TransacaoResponse[]>('/transacao')).data
  } catch (err) {
    const error = err as AxiosError
    if (!error.status) {
      throw "erro de conexão"
    }
    throw error.response?.data
  }
}

export async function deleteTransacao(id: number) {
  try {
    return (await http.delete<TransacaoResponse[]>('/transacao/' + id)).data
  } catch (err) {
    const error = err as AxiosError
    if (!error.status) {
      throw "erro de conexão"
    }
    throw error.response?.data
  }
}

export async function updateTransacao(id: number, payload: TransacaoRequest) {
  try {
    return (await http.put<TransacaoResponse>('/transacao/' + id, payload)).data
  } catch (err) {
    const error = err as AxiosError
    if (!error.status) {
      throw "erro de conexão"
    }
    throw error.response?.data
  }
}
