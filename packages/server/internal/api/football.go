package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/maxmalkin/server/internal/model"
)

const baseURL = "https://v3.football.api-sports.io"

func GetFixturesByDate(date string) (*model.FixturesResponse, error) {
	url := fmt.Sprintf("%s/fixtures?date=%s", baseURL, date)
	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("x-apisports-key", os.Getenv("FOOTBALL_API_KEY"))
	req.Header.Add("x-rapidapi-host", "v3.football.api-sports.io")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	var result model.FixturesResponse
	if err := json.Unmarshal(body, &result); err != nil {
		return nil, err
	}
	return &result, nil
}

func GetTeams(c *gin.Context) {
	league := c.Query("league")
	season := c.Query("season")

	if league == "" || season == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "league and season are required query params"})
		return
	}

	url := fmt.Sprintf("%s/teams?league=%s&season=%s", baseURL, league, season)

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("x-apisports-key", os.Getenv("FOOTBALL_API_KEY"))
	req.Header.Add("x-rapidapi-host", "v3.football.api-sports.io")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch teams"})
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	type APIResponse struct {
		Response []struct {
			Team struct {
				ID   int    `json:"id"`
				Name string `json:"name"`
				Logo string `json:"logo"`
			} `json:"team"`
		} `json:"response"`
	}

	var result APIResponse
	if err := json.Unmarshal(body, &result); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid team data"})
		return
	}

	var teams []map[string]interface{}
	for _, entry := range result.Response {
		teams = append(teams, map[string]interface{}{
			"id":   entry.Team.ID,
			"name": entry.Team.Name,
			"logo": entry.Team.Logo,
		})
	}

	c.JSON(http.StatusOK, gin.H{"teams": teams})
}

func GetLeagues(c *gin.Context) {
  url := "https://v3.football.api-sports.io/leagues"
  req, _ := http.NewRequest("GET", url, nil)
  req.Header.Add("x-apisports-key", os.Getenv("FOOTBALL_API_KEY"))
  req.Header.Add("x-rapidapi-host", "v3.football.api-sports.io")

  resp, err := http.DefaultClient.Do(req)
  if err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch leagues"})
    return
  }
  defer resp.Body.Close()

  body, _ := io.ReadAll(resp.Body)

  type APIResponse struct {
    Response []struct {
      League struct {
        ID   int    `json:"id"`
        Name string `json:"name"`
      } `json:"league"`
      Seasons []struct {
        Year int `json:"year"`
      } `json:"seasons"`
    } `json:"response"`
  }

  var result APIResponse
  if err := json.Unmarshal(body, &result); err != nil {
    c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid league data"})
    return
  }

  var leagues []map[string]interface{}
  for _, entry := range result.Response {
    var seasons []int
    for _, season := range entry.Seasons {
      seasons = append(seasons, season.Year)
    }
    leagues = append(leagues, map[string]interface{}{
      "id":      entry.League.ID,
      "name":    entry.League.Name,
      "seasons": seasons,
    })
  }

  c.JSON(http.StatusOK, gin.H{"leagues": leagues})
}

func GetTeamSeasons(c *gin.Context) {
	team := c.Query("team")
	if team == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "team is required query param"})
		return
	}

	url := fmt.Sprintf("%s/teams/seasons?team=%s", baseURL, team)

	req, _ := http.NewRequest("GET", url, nil)
	req.Header.Add("x-apisports-key", os.Getenv("FOOTBALL_API_KEY"))
	req.Header.Add("x-rapidapi-host", "v3.football.api-sports.io")

	resp, err := http.DefaultClient.Do(req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch team seasons"})
		return
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	type APIResponse struct {
		Response []int `json:"response"`
	}

	var result APIResponse
	if err := json.Unmarshal(body, &result); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to parse response"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"seasons": result.Response})
}


