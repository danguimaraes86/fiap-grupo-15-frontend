import { API_URL } from '@lib/api';
export async function getUsuario() {
  const res = await fetch(`${API_URL}/usuarios/1`);
  return res.json();
}