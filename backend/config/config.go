package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

func LoadEnv() {
    if err := godotenv.Load(); err != nil {
        log.Println("Warning: .env file not found (this is normal in production)")
    }
}
func Get(key string) string {
    return os.Getenv(key)
}