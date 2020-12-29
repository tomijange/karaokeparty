FROM node as builder

WORKDIR /app

# install dependencies
COPY package.json yarn.lock /app/
RUN yarn install

# copy app
COPY . /app/
RUN yarn build


FROM nginx

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

