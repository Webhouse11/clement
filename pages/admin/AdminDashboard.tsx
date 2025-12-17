import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, FileText, Briefcase, MessageSquare, Settings, 
  LogOut, Plus, Trash2, Edit2, Check, X, Eye, User, Phone, Image as ImageIcon, Copy, Upload, Loader2, Save, CheckCircle
} from 'lucide-react';
import { ServiceItem, PortfolioItem, BlogPost } from '../../types';

const AdminDashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { 
    services, updateService, 
    portfolio, addPortfolio, updatePortfolio, deletePortfolio,
    blogPosts, addBlogPost, updateBlogPost, deleteBlogPost,
    messages, markMessageRead,
    heroSlides, updateHeroSlide, addHeroSlide, deleteHeroSlide,
    aboutData, updateAboutData,
    contactData, updateContactData,
    mediaLibrary, addMediaItem, deleteMediaItem
  } = useData();

  const [activeTab, setActiveTab] = useState<'overview' | 'services' | 'portfolio' | 'blog' | 'messages' | 'about' | 'contact' | 'media' | 'settings'>('overview');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'portfolio' | 'blog' | null>(null);
  
  // State for image in modal
  const [modalImage, setModalImage] = useState('');

  // Local state for page editors (prevents auto-save)
  const [localAbout, setLocalAbout] = useState(aboutData);
  const [localContact, setLocalContact] = useState(contactData);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  // Sync local state with global state on load
  useEffect(() => {
    setLocalAbout(aboutData);
  }, [aboutData]);

  useEffect(() => {
    setLocalContact(contactData);
  }, [contactData]);

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  const handleSavePage = async (type: 'about' | 'contact') => {
    setSaveStatus('saving');
    // Simulate network delay for better UX feel
    await new Promise(resolve => setTimeout(resolve, 800));
    
    if (type === 'about') {
        updateAboutData(localAbout);
    } else {
        updateContactData(localContact);
    }
    
    setSaveStatus('saved');
    setTimeout(() => setSaveStatus('idle'), 2000);
  };

  // Reusable Save Button
  const SaveButton = ({ onClick }: { onClick: () => void }) => (
    <button 
      onClick={onClick}
      disabled={saveStatus !== 'idle'}
      className={`
        flex items-center space-x-2 px-6 py-3 rounded-lg font-bold text-white transition-all shadow-md ml-auto
        ${saveStatus === 'saved' ? 'bg-green-600' : 'bg-brand-primary hover:bg-blue-800'}
        ${saveStatus === 'saving' ? 'opacity-75 cursor-wait' : ''}
      `}
    >
      {saveStatus === 'saving' && <Loader2 size={18} className="animate-spin" />}
      {saveStatus === 'saved' && <CheckCircle size={18} />}
      {saveStatus === 'idle' && <Save size={18} />}
      <span>
        {saveStatus === 'saving' ? 'Saving...' : saveStatus === 'saved' ? 'Changes Saved!' : 'Save Changes'}
      </span>
    </button>
  );

  // Reusable Image Input Component
  const ImageInput = ({ 
    label, 
    value, 
    onChange, 
    name = "image"
  }: { 
    label: string, 
    value: string, 
    onChange: (val: string) => void,
    name?: string
  }) => {
    const localFileRef = useRef<HTMLInputElement>(null);
    const [localUploading, setLocalUploading] = useState(false);

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files?.[0]) {
        setLocalUploading(true);
        try {
          const url = await addMediaItem(e.target.files[0]);
          onChange(url);
        } catch (err) {
          console.error(err);
        } finally {
          setLocalUploading(false);
        }
      }
    };

    return (
      <div>
        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">{label}</label>
        <div className="flex gap-2">
          <input 
            name={name}
            className="w-full p-3 border border-slate-200 rounded-lg text-sm"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://... or upload"
          />
          <input 
            type="file" 
            hidden 
            ref={localFileRef} 
            accept="image/*"
            onChange={handleFile}
          />
          <button 
            type="button"
            onClick={() => localFileRef.current?.click()}
            disabled={localUploading}
            className="px-3 py-2 bg-slate-100 text-slate-600 rounded-lg hover:bg-brand-primary hover:text-white transition-colors border border-slate-200 shrink-0"
            title="Upload Image"
          >
            {localUploading ? <Loader2 className="animate-spin" size={20} /> : <Upload size={20} />}
          </button>
        </div>
        {value && (
          <div className="mt-2 relative w-fit group">
            <img src={value} alt="Preview" className="h-20 w-auto object-cover rounded border border-slate-200" />
            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity rounded"></div>
          </div>
        )}
      </div>
    );
  };

  const SidebarItem = ({ id, icon: Icon, label }: { id: typeof activeTab, icon: any, label: string }) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center space-x-3 px-6 py-4 transition-colors ${
        activeTab === id 
        ? 'bg-brand-accent text-white' 
        : 'text-slate-400 hover:bg-brand-dark/50 hover:text-white'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  // --- CRUD HANDLERS ---
  const handleEdit = (item: any, type: 'portfolio' | 'blog') => {
    setEditingItem(item);
    setModalImage(item.image || ''); // Set initial image state
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleAddNew = (type: 'portfolio' | 'blog') => {
      setEditingItem(null);
      setModalImage(''); // Reset image state
      setModalType(type);
      setIsModalOpen(true);
  };

  const handleDelete = (id: string | number, type: 'portfolio' | 'blog') => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      if (type === 'portfolio') deletePortfolio(id);
      if (type === 'blog') deleteBlogPost(id);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (modalType === 'portfolio') {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const newItem: PortfolioItem = {
        id: editingItem?.id || 0,
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        image: modalImage, // Use state instead of form data for image
        description: formData.get('description') as string,
        result: formData.get('result') as string,
      };
      
      if (editingItem) updatePortfolio(newItem);
      else addPortfolio(newItem);
    } else if (modalType === 'blog') {
      const form = e.target as HTMLFormElement;
      const formData = new FormData(form);
      const newItem: BlogPost = {
        id: editingItem?.id || 0,
        title: formData.get('title') as string,
        category: formData.get('category') as string,
        date: editingItem ? editingItem.date : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        image: modalImage, // Use state
        excerpt: formData.get('excerpt') as string,
      };

      if (editingItem) updateBlogPost(newItem);
      else addBlogPost(newItem);
    }
    setIsModalOpen(false);
    setEditingItem(null);
    setModalImage('');
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploading(true);
      try {
        await addMediaItem(e.target.files[0]);
      } catch (err) {
        console.error("Upload failed", err);
      } finally {
        setUploading(false);
      }
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("URL copied to clipboard!");
  };

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-brand-dark flex flex-col shadow-2xl z-10">
        <div className="p-6">
          <h2 className="text-white font-serif font-bold text-xl">CM Studio<span className="text-brand-accent">.</span></h2>
          <p className="text-xs text-slate-500 uppercase mt-1">Admin Dashboard</p>
        </div>
        <nav className="flex-1 overflow-y-auto py-4 scrollbar-thin scrollbar-thumb-slate-700">
          <SidebarItem id="overview" icon={LayoutDashboard} label="Overview" />
          <SidebarItem id="messages" icon={MessageSquare} label="Messages" />
          <SidebarItem id="media" icon={ImageIcon} label="Media Library" />
          <SidebarItem id="services" icon={Briefcase} label="Services" />
          <SidebarItem id="portfolio" icon={FileText} label="Portfolio" />
          <SidebarItem id="blog" icon={Edit2} label="Blog" />
          <div className="pt-4 mt-4 border-t border-slate-800">
             <div className="px-6 pb-2 text-xs font-bold text-slate-600 uppercase">Pages</div>
             <SidebarItem id="about" icon={User} label="About Page" />
             <SidebarItem id="contact" icon={Phone} label="Contact Page" />
             <SidebarItem id="settings" icon={Settings} label="Home Slider" />
          </div>
        </nav>
        <div className="p-4 border-t border-slate-800">
          <button onClick={handleLogout} className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors">
            <LogOut size={18} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <header className="bg-white shadow-sm px-8 py-5 flex justify-between items-center sticky top-0 z-20">
          <h1 className="text-2xl font-bold text-brand-dark capitalize">{activeTab.replace(/([A-Z])/g, ' $1').trim()}</h1>
          <div className="flex items-center space-x-4">
             <button onClick={() => window.open('#/', '_blank')} className="text-sm font-medium text-brand-primary hover:underline flex items-center">
                View Site <Eye size={16} className="ml-1" />
             </button>
             <div className="text-sm text-slate-500 border-l pl-4 border-slate-200">Welcome back, Admin</div>
          </div>
        </header>

        <div className="p-8">
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
               {[
                 { label: 'Total Messages', val: messages.length, color: 'bg-blue-500' },
                 { label: 'Unread Messages', val: messages.filter(m => !m.read).length, color: 'bg-brand-accent' },
                 { label: 'Portfolio Items', val: portfolio.length, color: 'bg-brand-secondary' },
                 { label: 'Blog Posts', val: blogPosts.length, color: 'bg-green-500' }
               ].map((stat, i) => (
                 <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                   <div className="text-slate-500 text-sm uppercase font-bold mb-2">{stat.label}</div>
                   <div className="flex items-center justify-between">
                     <span className="text-3xl font-bold text-brand-dark">{stat.val}</span>
                     <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                   </div>
                 </div>
               ))}
               
               <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                 <h3 className="font-bold text-brand-dark mb-4">Recent Messages</h3>
                 {messages.length === 0 ? (
                   <p className="text-slate-500 text-sm">No messages yet.</p>
                 ) : (
                   <div className="space-y-3">
                     {messages.slice(0, 3).map(msg => (
                       <div key={msg.id} className="flex justify-between items-center text-sm border-b border-slate-50 pb-2">
                         <div>
                            <span className="font-bold block text-slate-800">{msg.name}</span>
                            <span className="text-slate-500">{msg.serviceInterest}</span>
                         </div>
                         <span className="text-xs text-slate-400">{msg.date}</span>
                       </div>
                     ))}
                   </div>
                 )}
               </div>
            </div>
          )}

          {/* MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div>
              <div className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6 text-sm text-blue-800 flex items-start">
                  <div className="mr-2 mt-0.5"><Settings size={16} /></div>
                  <div>
                    <span className="font-bold">Note on Storage:</span> Images uploaded here are stored in your browser's local storage. Large images ({'>'}3MB) may fail to save or slow down the app. For best results, compress images before uploading.
                  </div>
              </div>
              
              <div className="flex justify-between items-center mb-6">
                 <p className="text-slate-500">Manage your images to use across the site.</p>
                 <div>
                    <input 
                      type="file" 
                      ref={fileInputRef} 
                      onChange={handleFileUpload} 
                      className="hidden" 
                      accept="image/*"
                    />
                    <button 
                      onClick={() => fileInputRef.current?.click()} 
                      disabled={uploading}
                      className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold flex items-center hover:bg-blue-800 disabled:opacity-50"
                    >
                      {uploading ? 'Uploading...' : <><Upload size={16} className="mr-2" /> Upload Image</>}
                    </button>
                 </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {mediaLibrary.map((item) => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group relative">
                     <div className="h-32 bg-slate-100 overflow-hidden">
                        <img src={item.url} alt={item.name} className="w-full h-full object-cover" />
                     </div>
                     <div className="p-3">
                        <p className="text-xs font-bold text-slate-700 truncate mb-1">{item.name}</p>
                        <p className="text-[10px] text-slate-400">{item.date}</p>
                     </div>
                     <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                        <button 
                          onClick={() => copyToClipboard(item.url)} 
                          className="p-2 bg-white rounded-full text-brand-dark hover:bg-brand-primary hover:text-white"
                          title="Copy Link"
                        >
                           <Copy size={14} />
                        </button>
                        <button 
                          onClick={() => deleteMediaItem(item.id)} 
                          className="p-2 bg-white rounded-full text-red-600 hover:bg-red-600 hover:text-white"
                          title="Delete"
                        >
                           <Trash2 size={14} />
                        </button>
                     </div>
                  </div>
                ))}
                {mediaLibrary.length === 0 && (
                   <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-xl border border-dashed border-slate-300">
                      No images in library. Upload one to get started.
                   </div>
                )}
              </div>
            </div>
          )}

          {/* MESSAGES TAB */}
          {activeTab === 'messages' && (
            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-slate-50 border-b border-slate-100">
                  <tr>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Name</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Service</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Message</th>
                    <th className="p-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {messages.map(msg => (
                    <tr key={msg.id} onClick={() => markMessageRead(msg.id)} className={`hover:bg-slate-50 cursor-pointer ${!msg.read ? 'bg-blue-50/30' : ''}`}>
                      <td className="p-4">
                        {!msg.read ? <span className="inline-block px-2 py-1 bg-brand-accent text-white text-xs rounded-full">New</span> : <span className="text-slate-400 text-xs">Read</span>}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-brand-dark">{msg.name}</div>
                        <div className="text-xs text-slate-500">{msg.email}</div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{msg.serviceInterest}</td>
                      <td className="p-4 text-sm text-slate-600 max-w-xs truncate" title={msg.message}>{msg.message}</td>
                      <td className="p-4 text-xs text-slate-400">{msg.date}</td>
                    </tr>
                  ))}
                  {messages.length === 0 && (
                    <tr><td colSpan={5} className="p-8 text-center text-slate-500">No messages found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* SERVICES TAB */}
          {activeTab === 'services' && (
            <div className="grid grid-cols-1 gap-6">
              {services.map((service) => (
                <div key={service.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-brand-light rounded-lg text-brand-secondary font-bold">
                        {service.iconName || 'Icon'}
                      </div>
                      <h3 className="font-bold text-lg text-brand-dark">{service.title}</h3>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Tagline</label>
                      <input 
                        className="w-full p-2 border border-slate-200 rounded text-sm"
                        defaultValue={service.tagline}
                        onBlur={(e) => updateService({...service, tagline: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Problem</label>
                      <textarea 
                        className="w-full p-2 border border-slate-200 rounded text-sm h-20"
                        defaultValue={service.problem}
                        onBlur={(e) => updateService({...service, problem: e.target.value})}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* PORTFOLIO TAB */}
          {activeTab === 'portfolio' && (
            <div>
              <div className="flex justify-end mb-6">
                <button 
                  onClick={() => handleAddNew('portfolio')}
                  className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold flex items-center hover:bg-blue-800"
                >
                  <Plus size={16} className="mr-2" /> Add Project
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolio.map(item => (
                  <div key={item.id} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden group">
                    <div className="h-40 overflow-hidden relative">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                         <button onClick={() => handleEdit(item, 'portfolio')} className="p-2 bg-white rounded-full text-brand-dark hover:bg-brand-accent hover:text-white"><Edit2 size={16} /></button>
                         <button onClick={() => handleDelete(item.id, 'portfolio')} className="p-2 bg-white rounded-full text-red-600 hover:bg-red-600 hover:text-white"><Trash2 size={16} /></button>
                      </div>
                    </div>
                    <div className="p-4">
                      <div className="text-xs font-bold text-brand-secondary uppercase mb-1">{item.category}</div>
                      <h4 className="font-bold text-brand-dark">{item.title}</h4>
                      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* BLOG TAB */}
          {activeTab === 'blog' && (
            <div>
              <div className="flex justify-end mb-6">
                <button 
                   onClick={() => handleAddNew('blog')}
                   className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold flex items-center hover:bg-blue-800"
                >
                  <Plus size={16} className="mr-2" /> New Post
                </button>
              </div>
              <div className="space-y-4">
                {blogPosts.map(post => (
                  <div key={post.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <img src={post.image} alt={post.title} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <div className="text-xs text-brand-accent font-bold uppercase">{post.category}</div>
                        <h4 className="font-bold text-brand-dark">{post.title}</h4>
                        <div className="text-xs text-slate-400">{post.date}</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                       <button onClick={() => handleEdit(post, 'blog')} className="p-2 text-slate-400 hover:text-brand-primary"><Edit2 size={18} /></button>
                       <button onClick={() => handleDelete(post.id, 'blog')} className="p-2 text-slate-400 hover:text-red-600"><Trash2 size={18} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ABOUT PAGE EDITOR */}
          {activeTab === 'about' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
               <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark">Edit About Page</h3>
                    <p className="text-sm text-slate-500">Edit content below and click save.</p>
                  </div>
                  <SaveButton onClick={() => handleSavePage('about')} />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Hero Title</label>
                     <input 
                       className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                       value={localAbout.heroTitle}
                       onChange={(e) => setLocalAbout({...localAbout, heroTitle: e.target.value})}
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Hero Subtitle</label>
                     <textarea 
                       className="w-full p-3 border border-slate-200 rounded-lg text-sm h-24"
                       value={localAbout.heroSubtitle}
                       onChange={(e) => setLocalAbout({...localAbout, heroSubtitle: e.target.value})}
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Intro Text (Paragraphs separated by double enter)</label>
                     <textarea 
                       className="w-full p-3 border border-slate-200 rounded-lg text-sm h-48"
                       value={localAbout.introText}
                       onChange={(e) => setLocalAbout({...localAbout, introText: e.target.value})}
                     />
                   </div>
                 </div>
                 
                 <div className="space-y-4">
                    <ImageInput 
                      label="Hero Image" 
                      value={localAbout.heroImage} 
                      onChange={(val) => setLocalAbout({...localAbout, heroImage: val})} 
                    />

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                       <h4 className="font-bold text-brand-dark mb-3">Key Stats</h4>
                       {localAbout.stats.map((stat, idx) => (
                         <div key={idx} className="grid grid-cols-2 gap-2 mb-2">
                            <input 
                              className="p-2 border border-slate-200 rounded text-xs"
                              value={stat.value}
                              onChange={(e) => {
                                 const newStats = [...localAbout.stats];
                                 newStats[idx].value = e.target.value;
                                 setLocalAbout({...localAbout, stats: newStats});
                              }}
                            />
                            <input 
                              className="p-2 border border-slate-200 rounded text-xs"
                              value={stat.label}
                              onChange={(e) => {
                                 const newStats = [...localAbout.stats];
                                 newStats[idx].label = e.target.value;
                                 setLocalAbout({...localAbout, stats: newStats});
                              }}
                            />
                         </div>
                       ))}
                    </div>
                 </div>
               </div>
            </div>
          )}

          {/* CONTACT PAGE EDITOR */}
          {activeTab === 'contact' && (
            <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-100 space-y-6">
               <div className="flex justify-between items-center pb-4 border-b border-slate-100">
                  <div>
                    <h3 className="text-lg font-bold text-brand-dark">Edit Contact Page</h3>
                    <p className="text-sm text-slate-500">Edit content below and click save.</p>
                  </div>
                  <SaveButton onClick={() => handleSavePage('contact')} />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-4">
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Page Title</label>
                     <input 
                       className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                       value={localContact.title}
                       onChange={(e) => setLocalContact({...localContact, title: e.target.value})}
                     />
                   </div>
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Page Subtitle</label>
                     <textarea 
                       className="w-full p-3 border border-slate-200 rounded-lg text-sm h-24"
                       value={localContact.subtitle}
                       onChange={(e) => setLocalContact({...localContact, subtitle: e.target.value})}
                     />
                   </div>
                   
                   <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Email</label>
                        <input 
                          className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                          value={localContact.email}
                          onChange={(e) => setLocalContact({...localContact, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">WhatsApp / Phone</label>
                        <input 
                          className="w-full p-3 border border-slate-200 rounded-lg text-sm"
                          value={localContact.whatsapp}
                          onChange={(e) => setLocalContact({...localContact, whatsapp: e.target.value})}
                        />
                      </div>
                   </div>
                 </div>
                 
                 <div className="space-y-4">
                    <ImageInput 
                      label="Sidebar Image" 
                      value={localContact.sidebarImage} 
                      onChange={(val) => setLocalContact({...localContact, sidebarImage: val})} 
                    />

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                       <h4 className="font-bold text-brand-dark mb-3">Quote</h4>
                       <textarea 
                         className="w-full p-2 border border-slate-200 rounded-lg text-sm mb-2 h-20"
                         value={localContact.quote}
                         onChange={(e) => setLocalContact({...localContact, quote: e.target.value})}
                       />
                       <input 
                          className="w-full p-2 border border-slate-200 rounded-lg text-sm font-bold"
                          placeholder="Author"
                          value={localContact.quoteAuthor}
                          onChange={(e) => setLocalContact({...localContact, quoteAuthor: e.target.value})}
                       />
                    </div>
                 </div>
               </div>
            </div>
          )}

          {/* SETTINGS TAB */}
          {activeTab === 'settings' && (
             <div className="space-y-8">
               <div className="flex justify-between items-center mb-4">
                 <h3 className="text-lg font-bold text-brand-dark">Homepage Slider</h3>
                 <button 
                    onClick={() => {
                        addHeroSlide({
                            image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&q=80&w=2000',
                            title: 'New Slide Title',
                            subtitle: 'New Slide Subtitle',
                            cta: 'Learn More',
                            link: '/services',
                            align: 'center'
                        });
                    }}
                    className="px-4 py-2 bg-brand-primary text-white rounded-lg text-sm font-bold flex items-center hover:bg-blue-800"
                 >
                    <Plus size={16} className="mr-2" /> Add Slide
                 </button>
               </div>
               
               {heroSlides.map((slide, idx) => (
                 <div key={slide.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 relative group">
                    <button 
                        onClick={() => {
                            if(window.confirm('Delete this slide?')) deleteHeroSlide(slide.id);
                        }}
                        className="absolute top-4 right-4 p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete Slide"
                    >
                        <Trash2 size={16} />
                    </button>
                    <div className="mb-4">
                      <span className="text-xs font-bold bg-slate-100 px-2 py-1 rounded">Slide {idx + 1}</span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Existing fields */}
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Title</label>
                        <input 
                          className="w-full p-2 border border-slate-200 rounded text-sm"
                          defaultValue={slide.title}
                          onBlur={(e) => updateHeroSlide({...slide, title: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Subtitle</label>
                        <input 
                          className="w-full p-2 border border-slate-200 rounded text-sm"
                          defaultValue={slide.subtitle}
                          onBlur={(e) => updateHeroSlide({...slide, subtitle: e.target.value})}
                        />
                      </div>
                      {/* New fields */}
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">CTA Text</label>
                        <input 
                          className="w-full p-2 border border-slate-200 rounded text-sm"
                          defaultValue={slide.cta}
                          onBlur={(e) => updateHeroSlide({...slide, cta: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Link</label>
                        <input 
                          className="w-full p-2 border border-slate-200 rounded text-sm"
                          defaultValue={slide.link}
                          onBlur={(e) => updateHeroSlide({...slide, link: e.target.value})}
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-1">Alignment</label>
                         <select 
                          className="w-full p-2 border border-slate-200 rounded text-sm"
                          value={slide.align}
                          onChange={(e) => updateHeroSlide({...slide, align: e.target.value})}
                        >
                            <option value="left">Left</option>
                            <option value="center">Center</option>
                            <option value="right">Right</option>
                        </select>
                      </div>

                      <div className="md:col-span-2">
                        <ImageInput 
                          label="Slide Image" 
                          value={slide.image} 
                          onChange={(val) => updateHeroSlide({...slide, image: val})} 
                        />
                      </div>
                    </div>
                 </div>
               ))}
             </div>
          )}
        </div>
      </div>

      {/* MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg overflow-hidden max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white z-10">
              <h3 className="font-bold text-lg">
                {editingItem ? 'Edit Item' : 'Add New Item'}
              </h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} className="text-slate-400" /></button>
            </div>
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Title</label>
                <input required name="title" defaultValue={editingItem?.title} className="w-full p-3 border border-slate-200 rounded-lg" />
              </div>
              
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                <input required name="category" defaultValue={editingItem?.category} className="w-full p-3 border border-slate-200 rounded-lg" />
              </div>

              <ImageInput 
                label="Image"
                value={modalImage}
                onChange={setModalImage}
                name="image"
              />

              {modalType === 'portfolio' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                    <textarea required name="description" defaultValue={editingItem?.description} className="w-full p-3 border border-slate-200 rounded-lg h-24" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Result / Impact</label>
                    <input required name="result" defaultValue={editingItem?.result} className="w-full p-3 border border-slate-200 rounded-lg" />
                  </div>
                </>
              )}

              {modalType === 'blog' && (
                <div>
                   <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Excerpt</label>
                   <textarea required name="excerpt" defaultValue={editingItem?.excerpt} className="w-full p-3 border border-slate-200 rounded-lg h-24" />
                </div>
              )}

              <div className="pt-4 flex justify-end space-x-3">
                 <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-500 font-bold hover:bg-slate-50 rounded-lg">Cancel</button>
                 <button type="submit" className="px-6 py-2 bg-brand-primary text-white font-bold rounded-lg hover:bg-blue-800">Save Item</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;