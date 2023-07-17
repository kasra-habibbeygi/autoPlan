FROM node:18.14.0-alpine3.17
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json yarn.lock ./
RUN yarn install --frozen-lockfile --no-cache --production --network-timeout 1000000000
COPY . .
RUN npm run build
CMD ["npm", "start"]
