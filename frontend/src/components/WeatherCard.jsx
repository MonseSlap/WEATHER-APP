import React, { useState, useEffect } from 'react';
import { fetchWeather } from '../services/api';
import { Button, TextField, Box, Typography } from '@mui/material';
import '../App.css';
import '../index.css'



function getBackgroundClass(conditions) {
  if (!conditions) return '';
  const cond = conditions.toLowerCase();
  if (cond.includes('soleado')) return 'sunny-bg';
  if (cond.includes('nublado') || cond.includes('cielo cubierto')) return 'cloudy-bg';
  if (cond.includes('lluvia') || cond.includes('Lluvia moderada a intervalos')) return 'rainy-bg';
  if (cond.includes('tormenta')) return 'storm-bg';
  if (cond.includes('nieve')) return 'snow-bg';
  if (cond.includes('despejado')) return 'clear-bg';
  if (cond.includes('ligeras precipitaciones')) return 'little-precipitations-bg';
  if (cond.includes('neblina')) return 'mist-bg';

  return 'default-bg';
}

export default function WeatherCard() {
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const className = weather ? getBackgroundClass(weather.conditions) : 'default-bg';
    document.body.className = className;
    // Limpia la clase al desmontar el componente
    return () => { document.body.className = ''; };
  }, [weather]);

  const handleSearch = async () => {
    const data = await fetchWeather(location);
    console.log('Respuesta del backend:', data);
    setWeather(data);
  };

  return (
    <Box p={4}
    className={`${weather ? getBackgroundClass(weather.conditions) : 'default-bg'} info-box`}>
      <TextField 
        label="Ubicación" 
        value={location} 
        onChange={(e) => setLocation(e.target.value)} 
      />
      <Button className='button-search' onClick={handleSearch} variant="contained">Buscar</Button>
      
      {weather && (
        <Typography mt={2}>
          Clima en {weather.location}: {weather.temp}°C, Porcentaje de humedad: {weather.humidity}%, {weather.conditions}
        </Typography>
      )}
    </Box>
  );
}