import React, { createContext, useContext, useState, useEffect } from 'react';
import { ServiceItem, PortfolioItem, BlogPost, ContactMessage, HeroSlide, AboutPageData, ContactPageData, MediaItem } from '../types';

interface DataContextType {
  services: ServiceItem[];
  portfolio: PortfolioItem[];
  blogPosts: BlogPost[];
  messages: ContactMessage[];
  heroSlides: HeroSlide[];
  aboutData: AboutPageData;
  contactData: ContactPageData;
  mediaLibrary: MediaItem[];
  
  addService: (item: ServiceItem) => void;
  updateService: (item: ServiceItem) => void;
  deleteService: (id: string) => void;
  
  addPortfolio: (item: PortfolioItem) => void;
  updatePortfolio: (item: PortfolioItem) => void;
  deletePortfolio: (id: string | number) => void;
  
  addBlogPost: (item: BlogPost) => void;
  updateBlogPost: (item: BlogPost) => void;
  deleteBlogPost: (id: string | number) => void;
  
  addMessage: (item: Omit<ContactMessage, 'id' | 'date' | 'read'>) => void;
  markMessageRead: (id: string) => void;
  
  updateHeroSlide: (item: HeroSlide) => void;
  addHeroSlide: (item: Omit<HeroSlide, 'id'>) => void;
  deleteHeroSlide: (id: number) => void;
  
  updateAboutData: (data: AboutPageData) => void;
  updateContactData: (data: ContactPageData) => void;
  
  addMediaItem: (file: File) => Promise<string>;
  deleteMediaItem: (id: string) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Initial Data
const initialServices: ServiceItem[] = [
  {
    id: 'personal-branding',
    title: 'Personal Branding Development',
    iconName: 'User',
    tagline: 'Stand out in a crowded market.',
    problem: 'You have expertise and passion, but your online presence is inconsistent or non-existent. Opportunities are passing you by.',
    solution: 'A comprehensive branding strategy including visual identity design, tone-of-voice development, and a content roadmap.',
    outcome: 'A clear, authoritative brand that attracts your ideal clients and establishes you as a thought leader.'
  },
  {
    id: 'web-development',
    title: 'Website & Digital Solutions',
    iconName: 'Code',
    tagline: 'Your digital headquarters.',
    problem: 'Your current website is slow, outdated, or doesn’t convert visitors into leads. It fails to reflect the quality of work you deliver.',
    solution: 'Custom, high-performance web development using modern technologies. Focusing on user experience (UX) and SEO.',
    outcome: 'A professional, fast, and conversion-optimized website that works 24/7 to generate leads.'
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Automation',
    iconName: 'MonitorPlay',
    tagline: 'Scale your reach effortlessly.',
    problem: 'You’re spending hours on manual tasks and random marketing efforts that don’t yield measurable results.',
    solution: 'Implementation of marketing funnels, email automation sequences, and targeted content strategies.',
    outcome: 'A streamlined system that brings in qualified leads consistently, freeing up your time.'
  },
  {
    id: 'sales-consulting',
    title: 'Sales Strategy & Growth Consulting',
    iconName: 'TrendingUp',
    tagline: 'Close more deals.',
    problem: 'You’re getting leads, but struggling to close high-ticket clients. Your sales process feels awkward or pushy.',
    solution: 'One-on-one consulting to refine your offer, pricing strategy, and sales scripts.',
    outcome: 'Increased conversion rates, higher revenue per client, and a sales process that feels natural.'
  }
];

const initialPortfolio: PortfolioItem[] = [
  {
    id: 1,
    title: "TechFlow Agency",
    category: "Website Development",
    image: "https://picsum.photos/seed/tech/600/400",
    description: "A high-performance landing page for a SaaS marketing agency.",
    result: "Increased lead capture by 45% in first month."
  },
  {
    id: 2,
    title: "Sarah Jenkins Coaching",
    category: "Personal Branding",
    image: "https://picsum.photos/seed/woman/600/400",
    description: "Complete brand overhaul for a executive life coach.",
    result: "Fully booked consultation calendar within 3 weeks of launch."
  },
  {
    id: 3,
    title: "Apex Fitness App",
    category: "Digital Strategy",
    image: "https://picsum.photos/seed/gym/600/400",
    description: "Go-to-market strategy for a new fitness mobile application.",
    result: "10,000 downloads in the first quarter."
  },
  {
    id: 4,
    title: "Urban Coffee Roasters",
    category: "E-Commerce",
    image: "https://picsum.photos/seed/coffee/600/400",
    description: "Shopify integration and custom theme customization.",
    result: "Doubled online sales revenue YoY."
  },
  {
    id: 5,
    title: "Innovate Summit 2024",
    category: "Event Branding",
    image: "https://picsum.photos/seed/event/600/400",
    description: "Digital presence and ticketing system for a tech conference.",
    result: "Sold out 500 seats 2 weeks early."
  },
  {
    id: 6,
    title: "Dr. K. Mensah",
    category: "Personal Branding",
    image: "https://picsum.photos/seed/doctor/600/400",
    description: "Portfolio website for a medical researcher and speaker.",
    result: "Secured 3 international speaking gigs via contact form."
  }
];

const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "5 Habits to Build a Powerful Personal Brand",
    category: "Personal Branding",
    date: "Oct 12, 2023",
    image: "https://picsum.photos/seed/blog1/600/400",
    excerpt: "Your personal brand is what people say about you when you're not in the room. Here is how to control that narrative."
  },
  {
    id: 2,
    title: "Why Your Business Needs a Website in 2024",
    category: "Digital Growth",
    date: "Nov 05, 2023",
    image: "https://picsum.photos/seed/blog2/600/400",
    excerpt: "Social media is rented land. A website is your digital real estate. Learn why ownership matters for long-term growth."
  }
];

const initialHeroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?auto=format&fit=crop&q=80&w=2000",
    title: "Command Your Stage",
    subtitle: "Turn your expertise into a powerful personal brand that resonates globally.",
    cta: "Start Your Journey",
    link: "/contact",
    align: "center"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=2000",
    title: "Strategic Digital Leadership",
    subtitle: "Building robust digital solutions for visionary businesses.",
    cta: "View Services",
    link: "/services",
    align: "left"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=2000",
    title: "Authenticity is Power",
    subtitle: "Crafting narratives that are true, impactful, and uniquely yours.",
    cta: "Explore Portfolio",
    link: "/portfolio",
    align: "right"
  }
];

const initialAboutData: AboutPageData = {
  heroTitle: "Behind the Brand",
  heroSubtitle: "\"I believe that every individual has a unique purpose. My goal is to give that purpose a digital voice.\"",
  heroImage: "/assets/clement-contact.jpg",
  introText: "Hello! I'm Clement. My journey began with a simple curiosity about how technology shapes human connection. Over the years, that curiosity evolved into a passion for helping others succeed.\n\nAs a developer, I build robust digital platforms. As a motivational speaker, I ignite the spark of possibility. As a consultant, I provide the roadmap to success.\n\nI've worked with startups, established CEOs, and creative entrepreneurs to translate their vision into tangible digital assets that drive growth.",
  stats: [
    { label: "Websites Built", value: "50+" },
    { label: "Brands Launched", value: "30+" },
    { label: "Talks Given", value: "100+" },
    { label: "Client Satisfaction", value: "100%" }
  ]
};

