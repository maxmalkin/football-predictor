package api

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"

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
