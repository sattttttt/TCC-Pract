FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port for Cloud Run
EXPOSE 5000

# Start the app
CMD ["node", "server.js"]
