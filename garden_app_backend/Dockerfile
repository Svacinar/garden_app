FROM node:alpine

WORKDIR /usr/garden_app_backend

COPY ./package.*json ./

RUN npm install && npm install typescript -g

COPY . .

CMD ["node", "./dist/server.js"]