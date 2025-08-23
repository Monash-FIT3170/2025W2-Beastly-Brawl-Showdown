#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

# Enable debug mode
set -x

ENV=$1

export BEASTLY_BRAWL_IMAGE="ghcr.io/fit3170-beastly-brawl/beastly-brawl-${ENV}:latest"

cd ~/deployment

# Restart containers with updated image
docker compose down
docker compose up -d

# Disable debug mode
set +x