FROM node:14.17.3
WORKDIR /usr/api

COPY package*.json ./
RUN npm install

COPY . .