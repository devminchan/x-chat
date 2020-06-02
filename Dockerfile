FROM node:10.13

WORKDIR /home/app

COPY package.json yarn.lock ./
RUN npm install -g yarn
RUN yarn

COPY . .
RUN yarn build

CMD yarn start:prod