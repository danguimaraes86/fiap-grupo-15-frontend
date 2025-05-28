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
  const res = await fetch(`${API_URL}/transacoes?_sort=id&_order=desc`);
  return res.json();
}

export async function deleteTransacao(id: number) {
  const res = await fetch(`${API_URL}/transacoes/${id}`, {
    method: 'DELETE',
  });

  if (!res.ok) throw new Error(`Erro ao excluir transação com id ${id}`);
  return true;
}

export async function updateTransacao(id: number, payload: { valor: number }) {
  const res = await fetch(`${API_URL}/transacoes/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Erro ao atualizar transação');
  return res.json();
}