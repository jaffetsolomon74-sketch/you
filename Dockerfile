# Use Node.js LTS version
FROM node:20-alpine

# Set working directory inside container
WORKDIR /app

# Copy package files first
COPY package*.json ./

# Install dependencies
RUN npm install --production

# Copy all remaining files
COPY . .

# Fly.io expects the app to listen on this port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]