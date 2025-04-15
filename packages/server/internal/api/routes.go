package api

import (
	"fmt"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func SetupRouter() *gin.Engine {
	router := gin.Default()

	clientHost := os.Getenv("CLIENT_HOST")
	clientPort := os.Getenv("CLIENT_PORT")

	allowedOrigin := fmt.Sprintf("%s:%s", clientHost, clientPort)

	// CORS config
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{allowedOrigin},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Authorization"},
		ExposeHeaders:    []string{"Content-Length"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// routes
	router.POST("/fixtures", GetFixtures)
	router.GET("/teams", GetTeams)
	router.GET("/leagues", GetLeagues)

	return router
}
