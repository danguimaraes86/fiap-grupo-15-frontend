import { API_URL } from '@lib/api';
export async function getSaldo() {
  const res = await fetch(`${API_URL}/saldos`);
  return res.json();
}