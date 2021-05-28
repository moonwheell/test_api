FROM node:alpine


RUN mkdir /home/node/test-api
WORKDIR /home/node/test-api
COPY . /home/node/test-api
RUN chmod -R 777 /home/node/test-api
RUN npm install

# need to create new db "test"

EXPOSE 3000