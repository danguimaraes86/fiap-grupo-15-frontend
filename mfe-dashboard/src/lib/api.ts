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
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${initUsuario()}`
  }
})
