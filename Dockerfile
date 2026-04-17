# Use Node.js for building
FROM node:24-slim AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Final image
FROM node:24-slim
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/src/lib/engine.js ./src/lib/engine.js

RUN npm install --omit=dev
RUN npm install express cors

EXPOSE 8080
# Cloud Run expects PORT variable, we use 8080 as default
CMD ["node", "server.js"]
