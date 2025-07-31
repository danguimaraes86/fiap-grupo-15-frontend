# Estágio 1: Constrói a aplicação
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Estágio 2: Cria a imagem final com um servidor
FROM node:18-alpine
WORKDIR /app
# Instala o servidor 'serve' globalmente
RUN npm install -g serve
# Copia APENAS a pasta 'dist' gerada no estágio anterior
COPY --from=builder /app/dist ./dist
# Copia o arquivo de configuração para o CORS
COPY serve.json ./dist

EXPOSE 8083
# Inicia o servidor, aponta para a pasta 'dist' e aplica as regras do serve.json
CMD ["serve", "-s", "dist", "-l", "8083", "-c", "serve.json"]