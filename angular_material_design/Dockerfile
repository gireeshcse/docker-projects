FROM node:12-slim

WORKDIR /app

EXPOSE 4200

COPY package*.json ./

RUN npm install

# COPY App Source Code
COPY . .

CMD ["ng","serve --host 0.0.0.0"]