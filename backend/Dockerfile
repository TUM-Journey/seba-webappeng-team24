# FROM alpine:3.4	
FROM mhart/alpine-node:latest

# Update & install required packages
RUN apk add --update nodejs bash git 

ADD . /backend
WORKDIR /backend
RUN npm install


#Install app dependencies

CMD ["npm", "install"]

CMD ["npm", "run", "dev"]
# CMD ["npm", "run", "start"]
