FROM node:14-alpine

WORKDIR code

COPY . .

RUN npm install

EXPOSE 3000