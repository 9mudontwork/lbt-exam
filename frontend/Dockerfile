FROM node:16.8-alpine

RUN npm i -g pnpm

WORKDIR /app/frontend

COPY .npmrc pnpm-lock.yaml package.json ./

RUN pnpm i --frozen-lockfile

COPY . .

EXPOSE 5173

CMD ["pnpm","dev"]
