import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Code, Megaphone, TrendingUp, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroSlider from '../components/HeroSlider';

const Home: React.FC = () => {
  return (
    <div className="w-full overflow-hidden">
      {/* Hero Slider */}
      <HeroSlider />

      {/* Introduction */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-4 border-slate-100">
                {/* Replaced broken local image with Unsplash: Working at desk */}
                <img 
                  src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=2000" 
                  alt="Clement working at desk" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 z-20 bg-brand-primary p-6 rounded-xl shadow-xl text-white max-w-xs hidden sm:block">
                <div className="flex items-center space-x-2 mb-2">
                  <Star fill="currentColor" className="text-brand-accent" />
                  <span className="font-bold text-lg">Results Driven</span>
                </div>
                <p className="text-sm text-blue-100">"We don't just build websites; we build engines for growth."</p>
              </div>
            </motion.div>

            <div className="space-y-6">
              <h2 className="text-4xl font-serif font-bold text-brand-dark">
                Bridging the Gap Between <span className="text-brand-secondary">Vision</span> and <span className="text-brand-accent">Reality</span>
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                More than just a developer, I am a strategic partner in your growth. With a unique blend of technical expertise and motivational leadership, I help you execute your vision digitally.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you need a high-performance website, a personal brand makeover, or a strategy to scale your sales, my studio is dedicated to your success.
              </p>
              <Link to="/about" className="inline-flex items-center px-6 py-3 bg-brand-light text-brand-primary font-bold rounded-lg hover:bg-slate-200 transition-colors">
                Read My Full Story <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif font-bold text-brand-dark mb-4">Core Services</h2>
            <p className="text-slate-600">Comprehensive solutions for your digital growth.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Code size={40} />,
                title: "Web & Digital Solutions",
                desc: "Custom websites and apps built for performance and conversion."
              },
              {
                icon: <Megaphone size={40} />,
                title: "Personal Branding",
                desc: "Crafting a powerful narrative that positions you as an authority."
              },
              {
                icon: <TrendingUp size={40} />,
                title: "Growth Consulting",
                desc: "Strategic sales and marketing advice to scale your business."
              }
            ].map((service, idx) => (
              <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-shadow border-t-4 border-brand-secondary group">
                <div className="text-brand-secondary mb-6 group-hover:text-brand-accent transition-colors">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brand-dark mb-3">{service.title}</h3>
                <p className="text-slate-600 mb-6">{service.desc}</p>
                <Link to="/services" className="text-sm font-semibold text-brand-dark flex items-center group-hover:text-brand-accent transition-colors">
                  Learn More <ArrowRight size={14} className="ml-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-brand-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-dark opacity-60"></div>
        {/* Replaced broken local image with Unsplash: Handshake */}
        <div className="absolute inset-0" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=2000)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15 }}></div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-white mb-6">
            Ready to Amplify Your Impact?
          </h2>
          <p className="text-blue-100 text-lg mb-10">
            Let's discuss how we can elevate your brand and digital presence to the next level.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="https://wa.link/xjujpe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-brand-accent text-white rounded-lg font-bold hover:bg-amber-600 transition-colors shadow-lg"
            >
              Book a Consultation
            </a>
            <a 
              href="https://wa.link/xjujpe" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-white text-brand-primary rounded-lg font-bold hover:bg-slate-100 transition-colors shadow-lg"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;