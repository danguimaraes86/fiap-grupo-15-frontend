import axios from "axios";

function initUsuario(): string {
  const token = sessionStorage.getItem('token')

  if (!token) {
    return window.location.href = '/'
  }
  return token
}

export const http = axios.create({
  baseURL: 'https://fiap-grupo-15-bytebank-backend-9f339827bd67.herokuapp.com',
  headers: {
    Authorization: `Bearer ${initUsuario()}`
  }
})
