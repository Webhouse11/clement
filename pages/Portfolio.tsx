import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useData } from '../context/DataContext';

const Portfolio: React.FC = () => {
  const { portfolio } = useData();

  return (
    <div className="pt-20 bg-white min-h-screen">
      {/* Header with Suit Image */}
      <div className="relative bg-brand-dark py-24">
         <div className="absolute inset-0 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover object-top opacity-30" alt="Background" />
             <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/90 to-brand-dark/40"></div>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Selected Work</h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto">A showcase of digital transformation and impactful branding.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {portfolio.map((project) => (
            <div key={project.id} className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100 flex flex-col h-full">
              <div className="relative overflow-hidden h-48">
                <div className="absolute inset-0 bg-brand-dark opacity-0 group-hover:opacity-30 transition-opacity z-10"></div>
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <div className="text-xs font-bold text-brand-secondary uppercase tracking-wider mb-2">{project.category}</div>
                <h3 className="text-xl font-bold text-brand-dark mb-2">{project.title}</h3>
                <p className="text-slate-600 text-sm mb-4 flex-grow">{project.description}</p>
                <div className="bg-brand-light p-3 rounded-lg mb-4">
                  <span className="text-xs font-bold text-brand-primary block mb-1">Impact:</span>
                  <p className="text-sm font-medium text-slate-800">{project.result}</p>
                </div>
                <button className="flex items-center justify-center w-full py-2 border border-brand-primary text-brand-primary rounded-md hover:bg-brand-primary hover:text-white transition-colors text-sm font-semibold">
                  View Case Study <ExternalLink size={14} className="ml-2" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
