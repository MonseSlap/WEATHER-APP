package main

import (
	"encoding/json"
	"log"
	"net/http"

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

	log.Println("Server running on :8080")
	http.ListenAndServe(":8080", handler)
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