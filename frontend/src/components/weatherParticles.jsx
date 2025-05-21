import React from "react";
import Particles from "react-tsparticles";
import '../App.css'

export default function WeatherParticles({ type }) {
  let options = {
    particles: {
      number: { value: 100 },
      color: { value: "#fff" },
      shape: { type: "circle" },
      opacity: { value: 0.8 },
      size: { value: 3 },
      move: { direction: "bottom", speed: 2 }
    }
  };
  console.log("WeatherParticles type:", type);

  if (type === "lluvia" || type === "parcialmente nublado") {
    options = {
      particles: {
        number: { value: 80 },
        color: { value: "#2196f3" },
        shape: { type: "circle" },
        opacity: { value: 0.5 },
        size: { value: 2 },
        move: { direction: "bottom", speed: 6 }
      }
    };
  } else if (type === "nieve") {
    options = {
      particles: {
        number: { value: 60 },
        color: { value: "#fff" },
        shape: { type: "circle" },
        opacity: { value: 0.8 },
        size: { value: 3 },
        move: { direction: "bottom", speed: 2 }
      }
    };
  } else if (type === "tormenta") {
    options = {
      particles: {
        number: { value: 40 },
        color: { value: "#f5f242" },
        shape: { type: "triangle" },
        opacity: { value: 0.7 },
        size: { value: 4 },
        move: { direction: "bottom", speed: 8 }
      }
    };
  } else if (type === "neblina") {
    options = {
      particles: {
        number: { value: 100 },
        color: { value: "#bdbdbd" },
        shape: { type: "circle" },
        opacity: { value: 0.2 },
        size: { value: 8 },
        move: { direction: "bottom", speed: 1 }
      }
    }; 
  } else {
    // Por defecto, sin partículas
    options = { 
      particles: {
       number: { value: 0 }
  }};
  }

  return (
    <Particles
      id="tsparticles"
      options={options}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none"
      }}
    />
  );
}