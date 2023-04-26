FROM node:18-alpine

LABEL mode="development"
EXPOSE 8080
WORKDIR /app

COPY package.json package-lock.json ./
COPY ./frontend/package.json ./frontend/package-lock.json ./frontend/

RUN npm install

CMD ["npm", "run", "dev"]