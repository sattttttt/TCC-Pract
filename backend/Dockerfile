FROM node:20-alpine
WORKDIR /app

# Copy package files dulu untuk optimalisasi cache
COPY package*.json ./
RUN npm install

# Copy aplikasi
COPY server.js .
COPY routes/ ./routes/

EXPOSE 5000
CMD ["node", "server.js"]