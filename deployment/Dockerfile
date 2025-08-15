# Stage 1: Build Meteor bundle
FROM node:18-bullseye-slim AS builder

# Install curl for Meteor installation
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# Install Meteor
RUN curl https://install.meteor.com/ | sh

# Set working directory
WORKDIR /app

# Copy source code into the container
COPY . /app

# Install dependencies and build Meteor bundle
RUN METEOR_ALLOW_SUPERUSER=true meteor npm install && \
    METEOR_ALLOW_SUPERUSER=true meteor build ../output --directory --server-only

# Stage 2: Production image
FROM node:18-bullseye-slim

WORKDIR /app

# Copy built bundle from builder
COPY --from=builder /output/bundle /app

# Copy settings.json into the image
COPY settings.prod.json /app/settings.json

# Install server dependencies
WORKDIR /app/programs/server
RUN npm install --omit=dev

WORKDIR /app

# Set environment variables (override in docker-compose or at runtime)
ENV NODE_ENV=production
ENV PORT=3000

# Expose ports for Meteor and Socket.IO
EXPOSE 3000
EXPOSE 3002

# Start the app
CMD ["sh", "-c", "export METEOR_SETTINGS=\"$(cat /app/settings.json)\" && node main.js"]
