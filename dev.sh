#!/bin/bash
set -e

while getopts ":a:h" opt; do
  case $opt in
    a) auth_enabled="$OPTARG"
    ;;
		h) echo "	Usage: `basename $0` 
		-a true | false -> enables jwt authentication
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
export auth=$auth_enabled
docker-compose up --build --remove-orphans