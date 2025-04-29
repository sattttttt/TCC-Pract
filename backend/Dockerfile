FROM node:18

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Expose the port (opsional di Cloud Run, tapi tetap baik untuk deklarasi)
EXPOSE 8080

# Jalankan aplikasi
CMD ["node", "server.js"]
