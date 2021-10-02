FROM arm32v7/node:14.14.0-alpine

WORKDIR /usr/garden_app_backend

COPY ./package.*json ./

RUN npm install npm@latest && npm install typescript -g && npm install

COPY . .

RUN tsc

CMD ["node", "./dist/server.js"]