package main

import (
	"encoding/json"
	"net/http"

	"os"

	"github.com/gorilla/mux"
	"github.com/monseslap/weather-app/config"
	"github.com/monseslap/weather-app/services"
	"github.com/rs/cors"
)

func main() {
	config.LoadEnv()
	r := mux.NewRouter()
	r.HandleFunc("/api/weather", GetWeather).Methods("GET")

	// Configura CORS para React (puerto 3000)
	handler := cors.New(cors.Options{
		AllowedOrigins: []string{"http://localhost:5173",
	"https://weather-monse-app.vercel.app"},
	}).Handler(r)

	port := os.Getenv("PORT")
if port == "" {
    port = "8080" // Valor por defecto para desarrollo local
}
http.ListenAndServe(":" + port, handler)
}

func GetWeather(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    location := r.URL.Query().Get("location")
    if location == "" {
        http.Error(w, `{"error":"location is required"}`, http.StatusBadRequest)
        return
    }

    weather, err := services.FetchWeather(location)
    if err != nil {
        http.Error(w, `{"error":"`+err.Error()+`"}`, http.StatusInternalServerError)
        return
    }

    json.NewEncoder(w).Encode(weather)
}