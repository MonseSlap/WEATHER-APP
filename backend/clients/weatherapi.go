package clients

import (
	"encoding/json"
	"errors"
	"fmt"
	"net/http"

	"github.com/monseslap/weather-app/config"
)

type WeatherAPIResponse struct {
	Location struct {
		Name string `json:"name"`
	} `json:"location"`
	Current struct {
		TempC      float64 `json:"temp_c"`
		Humidity   int     `json:"humidity"`
		Condition  struct {
			Text string `json:"text"`
		} `json:"condition"`
	} `json:"current"`
}

func GetWeatherAPIData(location string) (*WeatherAPIResponse, error) {
	apiKey := config.Get("WEATHERAPI_KEY")
	if apiKey == "" {
		return nil, errors.New("WEATHERAPI_KEY not set in configuration")
	}

	url := fmt.Sprintf("http://api.weatherapi.com/v1/current.json?key=%s&q=%s&lang=es", apiKey, location)

	resp, err := http.Get(url)
	if err != nil {
		return nil, fmt.Errorf("error calling WeatherAPI: %v", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("WeatherAPI returned status: %s", resp.Status)
	}

	var data WeatherAPIResponse
	if err := json.NewDecoder(resp.Body).Decode(&data); err != nil {
		return nil, fmt.Errorf("error decoding JSON: %v", err)
	}

	return &data, nil
}