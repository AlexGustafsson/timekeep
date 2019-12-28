FROM node:12.6.0-alpine as builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12.6.0-alpine

WORKDIR /app

COPY server.js .

COPY --from=builder /app/dist /app/dist

EXPOSE 3000

USER node

CMD ["node", "server.js"]
