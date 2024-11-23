FROM node:14.17.0

WORKDIR /app

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN apt update && apt install -y qpdf
RUN npm install

COPY . .

CMD [ "node", "index.js" ]