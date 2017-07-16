# FROM alpine:3.4
FROM mhart/alpine-node:latest

RUN apk add --update nodejs bash git

ADD /backend /backend
ADD /frontend /frontend


RUN cd /frontend && \
npm install && \
npm run build-prod && \
mv /frontend/dist /dist && \
rm -r /frontend && \
cd /backend && \
npm install

WORKDIR /backend

CMD [ "npm", "run", "deploy"]
# CMD [ "npm", "run", "install" ];
# CMD [ "npm", "run", "start" ];




