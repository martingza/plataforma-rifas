import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import ParticleBackground from './animations/ParticleBackground';

const HeroDinamico = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      title: '🎉 Rifas en Vivo',
      subtitle: 'Participa en rifas emocionantes y gana premios increíbles',
      emoji: '🎰',
    },
    {
      title: '🏆 Premios Exclusivos',
      subtitle: 'Descubre rifas con los mejores premios del mercado',
      emoji: '💎',
    },
    {
      title: '⚡ Sorteos Transparentes',
      subtitle: 'Resultados en tiempo real con total transparencia',
      emoji: '🎯',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Fondo gradiente animado */}
      <div className="absolute inset-0 gradient-animated opacity-90" />

      {/* Partículas */}
      <ParticleBackground count={20} />

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.5 }}
          >
            {/* Emoji grande */}
            <motion.div
              className="mb-6"
              animate={{ 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                repeatDelay: 1 
              }}
            >
              <span className="text-8xl md:text-9xl inline-block">
                {slides[currentSlide].emoji}
              </span>
            </motion.div>

            {/* Título */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-white mb-4 neon-text">
              {slides[currentSlide].title}
            </h1>

            {/* Subtítulo */}
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 mb-8">
              {slides[currentSlide].subtitle}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Botones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <Link
            to="/rifas"
            className="px-8 py-4 bg-white text-indigo-600 font-bold rounded-xl 
                       hover-lift hover-scale text-lg shadow-xl"
          >
            🎫 Ver Rifas Activas
          </Link>
          <Link
            to="/crear-rifa"
            className="px-8 py-4 bg-transparent border-2 border-white text-white 
                       font-bold rounded-xl hover:bg-white/10 hover-lift text-lg 
                       transition-all duration-300"
          >
            ➕ Crear Rifa
          </Link>
        </motion.div>

        {/* Indicadores */}
        <div className="flex justify-center gap-3 mt-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-3 rounded-full transition-all duration-300 ${
                currentSlide === index
                  ? 'bg-white w-8'
                  : 'bg-white/40 w-3 hover:bg-white/60'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Ola decorativa */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full">
          <path
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L0,120Z"
            fill="#0f172a"
          />
        </svg>
      </div>
    </div>
  );
};

export default HeroDinamico;