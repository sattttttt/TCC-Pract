FROM node:20-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY server.js .
COPY routes/ ./routes/

EXPOSE 5000  # Hanya dokumentasi, tidak berpengaruh di Cloud Run
CMD ["node", "server.js"]