#!/bin/bash

concurrently \
  -n "client,server,model" \
  -c "cyan,green,yellow" \
  "cd packages/client && bun run dev" \
  "cd packages/server && go run main.go" \
  "cd packages/model && cargo run"
