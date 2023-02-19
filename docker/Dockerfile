FROM node:lts-alpine

WORKDIR /app

COPY package*.json .

COPY . .

RUN npm install

EXPOSE ${PORT}

CMD [ "npm", "run", "start" ]