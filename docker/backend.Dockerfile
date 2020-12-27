FROM node as builder

WORKDIR /app

# install dependencies
COPY package.json yarn.lock /app/
RUN yarn install

# copy app
COPY . /app/
RUN yarn build:server

FROM node

WORKDIR /app

COPY --from=builder /app/build /app/build
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json

ENV DEBUG="karaokeparty"

ENV PORT="8080"

CMD ["node", "build/server/index.js"]

EXPOSE 8080
