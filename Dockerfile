# Use Node.js image based on Debian Buster
FROM node:14-buster

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Update the package list and install qpdf
RUN apt-get update && apt-get install -y qpdf

# Install npm dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["node", "index.js"]
