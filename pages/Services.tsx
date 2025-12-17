import React from 'react';
import { Code, User, TrendingUp, MonitorPlay, CheckCircle2, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useData } from '../context/DataContext';

const Services: React.FC = () => {
  const { services } = useData();

  // Helper to map icon string name to Component
  const getIcon = (name: string | undefined) => {
    switch(name) {
      case 'User': return <User className="w-8 h-8" />;
      case 'Code': return <Code className="w-8 h-8" />;
      case 'MonitorPlay': return <MonitorPlay className="w-8 h-8" />;
      case 'TrendingUp': return <TrendingUp className="w-8 h-8" />;
      default: return <Code className="w-8 h-8" />;
    }
  };

  return (
    <div className="pt-20 bg-slate-50 min-h-screen">
      {/* Header with Laptop Image */}
      <div className="bg-brand-dark relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary opacity-20"></div>
        <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col justify-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-serif font-bold mb-6 text-white">Expert Services</h1>
                    <p className="text-xl text-slate-300 max-w-lg">
                        Strategic solutions designed to take you from where you are to where you want to be. We combine code, creativity, and strategy.
                    </p>
                </div>
                <div className="h-64 lg:h-auto w-full relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-brand-dark to-transparent z-10 lg:hidden"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark to-transparent z-10 lg:hidden"></div>
                    <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-brand-dark to-transparent z-10 hidden lg:block"></div>
                    <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2000" alt="Working on laptop" className="w-full h-full object-cover" />
                </div>
            </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {services.map((service, index) => (
          <div key={service.id} className={`bg-white rounded-2xl shadow-lg overflow-hidden flex flex-col lg:flex-row ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
            
            {/* Header / Intro Section */}
            <div className="lg:w-1/3 bg-brand-light p-8 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-100">
              <div className="p-3 bg-brand-secondary text-white rounded-lg w-fit mb-6 shadow-lg">
                {getIcon(service.iconName)}
              </div>
              <h2 className="text-2xl font-bold text-brand-dark mb-2">{service.title}</h2>
              <p className="text-brand-accent font-medium mb-6">{service.tagline}</p>
              <a 
                href="https://wa.link/xjujpe" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-bold text-brand-primary hover:underline"
              >
                Book this Service <ArrowRight size={16} className="ml-1" />
              </a>
            </div>

            {/* The Framework Section */}
            <div className="lg:w-2/3 p-8 lg:p-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Problem */}
                <div className="space-y-3">
                  <div className="text-red-500 font-bold text-sm uppercase tracking-wider flex items-center">
                    <span className="w-2 h-2 rounded-full bg-red-500 mr-2"></span> The Problem
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.problem}</p>
                </div>

                {/* Solution */}
                <div className="space-y-3">
                  <div className="text-brand-secondary font-bold text-sm uppercase tracking-wider flex items-center">
                    <span className="w-2 h-2 rounded-full bg-brand-secondary mr-2"></span> The Solution
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.solution}</p>
                </div>

                {/* Outcome */}
                <div className="space-y-3">
                  <div className="text-green-600 font-bold text-sm uppercase tracking-wider flex items-center">
                    <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span> The Outcome
                  </div>
                  <p className="text-slate-800 font-medium text-sm leading-relaxed bg-green-50 p-3 rounded-lg border border-green-100">
                    <CheckCircle2 size={16} className="inline mr-1 text-green-600" />
                    {service.outcome}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-brand-accent py-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Not sure which service you need?</h2>
          <a 
            href="https://wa.link/xjujpe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-white text-brand-accent rounded-full font-bold hover:bg-slate-100 transition-colors"
          >
            Get a Free 15-min Clarity Call
          </a>
        </div>
      </div>
    </div>
  );
};

export default Services;