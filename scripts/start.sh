#!/bin/bash

# Start the Crayon UI renderer app
# This script should be run from the skill directory

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
APP_DIR="$SCRIPT_DIR/../app"

echo "Starting Crayon UI Renderer..."
echo "The app will be available at http://localhost:5500"
echo ""

cd "$APP_DIR"

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

# Create the response directory if it doesn't exist
mkdir -p ~/.crayon

# Start the dev server
npm run dev
