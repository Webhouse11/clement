import React from 'react';
import { Target, Heart, Zap, Award } from 'lucide-react';
import { useData } from '../context/DataContext';

const About: React.FC = () => {
  const { aboutData } = useData();

  // Helper to split text by double newlines into paragraphs
  const paragraphs = aboutData.introText.split('\n\n');

  return (
    <div className="pt-20">
      {/* Hero */}
      <section className="bg-brand-light py-20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-100 transform skew-x-12 translate-x-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-dark mb-6">
                {aboutData.heroTitle}
              </h1>
              <p className="text-xl text-slate-600 font-medium italic mb-8 border-l-4 border-brand-secondary pl-4">
                {aboutData.heroSubtitle}
              </p>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                {paragraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-all duration-500 group">
                <img 
                    src={aboutData.heroImage} 
                    alt="Clement Motivates" 
                    className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-brand-dark/90 to-transparent text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="font-serif font-bold text-xl">Clement Motivates Studio</p>
                    <p className="text-sm text-brand-secondary font-medium">Where Vision Meets Execution</p>
                </div>
              </div>
              {/* Decorative background element */}
              <div className="absolute -z-10 top-6 -right-6 w-full h-full bg-brand-secondary/10 rounded-2xl transform rotate-3"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-brand-dark">My Philosophy</h2>
            <p className="text-slate-500 mt-2">The core values that drive every project.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Target size={32} />, title: "Growth", desc: "Constant improvement and scaling new heights." },
              { icon: <Zap size={32} />, title: "Innovation", desc: "Leveraging the latest tech to solve problems." },
              { icon: <Heart size={32} />, title: "Authenticity", desc: "Building brands that are real and relatable." },
              { icon: <Award size={32} />, title: "Excellence", desc: "Delivering high-quality results, always." }
            ].map((value, idx) => (
              <div key={idx} className="text-center p-6 border border-slate-100 rounded-xl hover:shadow-lg transition-shadow group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-light text-brand-secondary group-hover:bg-brand-secondary group-hover:text-white transition-colors rounded-full mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-bold text-brand-dark mb-2">{value.title}</h3>
                <p className="text-slate-600 text-sm">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Stats */}
      <section className="bg-brand-dark py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-primary opacity-20"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {aboutData.stats.map((stat, idx) => (
                <div key={idx}>
                    <div className="text-4xl font-bold text-brand-accent mb-2">{stat.value}</div>
                    <div className="text-sm text-slate-400 uppercase tracking-wide">{stat.label}</div>
                </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;