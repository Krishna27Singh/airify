FROM node:18

WORKDIR /app

COPY . .

RUN npm install && npm run build

RUN npm install -g serve

EXPOSE 8080

CMD ["serve", "-s", "dist", "-l", "8080"]
