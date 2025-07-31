# Estágio 1: Constrói a aplicação com Webpack
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
# Gera a pasta 'dist' com o index.html e outros arquivos
ARG BUILD_SCRIPT=build
RUN npm run ${BUILD_SCRIPT}

# Estágio 2: Cria a imagem final com o servidor Nginx
FROM nginx:stable-alpine
# Copia o conteúdo da pasta 'dist' para a pasta padrão do Nginx
COPY --from=builder /app/dist /usr/share/nginx/html
# Aplica nossa configuração customizada para suportar rotas de SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80, que é a porta padrão do Nginx
EXPOSE 80
# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]