package services

import (
	"github.com/monseslap/weather-app/clients"
	"github.com/monseslap/weather-app/models"
)

func FetchWeather(location string) (*models.WeatherResponse, error) {
	weatherData, err := clients.GetWeatherAPIData(location)
	if err != nil {
		return nil, err
	}

	response := &models.WeatherResponse{
		Location:    weatherData.Location.Name,
		Temperature: weatherData.Current.TempC,
		Humidity:    weatherData.Current.Humidity,
		Conditions:  weatherData.Current.Condition.Text,
	}

	return response, nil
}