FROM node:18-alpine AS build
COPY package*.json ./
RUN npm install
COPY . .
CMD ["npm", "start"]
