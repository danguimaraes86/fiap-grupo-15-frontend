import type { TransacaoResponse } from "../../services/transacoes";
import { capitalizeFirstLetter } from "../capitalize/capitalize";

export type Transacao = {
  id: number;
  usuarioId: number;
  tipo: 'Depósito' | 'Transferência';
  valor: number;
  data: string;
};

export type TransacoesAgrupadas = {
  mesAno: string;
  transacoes: {
    id: number;
    tipo: string;
    valor: number;
    data: string;
  }[];
};

export function agruparTransacoesPorMes(transacoes: TransacaoResponse[]): TransacoesAgrupadas[] {
  const formatador = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
  });

  const mapa = new Map<string, TransacoesAgrupadas>();

  for (const t of transacoes) {
    const dataObj = new Date(t.dataCriacao);

    const nomeMes = formatador.format(dataObj);
    const mesCapitalizado = capitalizeFirstLetter(nomeMes);

    if (!mapa.has(mesCapitalizado)) {
      mapa.set(mesCapitalizado, { mesAno: mesCapitalizado, transacoes: [] });
    }

    mapa.get(mesCapitalizado)!.transacoes.push({
      id: t.id,
      tipo: t.tipoTransacao,
      valor: t.valor,
      data: t.dataCriacao,
    });
  }

  return Array.from(mapa.values()).sort((a, b) => {
    const ultimaA = new Date(a.transacoes[0].data).getTime();
    const ultimaB = new Date(b.transacoes[0].data).getTime();
    return ultimaB - ultimaA;
  });
}
