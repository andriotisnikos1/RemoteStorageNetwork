from node:current-alpine

WORKDIR /app

copy ./package.json ./

RUN npm install

COPY . .

run npm start