# Base image
FROM node:20.9.0-alpine

# Set working directory
WORKDIR /

# Copy package.json and yarn.lock if using Yarn
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Expose any necessary ports
EXPOSE 4000

# Set environment variables if required
# ENV NODE_ENV production

# Build the code (if necessary)
RUN npm run build

# Specify the command to start your application
CMD [ "npm", "run", "start:dev" ]
