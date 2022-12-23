FROM node:18.12-alpine

WORKDIR code

COPY . .

RUN npm install

EXPOSE 3000