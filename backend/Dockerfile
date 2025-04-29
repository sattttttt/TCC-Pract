FROM node:20-alpine
WORKDIR /app

# Install dependencies pertama untuk caching
COPY package*.json ./
RUN npm install --production

# Copy aplikasi
COPY . .

# Health check
HEALTHCHECK --interval=30s --timeout=3s \
  CMD wget -qO- http://localhost:5000/health || exit 1

EXPOSE 5000
CMD ["node", "server.js"]