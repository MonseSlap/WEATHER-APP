# Weather App 🌦️

Aplicación fullstack para consultar el clima de cualquier ciudad del mundo.

## Requisitos

- Node.js (v16+)
- Go (v1.18+)
- Una API key de [WeatherAPI](https://www.weatherapi.com/)

---

## Instalación

### 1. Clona el repositorio

```bash
git clone https://github.com/tuusuario/weather-app.git
cd weather-app
```


### 2. Configura el backend
```bash
go mod init weather-app
cd backend
cp .env.example .env # o crea el archivo .env
```
### Edita .env y coloca tu WEATHERAPI_KEY
```bash
go mod tidy
go run main.go
```
### 3. Configura el frontend
```bash
cd frontend
npm install
npm run dev
```

### Uso

Accede a http://localhost:5173 en tu navegador.
Escribe una ciudad y consulta el clima.

### Notas

El backend corre en el puerto 8080 por defecto.
El frontend corre en el puerto 5173 por defecto.
Asegúrate de tener la variable WEATHERAPI_KEY en el backend.

Licencia
MIT


---

### ¡Importante! **Incluye un `.env`**
Agrega un archivo `.env` en el backend con el siguiente contenido:

```env
WEATHERAPI_KEY=tu_api_key_aqui
SERVER_PORT=8080