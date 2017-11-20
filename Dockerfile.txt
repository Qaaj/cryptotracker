FROM node:carbon
WORKDIR /src/

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001
EXPOSE 6379

CMD [ "npm", "start" ]