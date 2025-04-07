# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

# Etapa final: servidor NGINX
FROM nginx:stable-alpine

# Copiamos el build al NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Configuramos NGINX para servir desde subruta
RUN sed -i 's|index  index.html index.htm;|index index.html;|' /etc/ng
