#!/bin/bash

concurrently \
  -n "client,server,model" \
  -c "cyan,green,yellow" \
  "cd packages/client && bun run dev" \
  "cd packages/server && reflex -c reflex.conf" \
  "cd packages/model && cargo watch -x run"
