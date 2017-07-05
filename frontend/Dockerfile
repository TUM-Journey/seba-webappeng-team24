# FROM alpine:3.4

FROM mhart/alpine-node:latest
# Update & install required packages
# RUN apk add --update nodejs bash git

RUN apk add --update nodejs bash git

# Copy app source
ADD . /frontend

# Install app dependencies
# RUN cd /frontend; npm install

# Set work directory to /www
WORKDIR /frontend

# no need since we're using the docker-compose file
# # set your port
# ENV PORT 8000

# # expose the port to outside world
# EXPOSE  8000

# start command as per package.json
# CMD ["npm", "build-prod"]
CMD ["npm", "install"]
CMD ["npm", "run", "start-dev-docker"]
