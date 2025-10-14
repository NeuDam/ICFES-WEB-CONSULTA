import { useEffect, useState } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const [circles, setCircles] = useState([]);

  useEffect(() => {
    // Generar círculos decorativos aleatorios
    const generateCircles = () => {
      const newCircles = [];
      for (let i = 0; i < 8; i++) {
        newCircles.push({
          id: i,
          size: Math.random() * 250 + 100, // Tamaños más pequeños: 100-350px
          x: Math.random() * 100,
          y: Math.random() * 100,
          duration: Math.random() * 8 + 12, // Más rápido: 12-20s
          delay: Math.random() * 4,
          opacity: Math.random() * 0.5 + 0.3 // Más opacidad: 0.3-0.8
        });
      }
      setCircles(newCircles);
    };

    generateCircles();
  }, []);

  return (
    <div className="animated-background">
      {circles.map((circle) => (
        <div
          key={circle.id}
          className="floating-circle"
          style={{
            width: `${circle.size}px`,
            height: `${circle.size}px`,
            left: `${circle.x}%`,
            top: `${circle.y}%`,
            animationDuration: `${circle.duration}s`,
            animationDelay: `${circle.delay}s`,
            opacity: circle.opacity
          }}
        />
      ))}
    </div>
  );
};

export default AnimatedBackground;
