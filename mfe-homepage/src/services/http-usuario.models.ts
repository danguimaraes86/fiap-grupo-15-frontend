// Request and Response types

export interface RegistrationRequest {
  nome: string
  email: string
  password: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
}
