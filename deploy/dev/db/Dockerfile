FROM mongo:latest

# Run MongoDB in background and import collections
ADD import/*.json /data/

RUN mkdir -p /data/mongod \
    && chown -R mongodb:mongodb /data/mongod

RUN mongod --fork --syslog --dbpath /data/mongod --smallfiles &&\
    mongoimport --collection plans --file /data/plans.json && \
    mongoimport --collection customers  --file /data/customers.json && \
    mongoimport --collection subscriptions  --file /data/subscriptions.json && \
    mongoimport --collection users  --file /data/users.json && \
    mongoimport --collection usergroups  --file /data/usergroups.json && \
    mongoimport --collection matricescharacteristic  --file /data/matricescharacteristic.json && \
    mongoimport --collection matrixes  --file /data/matrixes.json && \
    mongoimport --collection forms  --file /data/forms.json && \
    mongoimport --collection feedbackcompetencies  --file /data/feedbackcompetencies.json && \
    mongoimport --collection feedbacks  --file /data/feedbacks.json && \
    mongoimport --collection feedbackrequests  --file /data/feedbackrequests.json && \
    mongoimport --collection reports  --file /data/reports.json && \
	mongod --dbpath /data/mongod --shutdown && \
    chown -R mongodb /data/mongod

# Make the new dir a VOLUME to persists it
VOLUME /data/mongod

# Run MongoDB
CMD ["mongod", "--dbpath", "/data/mongod", "--smallfiles"]
