#!/bin/bash
set -e

while getopts ":a:p:d:f:o:khxz" opt; do
  case $opt in
    a) auth_enabled="$OPTARG"; export auth=$auth_enabled
    ;;
    p) server_port="$OPTARG"; export server_port=$server_port
    ;;
    o) fe_port="$OPTARG"; export fe_port=$fe_port
    ;;
    d) server_domain="$OPTARG"; export server_domain=$server_domain
    ;;
    f) protocol="$OPTARG"; export protocol=$protocol
    ;;
    z) docker-compose --file deploy/prod/docker-compose.yml up --build --remove-orphans --force-recreate
    ;;
    x) docker-compose --file deploy/dev/docker-compose.yml up --build --remove-orphans
    ;;
    k) docker system prune
    ;;
    h) echo "Usage: `basename $0` 
    -a true | false -> enables jwt authentication.
    -p <number> eg:80 -> sets the backend server port.
    -o <number> eg:8000 -> sets the frontend server port. Only for development environment.
    -d <domain_string> eg:51.15.72.225 0-> sets the url of the server.
    -f <protocol_string> eg: http - sets the protocol string of the server.
    -x runs docker-compose up with dev config .
    -z runs docker-compose up with prod config.
    -k kills every container, image and volume, give you a clean slate. 
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

