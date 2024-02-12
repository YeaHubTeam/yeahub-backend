#syntax=docker/dockerfile:1

ARG PORT

FROM node:20-alpine as builder

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine

RUN apk add --no-cache dumb-init

ENTRYPOINT ["/usr/bin/dumb-init", "--"]

WORKDIR /usr/src/app

COPY --from=builder --chown=node:node /usr/src/app/dist ./dist
COPY --from=builder --chown=node:node /usr/src/app/node_modules ./node_modules

USER node

EXPOSE $PORT

CMD ["node", "dist/main"]
