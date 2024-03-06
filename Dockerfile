FROM node:18.19.0-slim as build
WORKDIR /app
COPY . /app

FROM postgres:latest as db
RUN apt-get update
RUN apt-get -y install python3 postgresql-contrib postgresql-plpython3-13
