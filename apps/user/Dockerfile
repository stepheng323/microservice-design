FROM node:22 AS builder

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY /apps/user ./apps/user
COPY ./libs ./libs

COPY ./nx.json ./
COPY tsconfig.base.json ./
COPY .env .env


RUN npx nx reset
RUN npx nx run user:build

FROM node:22

WORKDIR /app

COPY --from=builder /app/dist/apps/user /app

EXPOSE 4000

CMD ["node", "dist/apps/user/main.js"]
