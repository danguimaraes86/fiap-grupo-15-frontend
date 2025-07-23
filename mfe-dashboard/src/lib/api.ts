import axios from "axios";

function initUsuario(): string {
  const token = sessionStorage.getItem('token')

  if (!token || !isTokenValid(token)) {
    return window.location.href = '/'
  }
  return token
}

function isTokenValid(token: string): boolean {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const now = Math.floor(Date.now() / 1000);
    return payload.exp && payload.exp > now;
  } catch {
    return false;
  }
}

export const http = axios.create({
  baseURL: 'https://fiap-grupo-15-bytebank-backend-9f339827bd67.herokuapp.com',
  headers: {
    Authorization: `Bearer ${initUsuario()}`
  }
})
