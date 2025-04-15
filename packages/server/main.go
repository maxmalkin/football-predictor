package main

import (
	"log"

	"main/services/config"

	"github.com/maxmalkin/football-predictor/packages/server/services/api"
)

func main() {
	config.LoadEnv()
	router := api.SetupRouter()
	log.Fatal(router.Run(":8080"))
}