const initialContactData: ContactPageData = {
  title: "Let's Connect",
  subtitle: "Ready to start a project or need a speaker for your next event? Fill out the form below or use the direct links to get in touch.",
  email: "olurantiprofile@gmail.com",
  phone: "234-8060180077",
  whatsapp: "234-8060180077",
  sidebarImage: "/assets/clement-contact.jpg",
  quote: "The only limit to our realization of tomorrow will be our doubts of today.",
  quoteAuthor: "Franklin D. Roosevelt"
};

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(initialHeroSlides);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [aboutData, setAboutData] = useState<AboutPageData>(initialAboutData);
  const [contactData, setContactData] = useState<ContactPageData>(initialContactData);
  const [mediaLibrary, setMediaLibrary] = useState<MediaItem[]>([]);

  // Load from LocalStorage on mount
  useEffect(() => {
    const loadedServices = localStorage.getItem('cm_services');
    if (loadedServices) setServices(JSON.parse(loadedServices));

    const loadedPortfolio = localStorage.getItem('cm_portfolio');
    if (loadedPortfolio) setPortfolio(JSON.parse(loadedPortfolio));

    const loadedBlog = localStorage.getItem('cm_blog');
    if (loadedBlog) setBlogPosts(JSON.parse(loadedBlog));
    
    const loadedHero = localStorage.getItem('cm_hero');
    if (loadedHero) setHeroSlides(JSON.parse(loadedHero));

    const loadedMessages = localStorage.getItem('cm_messages');
    if (loadedMessages) setMessages(JSON.parse(loadedMessages));

    const loadedAbout = localStorage.getItem('cm_about');
    if (loadedAbout) setAboutData(JSON.parse(loadedAbout));

    const loadedContact = localStorage.getItem('cm_contact');
    if (loadedContact) setContactData(JSON.parse(loadedContact));

    const loadedMedia = localStorage.getItem('cm_media');
    if (loadedMedia) setMediaLibrary(JSON.parse(loadedMedia));
  }, []);

  // Save changes to LocalStorage helpers
  const saveToStorage = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  // Services Actions
  const addService = (item: ServiceItem) => {
    const updated = [...services, item];
    setServices(updated);
    saveToStorage('cm_services', updated);
  };
  const updateService = (item: ServiceItem) => {
    const updated = services.map(s => s.id === item.id ? item : s);
    setServices(updated);
    saveToStorage('cm_services', updated);
  };
  const deleteService = (id: string) => {
    const updated = services.filter(s => s.id !== id);
    setServices(updated);
    saveToStorage('cm_services', updated);
  };

  // Portfolio Actions
  const addPortfolio = (item: PortfolioItem) => {
    const updated = [...portfolio, { ...item, id: Date.now() }];
    setPortfolio(updated);
    saveToStorage('cm_portfolio', updated);
  };
  const updatePortfolio = (item: PortfolioItem) => {
    const updated = portfolio.map(p => p.id === item.id ? item : p);
    setPortfolio(updated);
    saveToStorage('cm_portfolio', updated);
  };
  const deletePortfolio = (id: string | number) => {
    const updated = portfolio.filter(p => p.id !== id);
    setPortfolio(updated);
    saveToStorage('cm_portfolio', updated);
  };

  // Blog Actions
  const addBlogPost = (item: BlogPost) => {
    const updated = [...blogPosts, { ...item, id: Date.now() }];
    setBlogPosts(updated);
    saveToStorage('cm_blog', updated);
  };
  const updateBlogPost = (item: BlogPost) => {
    const updated = blogPosts.map(b => b.id === item.id ? item : b);
    setBlogPosts(updated);
    saveToStorage('cm_blog', updated);
  };
  const deleteBlogPost = (id: string | number) => {
    const updated = blogPosts.filter(b => b.id !== id);
    setBlogPosts(updated);
    saveToStorage('cm_blog', updated);
  };

  // Messages Actions
  const addMessage = (item: Omit<ContactMessage, 'id' | 'date' | 'read'>) => {
    const newMessage: ContactMessage = {
      ...item,
      id: Date.now().toString(),
      date: new Date().toLocaleDateString(),
      read: false
    };
    const updated = [newMessage, ...messages];
    setMessages(updated);
    saveToStorage('cm_messages', updated);
  };
  const markMessageRead = (id: string) => {
    const updated = messages.map(m => m.id === id ? { ...m, read: true } : m);
    setMessages(updated);
    saveToStorage('cm_messages', updated);
  };

  // Hero Actions
  const updateHeroSlide = (item: HeroSlide) => {
    const updated = heroSlides.map(h => h.id === item.id ? item : h);
    setHeroSlides(updated);
    saveToStorage('cm_hero', updated);
  };

  const addHeroSlide = (item: Omit<HeroSlide, 'id'>) => {
    const newSlide = { ...item, id: Date.now() };
    const updated = [...heroSlides, newSlide];
    setHeroSlides(updated);
    saveToStorage('cm_hero', updated);
  };

  const deleteHeroSlide = (id: number) => {
    const updated = heroSlides.filter(h => h.id !== id);
    setHeroSlides(updated);
    saveToStorage('cm_hero', updated);
  };

  // About Data Actions
  const updateAboutData = (data: AboutPageData) => {
    setAboutData(data);
    saveToStorage('cm_about', data);
  };

  // Contact Data Actions
  const updateContactData = (data: ContactPageData) => {
    setContactData(data);
    saveToStorage('cm_contact', data);
  };

  // Media Library Actions
  const addMediaItem = async (file: File): Promise<string> => {
    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        try {
          const base64String = reader.result as string;
          // Check storage limit roughly (5MB limit is common)
          if (base64String.length > 3000000) { // ~3MB warning
            alert("Image is too large for local browser storage. Please use a smaller image or an external URL.");
            reject("File too large");
            return;
          }

          const newItem: MediaItem = {
            id: Date.now().toString(),
            url: base64String,
            name: file.name,
            date: new Date().toLocaleDateString(),
            type: file.type.startsWith('image') ? 'image' : 'document'
          };
          
          const updated = [newItem, ...mediaLibrary];
          setMediaLibrary(updated);
          saveToStorage('cm_media', updated);
          resolve(base64String);
        } catch (error) {
          alert("Failed to save image. Storage might be full.");
          reject(error);
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  };

  const deleteMediaItem = (id: string) => {
    const updated = mediaLibrary.filter(m => m.id !== id);
    setMediaLibrary(updated);
    saveToStorage('cm_media', updated);
  };

  return (
    <DataContext.Provider value={{
      services, portfolio, blogPosts, messages, heroSlides, aboutData, contactData, mediaLibrary,
      addService, updateService, deleteService,
      addPortfolio, updatePortfolio, deletePortfolio,
      addBlogPost, updateBlogPost, deleteBlogPost,
      addMessage, markMessageRead, 
      updateHeroSlide, addHeroSlide, deleteHeroSlide,
      updateAboutData, updateContactData,
      addMediaItem, deleteMediaItem
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};