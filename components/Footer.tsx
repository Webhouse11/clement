import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Instagram, Linkedin, Facebook, Youtube, Mail, ArrowUpRight, Lock } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Footer: React.FC = () => {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="bg-brand-dark text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Rocket className="text-brand-accent" size={24} />
              <span className="font-serif font-bold text-xl">
                Clement<span className="text-brand-accent">Motivates</span>
              </span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Empowering individuals and businesses through digital innovation and transformational leadership. Let's build your legacy.
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://web.facebook.com/engr.oluranti" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-full hover:bg-brand-accent transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="https://www.youtube.com/@webhousemedia1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-full hover:bg-brand-accent transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
              <a 
                href="https://www.instagram.com/clementconnectmedia?igsh=enAwY2NuYXJhOWQ2&fbclid=IwY2xjawOeNvBleHRuA2FlbQIxMABicmlkETE5ZTg4RWd2dkgzUGZQUFh4c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHhP1yF6SeSCYG44Z0Z574U8y4hkWlIfF7kFeOGJ10n0jzLeddLcOBJwBeyjY_aem_nfK9ihNRofc0uRvmGJUtoQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-full hover:bg-brand-accent transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a 
                href="https://www.linkedin.com/in/oluranti-clement-7116b078/?originalSubdomain=ng" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-slate-800 rounded-full hover:bg-brand-accent transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              {['Home', 'About', 'Services', 'Portfolio'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                    className="text-slate-400 hover:text-brand-accent transition-colors text-sm flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 transition-all duration-300 overflow-hidden bg-brand-accent h-[2px] mr-0 group-hover:mr-2"></span>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-3">
              {['Personal Branding', 'Web Development', 'Digital Marketing', 'Sales Consulting'].map((item) => (
                <li key={item} className="text-slate-400 text-sm">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-semibold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3 text-slate-400 text-sm">
                <Mail className="mt-1 shrink-0 text-brand-accent" size={16} />
                <span>olurantiprofile@gmail.com</span>
              </li>
              <li>
                <a 
                  href="https://wa.link/xjujpe"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-white font-medium border-b border-brand-accent pb-1 hover:text-brand-accent transition-colors"
                >
                  <span>Book a Consultation</span>
                  <ArrowUpRight size={16} />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} ClementMotivates. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0 items-center">
            <Link 
              to={isAuthenticated ? "/admin/dashboard" : "/admin"} 
              className="hover:text-white transition-colors flex items-center opacity-50 hover:opacity-100"
              title="Admin Access"
            >
              <Lock size={14} className="mr-1" />
              {isAuthenticated ? 'Dashboard' : 'Admin'}
            </Link>
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;