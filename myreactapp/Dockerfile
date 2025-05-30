# Select base image
FROM node:22-alpine AS build

# Set working directory for the app
WORKDIR /myreactapp

# Copy the package.json and lock files
COPY package*.json ./

# Install dependencies
RUN npm i

# Copy rest of the app's files
COPY . .

# Compile the Typescript code
RUN npm run build

# Define port number the container should expose
EXPOSE 3000

# Start the React app
CMD ["npm", "run", "start"]
