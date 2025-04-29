FROM node:20-alpine
WORKDIR /app

# Hanya copy file yang diperlukan
COPY package*.json ./
RUN npm install

# Copy hanya folder backend
COPY ./routes ./routes
COPY server.js .
COPY ./config ./config  # Jika ada folder lain yang diperlukan

EXPOSE 5000
CMD ["node", "server.js"]