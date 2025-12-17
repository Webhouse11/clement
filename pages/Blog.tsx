import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { useData } from '../context/DataContext';

const Blog: React.FC = () => {
  const { blogPosts } = useData();

  return (
    <div className="pt-20 min-h-screen bg-slate-50">
      {/* Header with Speaking Image */}
      <div className="relative bg-brand-dark py-24">
         <div className="absolute inset-0 overflow-hidden">
             <img src="https://images.unsplash.com/photo-1475721027767-p4d8089f896b?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover object-center opacity-40 blur-sm" alt="Background" />
             <div className="absolute inset-0 bg-brand-dark/60"></div>
         </div>
         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl font-serif font-bold text-white mb-4">Insights & Inspiration</h1>
          <p className="text-slate-200 text-lg max-w-2xl mx-auto">Thought leadership on branding, technology, and personal growth.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10">
          {blogPosts.map((post) => (
            <article key={post.id} className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow overflow-hidden flex flex-col md:flex-row h-full md:h-64 group">
              <div className="md:w-2/5 h-48 md:h-full relative overflow-hidden">
                <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <div className="p-6 md:w-3/5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center space-x-4 text-xs text-slate-500 mb-3">
                    <span className="text-brand-accent font-bold uppercase">{post.category}</span>
                    <div className="flex items-center">
                      <Calendar size={12} className="mr-1" /> {post.date}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-brand-dark mb-3 group-hover:text-brand-secondary transition-colors cursor-pointer leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-sm line-clamp-3">{post.excerpt}</p>
                </div>
                <div className="mt-4">
                  <button className="text-brand-primary font-semibold text-sm flex items-center hover:text-brand-accent transition-colors">
                    Read Article <ArrowRight size={14} className="ml-1" />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blog;
