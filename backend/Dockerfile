FROM node:20-alpine
WORKDIR /app

# Copy package files first for better caching
COPY package*.json ./
RUN npm install

# Copy only necessary files
COPY server.js .
COPY ./routes ./routes

# If you need config folder, uncomment and create the folder first
# COPY ./config ./config

EXPOSE 5000
CMD ["node", "server.js"]