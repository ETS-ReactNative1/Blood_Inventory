FROM ubuntu:16.04

RUN apt-get update && \
  apt-get install -y  curl && \
  curl -fsSL https://deb.nodesource.com/setup_14.x | bash - && \
  apt-get install -y nodejs

ENV REACT_NATIVE_PACKAGER_HOSTNAME="192.168.43.221"

EXPOSE 19000
EXPOSE 19001

COPY ./ /home/
WORKDIR /home

RUN npm i --unsafe-perm -g npm@latest expo-cli@latest
CMD [ "npm", "start" ]