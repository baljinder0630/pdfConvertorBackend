# Use the latest LTS version of Node.js (18.x)
FROM node:18

# Set the working directory
WORKDIR /app

# Copy package files
COPY package.json package-lock.json ./

# Install required dependencies including OpenSSL 1.1.x and qpdf
RUN apt-get update && \
    apt-get install -y qpdf libssl-dev && \
    npm install

# Copy the rest of the application code
COPY . .


# Start the application
CMD ["node", "index.js"]