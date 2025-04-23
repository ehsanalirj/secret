# Use Node LTS for security and future-proofing
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm install --production

COPY . .

EXPOSE 5173
CMD ["npx", "vite", "preview", "--host"]
