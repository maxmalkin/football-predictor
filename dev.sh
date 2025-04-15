#!/bin/bash

export PATH="$PATH:$(go env GOPATH)/bin"

concurrently \
  -n "client,server,model" \
  -c "cyan,green,yellow" \
  "cd packages/client && bun run dev" \
  "cd packages/server && reflex -r '\\.go$' --start-service -- sh -c 'go run main.go'" \
  "cd packages/model && cargo watch -x run"