import React, { useRef, useEffect } from "react";
import Photo from '../assets/PhotoProfile.png'

function randomBetween(a, b) {
  return a + Math.random() * (b - a);
}

export function SimpleRainParticles({ active }) {
  const canvasRef = useRef();
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // Inicializa partículas
    if (active) {
      particles.current = Array.from({ length: 100 }, () => ({
        x: randomBetween(0, width),
        y: randomBetween(0, height),
        l: randomBetween(10, 20),
        xs: randomBetween(-2, 2),
        ys: randomBetween(4, 10)
      }));
    } else {
      particles.current = [];
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "#2196f3";
      ctx.lineWidth = 1.5;
      ctx.globalAlpha = 0.6;
      for (let p of particles.current) {
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(p.x + p.xs, p.y + p.l);
        ctx.stroke();
        p.x += p.xs;
        p.y += p.ys;
        if (p.y > height) {
          p.x = randomBetween(0, width);
          p.y = -20;
        }
      }
      animationId = requestAnimationFrame(draw);
    }

    if (active) draw();

    return () => cancelAnimationFrame(animationId);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
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

export function SimpleSnowParticles({ active }) {
    const canvasRef = useRef();
    const particles = useRef([]);
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let animationId;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
  
      if (active) {
        particles.current = Array.from({ length: 80 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          r: Math.random() * 3 + 2,
          ys: Math.random() * 1.5 + 0.5
        }));
      } else {
        particles.current = [];
      }
  
      function draw() {
        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = "#fff";
        ctx.globalAlpha = 0.8;
        for (let p of particles.current) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
          ctx.fill();
          p.y += p.ys;
          if (p.y > height) {
            p.x = Math.random() * width;
            p.y = -10;
          }
        }
        animationId = requestAnimationFrame(draw);
      }
  
      if (active) draw();
  
      return () => cancelAnimationFrame(animationId);
    }, [active]);
  
    return (
      <canvas
        ref={canvasRef}
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

export function SimpleMistParticles({ active }) {
  const canvasRef = useRef();
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    if (active) {
      particles.current = Array.from({ length: 40 }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 30 + 20,
        xs: Math.random() * 0.5 - 0.25
      }));
    } else {
      particles.current = [];
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "#bdbdbd";
      ctx.globalAlpha = 0.08;
      for (let p of particles.current) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fill();
        p.x += p.xs;
        if (p.x > width) p.x = -p.r;
        if (p.x < -p.r) p.x = width + p.r;
      }
      animationId = requestAnimationFrame(draw);
    }

    if (active) draw();

    return () => cancelAnimationFrame(animationId);
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
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

export function SimpleSunRaysParticles({ active }) {
    const canvasRef = useRef();
  
    useEffect(() => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      let animationId;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
  
      let angle = 0;
  
      function draw() {
        ctx.clearRect(0, 0, width, height);
  
        // Sol (círculo amarillo)
        const sunSize = Math.min(width, height) * 0.15;
        const sunX = width - sunSize * 1.2;
        const sunY = sunSize * 0.7;
  
        ctx.save();
        ctx.globalAlpha = 0.95;
        ctx.beginPath();
        ctx.arc(sunX + sunSize / 2, sunY + sunSize / 2, sunSize / 2, 0, 2 * Math.PI);
        ctx.fillStyle = "#ffe259";
        ctx.shadowColor = "#ffe259";
        ctx.shadowBlur = 40;
        ctx.fill();
        ctx.restore();
  
        // Rayos animados
        ctx.save();
        ctx.strokeStyle = "#ffe259";
        ctx.globalAlpha = 0.4;
        ctx.lineWidth = sunSize * 0.07;
        for (let i = 0; i < 12; i++) {
          const rayAngle = angle + (i * Math.PI) / 6;
          ctx.beginPath();
          ctx.moveTo(
            sunX + sunSize / 2 + Math.cos(rayAngle) * sunSize * 0.7,
            sunY + sunSize / 2 + Math.sin(rayAngle) * sunSize * 0.7
          );
          ctx.lineTo(
            sunX + sunSize / 2 + Math.cos(rayAngle) * sunSize * 1.1,
            sunY + sunSize / 2 + Math.sin(rayAngle) * sunSize * 1.1
          );
          ctx.stroke();
        }
        ctx.restore();
  
        angle += 0.01;
        animationId = requestAnimationFrame(draw);
      }
  
      if (active) draw();
  
      return () => cancelAnimationFrame(animationId);
    }, [active]);
  
    return (
      <canvas
        ref={canvasRef}
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