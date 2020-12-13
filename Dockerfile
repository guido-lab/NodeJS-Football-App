FROM node:14.10

WORKDIR /app

COPY . .

RUN npm install

ENV CONECTION_STRING = "TETS"

RUN node server

