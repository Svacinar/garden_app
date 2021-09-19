FROM arm32v7/node:14.14.0-alpine

WORKDIR /usr/garden_app_frontend

COPY ./package.*json ./

RUN npm install --only=prod

COPY . .

RUN npm run build

ENTRYPOINT [ "npm", "start" ]