FROM alpine:3.4

# Update & install required packages
RUN apk add --update nodejs bash git


# Copy app source
ADD . /www

# Install app dependencies
RUN cd /www; npm install

# Set work directory to /www
WORKDIR /www

# no need since we're using the docker-compose file
# # set your port
# ENV PORT 8000

# # expose the port to outside world
# EXPOSE  8000

# start command as per package.json
# CMD ["npm", "build-prod"]
CMD ["npm", "run", "start-dev-docker"]
