#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Enable debug mode
set -x

cd ~/deployment

GITHUB_PACKAGES_TOKEN=$1

echo "${GITHUB_PACKAGES_TOKEN}" | docker login ghcr.io -u fit3170-beastly-brawl --password-stdin 

# Get the latest image from GHCR
docker compose pull

# Restart containers with updated image
docker compose down
docker compose up -d

# Disable debug mode
set +x