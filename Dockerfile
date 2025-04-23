# Production Dockerfile for Vontres Platform (frontend + backend)
FROM node:18-alpine as build
WORKDIR /app
COPY ./frontend ./frontend
COPY ./backend ./backend
COPY ./shared ./shared
WORKDIR /app/frontend
RUN npm install && npm run build
WORKDIR /app/backend
RUN npm install && npm run build

# Production image
FROM node:18-alpine
WORKDIR /app
COPY --from=build /app/backend /app/backend
COPY --from=build /app/frontend/build /app/frontend/build
COPY ./shared ./shared
WORKDIR /app/backend
ENV NODE_ENV=production
ENV PORT=4000
EXPOSE 4000
CMD ["node", "src/index.js"]
