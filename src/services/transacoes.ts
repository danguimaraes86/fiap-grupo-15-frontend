import { API_URL } from '@lib/api';
export async function criarTransacao(payload: {
  usuarioId: number;
  tipo: string;
  valor: number;
  data: string;
}) {
  const res = await fetch(`${API_URL}/transacoes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Erro ao criar transação');
  return res.json();
}

export async function listarTransacoes() {
  const res = await fetch(`${API_URL}/transacoes`);
  return res.json();
}
