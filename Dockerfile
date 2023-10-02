FROM node:latest
WORKDIR /app
ARG API_HOST
ENV API_HOST=${API_HOST}
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4200 49153
CMD npm run start