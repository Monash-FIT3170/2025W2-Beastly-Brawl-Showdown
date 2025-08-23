#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Enable debug mode
set -x

GITHUB_PACKAGES_TOKEN=$1
ENV=$2

export BEASTLY_BRAWL_IMAGE="ghcr.io/fit3170-beastly-brawl/beastly-brawl-${ENV}:latest"

cd ~/deployment

echo "${GITHUB_PACKAGES_TOKEN}" | docker login ghcr.io -u fit3170-beastly-brawl --password-stdin 

# Get the latest image from GHCR
docker compose pull

# Restart containers with updated image
docker compose down
docker compose up -d

# Disable debug mode
set +x