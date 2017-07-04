FROM node:argon

RUN mkdir /backend
ADD . /backend

WORKDIR /backend

RUN npm install

ENV server:host 0.0.0.0
ENV server:host 8080

EXPOSE  8080

CMD ["npm", "run", "build"]
CMD ["npm", "run", "start"]
