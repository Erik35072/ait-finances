FROM node:19-alpine

WORKDIR /backend

COPY . .

RUN npm install

EXPOSE 4000

CMD [ "npm", "run", "dev" ]