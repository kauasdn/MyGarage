FROM node:20-alpine

WORKDIR /app

# Copia apenas os manifests primeiro (cache de layers)
COPY package*.json ./
RUN npm ci --omit=dev

# Copia o restante do código
COPY . .

# Gera o Prisma Client
RUN npx prisma generate

EXPOSE 3000

CMD ["node", "src/index.js"]
