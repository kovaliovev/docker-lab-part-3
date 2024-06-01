FROM node:slim

WORKDIR /hello-world/

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY hello-world.js .

CMD [ "node", "hello-world.js", "--name=bob" ]
