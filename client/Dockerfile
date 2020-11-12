FROM node:alpine
WORKDIR '/app'

COPY package.jdon .
RUN npm install
COPY . .
CMD ["npm","start"]
