#!/bin/bash
set -e

while getopts ":a:pdkh" opt; do
  case $opt in
    a) auth_enabled="$OPTARG"; export auth=$auth_enabled
    ;;
    p) docker-compose --file deploy/prod/docker-compose-prod.yml up --build --remove-orphans --force-recreate
    ;;
    d) docker-compose --file deploy/dev/docker-compose.yml up --build --remove-orphans --force-recreate
    ;;
    k) docker-compose down
    ;;
    h) echo "	Usage: `basename $0` 
    -a true | false -> enables jwt authentication
    -d runs docker-compose up with dev config 
    -p runs docker-compose up with prod config
    -k kills docker-compose services
    -h shows this "
    exit 1
		;;
    \?) echo "Invalid option -$OPTARG" >&2
		exit 1
    ;;
 		:) echo "Option -$OPTARG requires an argument." >&2
      exit 1
    ;;
  esac
done

