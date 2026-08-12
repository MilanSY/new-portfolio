#!/bin/sh
set -eu

APP_DIR="/home/milan/apps/new-portfolio"
COMPOSE_FILE="/home/milan/docker-compose.server.yml"

cd "$APP_DIR"
git pull --ff-only
cd /home/milan
docker compose -f "$COMPOSE_FILE" up -d --build portfolio-app
