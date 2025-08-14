# Use official Node image
FROM node:18-bullseye-slim

# Set working directory
WORKDIR /app

# Copy Meteor bundle
COPY ./output/bundle /app

# Install dependencies
RUN cd programs/server && npm install

# Set environment variables (can override with docker-compose)
ENV PORT=3000

# Expose port
EXPOSE 3000
EXPOSE 3002

# Start the app
CMD ["node", "main.js"]