package main

import (
	"fmt"
	"log"
	"os"

	"github.com/maxmalkin/server/internal/api"
	"github.com/maxmalkin/server/internal/config"
)

func main() {
	// exit if env not found
	config.LoadEnv()

	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8080"
	}

	// Setup gin router
	router := api.SetupRouter()

	// Start server on given port
	addr := fmt.Sprintf(":%s", port)
	log.Printf("Server running on http://localhost%s\n", addr)
	if err := router.Run(addr); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}