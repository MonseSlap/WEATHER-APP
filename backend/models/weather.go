package models

// WeatherResponse: Estructura normalizada para tu API
type WeatherResponse struct {
    Location    string  `json:"location"`    // Ej: "Mexico City"
    Temperature float64 `json:"temp"`        // En °C
    Humidity    int     `json:"humidity"`    // En %
    Conditions  string  `json:"conditions"`  // Ej: "Partly cloudy"
    WindSpeed   float64 `json:"wind_speed,omitempty"`  // Opcional (km/h)
}

// WeatherAPIResponse: Estructura para mapear la respuesta de WeatherAPI.com
// (Usada internamente en clients/weatherapi.go)
type WeatherAPIResponse struct {
    Location struct {
        Name string `json:"name"`
    } `json:"location"`
    Current struct {
        TempC     float64 `json:"temp_c"`
        Humidity  int     `json:"humidity"`
        Condition struct {
            Text string `json:"text"`
        } `json:"condition"`
        WindKph float64 `json:"wind_kph"`
    } `json:"current"`
}