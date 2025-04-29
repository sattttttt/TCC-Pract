FROM node:18

# Set working directory
WORKDIR /app

# Pertama masuk ke folder backend
WORKDIR /app/backend

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose port
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "server.js"]