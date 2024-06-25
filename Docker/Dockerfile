FROM node:16

WORKDIR /app

COPY package.json .

RUN npm install
RUN npm install -D sass

EXPOSE 3000
EXPOSE 24678

CMD ["npm", "run", "dev"]
