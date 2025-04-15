#!/bin/bash

ROOT_DIR=$(dirname "$0")
cd "$ROOT_DIR"

echo "Starting all packages"

# Run Vite
(cd packages/client && bun run dev) &

# Run Go
(cd pacakges/server && go run main.go) &

# Run Rust ML 
(cd packages/model && cargo run) &

wait