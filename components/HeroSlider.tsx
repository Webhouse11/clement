import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const HeroSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { heroSlides } = useData();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-brand-dark">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 w-full h-full"
        >
          {/* Background Image with Overlay */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentIndex].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/90 via-brand-dark/60 to-brand-primary/40" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`max-w-2xl text-white ${
              heroSlides[currentIndex].align === 'center' ? 'mx-auto text-center' : 
              heroSlides[currentIndex].align === 'right' ? 'ml-auto text-right' : 'mr-auto text-left'
            }`}
          >
            <div className={`inline-block px-4 py-1.5 rounded-full bg-brand-secondary/20 border border-brand-secondary/40 mb-6 backdrop-blur-sm ${
               heroSlides[currentIndex].align === 'center' ? 'mx-auto' : heroSlides[currentIndex].align === 'right' ? 'ml-auto' : ''
            }`}>
              <span className="text-brand-secondary text-sm font-bold tracking-widest uppercase">Clement Motivates Studio</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif font-bold leading-tight mb-6">
              {heroSlides[currentIndex].title}
            </h1>
            <p className="text-lg md:text-xl text-slate-200 mb-10 leading-relaxed font-light">
              {heroSlides[currentIndex].subtitle}
            </p>
            <div className={`flex flex-wrap gap-4 ${
               heroSlides[currentIndex].align === 'center' ? 'justify-center' : heroSlides[currentIndex].align === 'right' ? 'justify-end' : ''
            }`}>
              <Link 
                to={heroSlides[currentIndex].link} 
                className="px-8 py-4 bg-brand-accent hover:bg-amber-600 text-white rounded-lg font-bold transition-all shadow-lg flex items-center group"
              >
                {heroSlides[currentIndex].cta}
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link 
                to="/contact" 
                className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 rounded-lg font-bold transition-all"
              >
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-brand-accent w-10' : 'bg-white/50 hover:bg-white'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
