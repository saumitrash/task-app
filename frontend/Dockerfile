# frontend/Dockerfile

# Use an official Node runtime as the base image
FROM node:20

# Set the working directory in the container to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
# COPY . .

# Make port 5173 available to the outside world
EXPOSE 5173

# Start the application
CMD ["npm", "run", "dev"]