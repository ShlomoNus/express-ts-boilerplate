# Use a lightweight Node image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Install nodemon globally for dev hot-reloading
RUN npm install -g nodemon

# Copy source code
COPY . .

# Expose the port your app runs on (optional)
EXPOSE 3000

# Default command
CMD ["npm", "run", "dev"]
