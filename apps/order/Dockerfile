FROM node:alpine AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npx nx run order:build


FROM node:alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/order /app
COPY --from=builder /app/package*.json ./

RUN apk add --no-cache make gcc g++ python3
RUN apk add --no-cache bash

RUN npm install --only=production

EXPOSE 4002

CMD ["node", "main.js"]
