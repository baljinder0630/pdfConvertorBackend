FROM node:14.17.0

WORKDIR /app
COPY package.json package-lock.json ./

RUN apt-get update && apt-get install -y qpdf
RUN npm install

COPY . .

EXPOSE 3000

CMD ["node", "index.js"]
