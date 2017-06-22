#!/bin/bash
set -e
skip_frontend=$1
if [ -z $skip_frontend ]; then 
	cd ./frontend 
	npm run build-prod
	cd ..
fi 
docker-compose --file docker-compose-prod.yml up --build --remove-orphans
