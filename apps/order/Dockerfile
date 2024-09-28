FROM node:22

WORKDIR /app

COPY ../../package*.json ./

COPY ../../nx.json ./

COPY ../../tsconfig.base.json ./

COPY ../../.env ./

COPY ../../libs ./libs

RUN npm ci

COPY ../../apps/order ./apps/order

EXPOSE 4002



CMD ["npx", "nx", "serve", "order", "--host", "0.0.0.0"]
