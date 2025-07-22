import axios from "axios";

function initUsuario(): string {
  const token = sessionStorage.getItem('token')

  if (!token) {
    return window.location.href = '/'
  }
  return token
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Authorization: `Bearer ${initUsuario()}`
  }
})
