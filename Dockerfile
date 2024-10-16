FROM node:18.18.0
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 4000
CMD ["node", "server.js"]
