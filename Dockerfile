# Use an Alpine-based Node.js image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port your app listens on
EXPOSE 3000

# Start the application
CMD [ "node", "index.js" ]
