package main

import (
	"log"
	"os"

	"github.com/joho/godotenv"
	"github.com/maxmalkin/server/internal/api"
	"github.com/maxmalkin/server/internal/config"
)

func main() {
	config.LoadEnv()
	err := godotenv.Load()

	if(err != nil) {
		log.Fatal("No .env file found")
	}

	footballApiKey := os.Getenv("FOOTBALL_API_KEY")

	router := api.SetupRouter()
	log.Fatal(router.Run(":8080"))
}
