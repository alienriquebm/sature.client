# Etapa de construcción
FROM node:20-alpine AS builder

WORKDIR /app

COPY . .

RUN npm install && npm run build

# Etapa final
FROM nginx:stable-alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
