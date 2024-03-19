# Use the official Node.js image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the working directory

# not with docker-compose
# COPY . .

# Expose the port that the app runs on
EXPOSE 3000

# Command to run the app
CMD ["node", "index.js"]
