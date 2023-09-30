FROM debian:bullseye

RUN apt-get update
RUN apt-get install -y curl make g++
RUN curl -sL http://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs

ADD . /

RUN npm install
EXPOSE 3000

CMD ["node", "dist/app.js"]
