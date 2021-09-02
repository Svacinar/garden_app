FROM node:alpine

WORKDIR /usr/garden_app_frontend

COPY ./packege.*json ./

RUN npm install

COPY . .

RUN npm run build

ENTRYPOINT [ "npm", "start" ]