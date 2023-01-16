#!/usr/bin/env bash

PROJECT_NAME="24eksamen"
DROPLET_URL="68.183.74.244"

echo "##############################"
echo "Building the frontend project"
echo "##############################"
npm run build 

echo "##############################"
echo "Deploying Frontend project..."
echo "##############################"

scp -r ./dist/* root@$DROPLET_URL:/var/www/$PROJECT_NAME