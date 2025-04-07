# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar todos los archivos del proyecto
COPY . .

# Instalar dependencias y compilar
RUN npm install
RUN npm run build

# Etapa final: NGINX sirve el sitio estático
FROM nginx:stable-alpine

# Copiar el sitio compilado al directorio de NGINX
COPY --from=builder /app/dist /usr/share/nginx/html

# Configurar NGINX para servir desde subruta (manejo de rutas internas tipo /saved, etc.)
RUN sed -i 's|index  index.html index.htm;|index index.html;|' /etc/nginx/conf.d/default.conf && \
    sed -i 's|location / {|location / { try_files $uri /index.html; }|' /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]