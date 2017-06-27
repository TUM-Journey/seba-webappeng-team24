FROM alpine:3.4

# Update & install required packages
RUN apk add --update nodejs bash git

# Copy app source
ADD . /www

# Set work directory to /www
WORKDIR /www

#Install app dependencies
RUN cd /www; npm install

ENV docker_env "true"
# ENV prod_env "true"

# no need since we're using the docker-compose file
# # set your port
# ENV PORT 8080

# # expose the port to outside world
# EXPOSE  8080

# start command as per package.json
CMD ["npm", "run", "dev-docker"]
