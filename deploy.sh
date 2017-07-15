#!/bin/bash
set -e
docker-compose --file ./deploy/prod/docker-compose.yml up --build --remove-orphans --force-recreate
