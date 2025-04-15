package api

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetFixtures(c *gin.Context) {
	date := c.Query("date")
	if date == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "date query param required"})
		return
	}

	fixtures, err := GetFixturesByDate(date)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "failed to fetch fixtures"})
		return
	}
	c.JSON(http.StatusOK, fixtures)
}
