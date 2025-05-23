import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../services/api';
import { Button, TextField, Box, Typography } from '@mui/material'; 
import { SimpleRainParticles, SimpleSnowParticles, SimpleMistParticles, SimpleSunRaysParticles } from './ParticleGenerator.jsx';

import '../App.css';
import '../index.css';

// Lógica para el tipo de partículas según la condición
function getParticlesComponent(condition) {
  if (!condition) return null;
  const cond = condition.toLowerCase();
  if (cond.includes('lluvia') || cond.includes('lluvia moderada a intervalos') || cond.includes('llovizna')) return <SimpleRainParticles active={true} />;
  if (cond.includes('nieve')) return <SimpleSnowParticles active={true} />;
  if (cond.includes('neblina') || cond.includes('bruma') || cond.includes('niebla moderada') || cond.includes('nublado')) return <SimpleMistParticles active={true} />;
  if (cond.includes('soleado') || cond.includes('despejado')) return <SimpleSunRaysParticles active={true} />;
  return null;
}

// Lógica para la clase de fondo según la condición
function getBackgroundClass(conditions) {
  if (!conditions) return 'default-bg';
  const cond = conditions.toLowerCase();
  if (cond.includes('soleado')) return 'sunny-bg';
  if (cond.includes('nublado') || cond.includes('cielo cubierto')) return 'cloudy-bg';
  if (cond.includes('lluvia') || cond.includes('lluvia moderada a intervalos') || cond.includes('llovizna')) return 'rainy-bg';
  if (cond.includes('tormenta')) return 'storm-bg';
  if (cond.includes('nieve')) return 'snow-bg';
  if (cond.includes('despejado')) return 'clear-bg';
  if (cond.includes('ligeras precipitaciones')) return 'little-precipitations-bg';
  if (cond.includes('neblina') || (cond.includes('niebla moderada'))) return 'mist-bg';
  return 'default-bg';
}

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');

  // Cambia la clase del body según el clima
  useEffect(() => {
    const className = weather ? getBackgroundClass(weather.conditions) : 'default-bg';
    document.body.className = className;
    return () => { document.body.className = ''; };
  }, [weather]);


  const handleSearch = async () => {
    const data = await fetchWeather(location);
    console.log('Respuesta del backend:', data);
    setWeather(data);
  };
  
  return (
    <>
      {/* Renderiza el componente de partículas según el clima */}
      {weather && getParticlesComponent(weather.conditions)}

      <Box p={4} className="info-box">
        <TextField
          label="Ubicación"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <Button className="button-search" onClick={handleSearch} variant="contained">
          Buscar
        </Button>
        {weather && (
          <Typography mt={2}>
            Clima en {weather.location}: {weather.temp}°C, Porcentaje de humedad: {weather.humidity}%, {weather.conditions}
          </Typography>
        )}
      </Box>
    </>
  );
}