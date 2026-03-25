import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createBlog } from '../services/blogService';
import { getAllTags, createTag } from '../services/tagService';
import { getAllCategories } from '../services/categoryService';
import ImageUpload from '../components/ImageUpload';
import NotionEditor from '../components/editor/NotionEditor';
import { useToast } from '@/components/ui/toast';
import { 
  Plus, ArrowLeft, Image as ImageIcon, Layout, Tag, Settings, Save, Send, 
  X, PenLine, BookOpen, Sidebar as SidebarIcon 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('draft');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // FIX 1: Performance Refactor - No body state, use editorRef instead
  const editorRef = useRef(null);

  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [newTagName, setNewTagName] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const catResponse = await getAllCategories();
      if (catResponse.success) setAvailableCategories(catResponse.data);
      const tagResponse = await getAllTags();
      if (tagResponse.success) setAvailableTags(tagResponse.data);
    } catch (err) {
      console.error("Failed to fetch data", err);
    }
  };

  const handleTagChange = (tagId) => {
    setTags(prev => prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]);
  };

  const handleAddNewTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const response = await createTag(newTagName);
      if (response.success) {
        setAvailableTags(prev => [...prev, response.data]);
        setTags(prev => [...prev, response.data._id]);
        setNewTagName('');
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message });
    }
  };

  const handleSubmit = async (publishStatus) => {
    setError('');
    const finalStatus = publishStatus || status;

    // FIX 1: Retrieve editor body ONLY ON SUBMIT
    const editorContent = editorRef.current?.getEditorJson();

    if (!title || !editorContent || !coverImage || !category) {
      setError('Title, content, cover image, and category are required.');
      setSidebarOpen(true); 
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    // Data Handling: Safely stringify the JSON payload from Tiptap Ref
    formData.append('body', JSON.stringify(editorContent));
    formData.append('coverImage', coverImage);
    formData.append('category', category);
    formData.append('status', finalStatus);
    tags.forEach(tagId => formData.append('tags[]', tagId));

    try {
      const response = await createBlog(formData);
      if (response.success) {
        toast({ title: finalStatus === 'published' ? "Published successfully" : "Draft saved" });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to save story.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-full flex bg-[#fbf9f5] font-manrope selection:bg-[#bcedd7] overflow-hidden">
      
      {/* 1. LEFT RAIL (Icons Only) */}
      <nav className="w-18 border-r border-[#c0c8c3]/20 flex flex-col items-center py-8 gap-10 bg-white/50 backdrop-blur-sm z-20 shrink-0">
        <Link to="/home" className="p-3 text-[#00261b] hover:bg-[#bcedd7]/20 rounded-2xl transition-all">
          <BookOpen size={24} />
        </Link>
        <div className="flex flex-col gap-6 mt-10">
          <button className="p-3 text-[#00261b] bg-[#bcedd7]/40 rounded-2xl shadow-sm transition-all shadow-md active:scale-95"><PenLine size={24} strokeWidth={2.5}/></button>
          <button className="p-3 text-[#414944]/40 hover:text-[#00261b] transition-colors"><Settings size={24}/></button>
        </div>
        <div className="mt-auto flex flex-col items-center gap-6">
           <div className="w-10 h-10 rounded-full bg-[#00261b] text-white flex items-center justify-center font-bold text-sm">V</div>
        </div>
      </nav>

      <div className="flex-1 flex flex-col min-w-0 relative">
        
        {/* 2. TOP HEADER */}
        <header className="h-18 px-8 flex items-center justify-between border-b border-[#c0c8c3]/10 bg-[#fbf9f5]/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="text-[#414944] hover:text-[#00261b] transition-colors"><ArrowLeft size={18} /></Link>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#00261b] animate-bounce" />
              <span className="text-[10px] font-black uppercase tracking-widest text-[#414944]/50">Canvas Mode — Ready for Bloom</span>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-3 rounded-xl transition-all ${sidebarOpen ? 'bg-[#bcedd7] text-[#00261b]' : 'hover:bg-white text-[#414944]'}`}
              title="Post Details"
            >
              <SidebarIcon size={20} />
            </button>
            <button
               onClick={() => handleSubmit('published')}
               disabled={loading}
               className="px-8 py-2.5 bg-[#00261b] text-white text-[11px] font-black uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl hover:bg-[#214f3f] transition-all hover:-translate-y-0.5"
            >
              Cultivate
            </button>
          </div>
        </header>

        {/* 3. CENTER CANVAS (Writing Area) */}
        <main 
          className="flex-1 overflow-y-auto scroll-smooth flex justify-center py-20 px-6"
          onClick={(e) => {
             // If clicking in the main blank space, focus the editor ref
             if (e.target === e.currentTarget) {
                editorRef.current?.focus();
             }
          }}
        >
          <div className="w-full max-w-[720px] flex flex-col gap-14">
            
            {error && (
              <div className="bg-[#ffdad6]/20 p-4 rounded-2xl text-[#ba1a1a] text-[11px] font-black uppercase tracking-widest border border-[#ffdad6] flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center shrink-0">!</span>
                {error}
              </div>
            )}

            {/* Notion-style TITLE: no borders, large, seamless */}
            <div>
              <textarea
                id="post-title"
                placeholder="Untitled"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                rows={1}
                style={{ outline: 'none', border: 'none', boxShadow: 'none', resize: 'none' }}
                className="w-full text-[2.75rem] font-extrabold tracking-tight text-[#37352f] placeholder:text-[#e0dfd9] bg-transparent p-0 leading-tight block"
                onInput={(e) => { e.target.style.height = 'auto'; e.target.style.height = e.target.scrollHeight + 'px'; }}
              />
            </div>

            {/* Notion Block Editor */}
            <div>
              <NotionEditor ref={editorRef} />
            </div>
          </div>
        </main>

        {/* 4. SETTINGS SIDEBAR (Slide-over) */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              {/* Overlay for small screens */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                className="absolute inset-0 bg-[#00261b]/10 backdrop-blur-sm z-40 lg:hidden"
              />
              <motion.aside 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute right-0 top-0 bottom-0 w-full max-w-[380px] bg-white shadow-2xl z-50 overflow-y-auto p-10 flex flex-col gap-10 border-l border-[#c0c8c3]/20"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-[#00261b] uppercase tracking-widest">Metadata Settings</h3>
                  <button onClick={() => setSidebarOpen(false)} className="text-[#414944] hover:text-[#00261b] p-2 hover:bg-[#f5f3ef] rounded-full"><X size={20}/></button>
                </div>

                {/* Featured Visual */}
                <section className="space-y-4">
                   <header className="flex items-center gap-3 text-[10px] font-black text-[#414944]/50 uppercase tracking-[0.2em] border-b border-[#c0c8c3]/20 pb-3">
                     <ImageIcon size={14}/> Featured Visual
                   </header>
                   <ImageUpload onFileChange={setCoverImage} />
                </section>

                {/* Ecosystem Selector */}
                <section className="space-y-4">
                  <header className="flex items-center gap-3 text-[10px] font-black text-[#414944]/50 uppercase tracking-[0.2em] border-b border-[#c0c8c3]/20 pb-3">
                     <Layout size={14}/> Ecosystem Topic
                   </header>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#fbf9f5] border-transparent rounded-2xl px-5 py-4 text-sm font-bold text-[#00261b] focus:ring-0 outline-none hover:bg-[#f5f3ef] transition-colors cursor-pointer"
                  >
                    <option value="" disabled>Select Ecosystem...</option>
                    {availableCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                  </select>
                </section>

                {/* Tags Explorer */}
                <section className="space-y-4">
                   <header className="flex items-center gap-3 text-[10px] font-black text-[#414944]/50 uppercase tracking-[0.2em] border-b border-[#c0c8c3]/20 pb-3">
                     <Tag size={14}/> Botanical Tags
                   </header>
                   <div className="flex flex-wrap gap-2">
                     {availableTags.map(tag => (
                       <button
                         key={tag._id}
                         onClick={(e) => { e.preventDefault(); handleTagChange(tag._id); }}
                         className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${tags.includes(tag._id) ? 'bg-[#00261b] text-white underline decoration-wavy' : 'bg-[#fbf9f5] text-[#414944] hover:bg-[#efeeea]'}`}
                       >
                         {tag.name}
                       </button>
                     ))}
                   </div>
                   <div className="flex items-center gap-2 pt-4">
                      <input 
                        type="text" 
                        placeholder="New tag..." 
                        value={newTagName}
                        onChange={(e) => setNewTagName(e.target.value)}
                        className="flex-1 bg-[#fbf9f5] border-transparent rounded-xl px-4 py-3 text-xs font-bold focus:ring-0 outline-none" 
                      />
                      <button onClick={(e) => { e.preventDefault(); handleAddNewTag(); }} className="p-3 bg-[#00261b] text-white rounded-xl"><Plus size={16}/></button>
                   </div>
                </section>

                <div className="mt-auto space-y-4">
                   <button onClick={() => handleSubmit('draft')} className="w-full py-4 text-[10px] font-black uppercase tracking-widest text-[#414944] bg-[#fbf9f5] hover:bg-[#efeeea] rounded-2xl transition-all">Save as Greenhouse Draft</button>
                   <p className="text-[10px] text-center text-[#414944]/40 font-bold uppercase tracking-widest leading-relaxed">Changes are auto-saved to cloud infrastructure during bloom.</p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default CreatePostPage;
