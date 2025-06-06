import { capitalizeFirstLetter } from '@utils';

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
    usuarioId: number;
    tipo: string;
    valor: number;
    data: string;
  }[];
};

export function agruparTransacoesPorMes(transacoes: Transacao[]): TransacoesAgrupadas[] {
  const formatador = new Intl.DateTimeFormat('pt-BR', {
    month: 'long',
  });

  const mapa = new Map<string, TransacoesAgrupadas>();

  for (const t of transacoes) {
    const dataObj = new Date(t.data);

    const nomeMes = formatador.format(dataObj);
    const mesCapitalizado = capitalizeFirstLetter(nomeMes);

    if (!mapa.has(mesCapitalizado)) {
      mapa.set(mesCapitalizado, { mesAno: mesCapitalizado, transacoes: [] });
    }

    mapa.get(mesCapitalizado)!.transacoes.push({
      id: t.id,
      usuarioId: t.usuarioId,
      tipo: t.tipo,
      valor: t.valor,
      data: t.data,
    });
  }

  return Array.from(mapa.values()).sort((a, b) => {
    const ultimaA = new Date(a.transacoes[0].data).getTime();
    const ultimaB = new Date(b.transacoes[0].data).getTime();
    return ultimaB - ultimaA;
  });
}
