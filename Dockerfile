# Use Node.js image based on Debian Buster
FROM node:14-buster
WORKDIR /app

COPY package.json package-lock.json ./

RUN apt-get update && apt-get install -y qpdf
RUN npm install

COPY . .

CMD ["node", "index.js"]
