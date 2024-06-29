# Use the official Node.js 14 image as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install the dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Nest.js application
RUN yarn build

# Expose the port on which the Nest.js application will run
EXPOSE 3000/tcp

# Start the Nest.js application
CMD [ "node", "dist/main.js" ]
