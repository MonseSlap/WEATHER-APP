import React, { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

// Reemplaza con tu propia API key de WeatherAPI
const WEATHERAPI_KEY = '10abc89e3b094d65b4032320251505';

export default function CityAutocomplete({ onSelect }) {
  const [options, setOptions] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = async (event, value) => {
    setInput(value);
    if (value.length < 2) return; // Espera al menos 2 letras
    try {
      const res = await fetch(
        `http://api.weatherapi.com/v1/search.json?key=${WEATHERAPI_KEY}&q=${value}`
      );
      const data = await res.json();
      setOptions(data.map(city => city.name));
    } catch {
      setOptions([]);
    }
  };

  return (
    <Autocomplete
      freeSolo
      options={options}
      inputValue={input}
      onInputChange={handleInputChange}
      onChange={(e, value) => onSelect(value)}
      renderInput={(params) => <TextField {...params} label="Ciudad" />}
    />
  );
}