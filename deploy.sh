#!/bin/bash
set -e
docker-compose --file docker-compose-prod.yml up --build --remove-orphans
