# Stage 1: Builder - Use a Debian-based image for better native module compatibility
FROM node:20-slim AS builder

# Set the working directory
WORKDIR /usr/src/app

# Install packages required to build native Node modules (if any new ones are added)
RUN apt-get update && apt-get install -y \
    python3 \
    make \
    g++ \
    git \
    && rm -rf /var/lib/apt/lists/*

# Copy package files
COPY package*.json ./

# Install project dependencies (including the 'pg' client)
RUN npm install

# Copy the rest of the application code
COPY . .

# Stage 2: Production
FROM node:20-slim AS production

WORKDIR /usr/src/app

# Copy production dependencies and source code
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/package*.json ./
COPY . .

# Expose the application port
EXPOSE 3000

# Command to run the application
CMD [ "npm", "start" ]