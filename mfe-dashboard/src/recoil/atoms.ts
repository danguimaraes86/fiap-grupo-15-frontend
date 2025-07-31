import { atom } from "recoil";
import { TransacoesAgrupadas } from "../utils";

export const saldoState = atom<number>({
  key: 'saldo',
  default: 0
})

export const transactionListState = atom<TransacoesAgrupadas[]>({
  key: 'transactionList',
  default: []
})

export const accountTypeState = atom<string>({
  key: 'accountType',
  default: 'Conta Corrente'
})