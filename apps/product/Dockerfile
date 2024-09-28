FROM node:22 AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY ./nx.json ./
COPY ./libs ./libs
COPY ./apps/product ./apps/product

COPY tsconfig.base.json ./
COPY .env .env

RUN npx nx reset
RUN npx nx run product:build

FROM node:22

WORKDIR /app

COPY --from=builder /app/dist/apps/product /app


EXPOSE 4001

CMD ["node", "dist/apps/product/main.js"]
