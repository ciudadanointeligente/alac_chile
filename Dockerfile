FROM node:4.8.7
RUN npm install sails@beta -g

RUN mkdir /server

WORKDIR /server

EXPOSE 1337
