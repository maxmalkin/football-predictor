package main

import (
	"log"

	"github.com/joho/godotenv"
	"github.com/maxmalkin/server/internal/api"
	"github.com/maxmalkin/server/internal/config"
)

func main() {
	// check that env file exists on entry
	config.LoadEnv()
	err := godotenv.Load()

	if(err != nil) {
		log.Fatal("No .env file found")
	}

	router := api.SetupRouter()
	log.Fatal(router.Run(":8080"))
}
