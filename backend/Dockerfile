# FROM alpine:3.4	

ADD . /backend
WORKDIR /backend
FROM mhart/alpine-node:latest
# Update & install required packages
RUN apk add --update nodejs bash git 

RUN npm install

ENV server:host 0.0.0.0
ENV server:host 8080
#Install app dependencies
RUN cd /www && npm install

EXPOSE  8080

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]
