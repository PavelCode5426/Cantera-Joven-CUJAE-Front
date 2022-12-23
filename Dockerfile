FROM node:14.7.4-alphine

WORKDIR code

COPY . .

RUN npm install

EXPOSE 3000