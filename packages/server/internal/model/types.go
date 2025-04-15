package model

type FixturesResponse struct {
	Response []struct {
		Fixture struct {
			ID   int    `json:"id"`
			Date string `json:"date"`
		} `json:"fixture"`
		Teams struct {
			Home struct {
				Name string `json:"name"`
			} `json:"home"`
			Away struct {
				Name string `json:"name"`
			} `json:"away"`
		} `json:"teams"`
	} `json:"response"`
}