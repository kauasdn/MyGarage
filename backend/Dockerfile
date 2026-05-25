FROM node:20-alpine

WORKDIR /app

COPY backend/package*.json ./
RUN npm ci --omit=dev

COPY backend/. .

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "src/index.js"]