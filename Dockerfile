FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY src/ ./src/
COPY resources/ ./resources/

RUN npm run build

EXPOSE 3950

CMD ["node", "dist/index.js"]
