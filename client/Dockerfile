FROM node:latest

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app/

RUN npm install

# ADD src /usr/src/app/src
# ADD public /usr/src/app/public
RUN npm build

CMD ["npm","start"]


# FROM node:latest

# RUN mkdir -p /usr/src/app
# WORKDIR /usr/src/app

# COPY package.json /usr/src/app/

# RUN npm install

# ADD src /usr/src/app/src
# ADD public /usr/src/app/public
# RUN npm build

# CMD ["npm","start"]




# FROM node:latest
# WORKDIR '/client'

# COPY package.json .
# RUN npm install
# COPY . .
# CMD ["npm","start"]

