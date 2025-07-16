import { AxiosError } from "axios";
import { http } from "../lib/api";

export async function getSaldoUsuario() {
  try {
    return (await http.get<number>('/usuario/saldo')).data
  } catch (err) {
    const error = err as AxiosError
    if (!error.status) {
      throw "erro de conexão"
    }
    throw error.response?.data
  }

}