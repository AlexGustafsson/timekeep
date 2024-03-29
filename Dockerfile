FROM node:12.6.0-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM dragas/thttpd

COPY --from=builder /app/dist /var/www/http

EXPOSE 80
