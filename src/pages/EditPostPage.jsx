import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { getBlogById, updateBlog } from '../services/blogService';
import ImageUpload from '../components/ImageUpload';
import NotionEditor from '../components/editor/NotionEditor';
import { useToast } from '@/components/ui/toast';
import {
  ArrowLeft, Image as ImageIcon, Settings, Save, Send,
  X, PenLine, BookOpen, Sidebar as SidebarIcon, Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EditPostPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [existingCoverImageUrl, setExistingCoverImageUrl] = useState('');
  const [status, setStatus] = useState('draft');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [initialContent, setInitialContent] = useState(null);

  const editorRef = useRef(null);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getBlogById(id);
        if (response.success) {
          const blog = response.data;
          setTitle(blog.title || '');
          setStatus(blog.status || 'draft');
          setExistingCoverImageUrl(blog.coverImage || '');

          // Parse stored body — it could be TipTap JSON string or legacy HTML
          if (blog.body) {
            try {
              const parsed = JSON.parse(blog.body);
              setInitialContent(parsed);
            } catch {
              // Legacy HTML body — wrap in a doc structure for TipTap
              setInitialContent(blog.body);
            }
          }
        }
      } catch (err) {
        setError(err.message || 'Failed to load story data.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

  const handleSubmit = async (publishStatus) => {
    setError('');
    const finalStatus = publishStatus || status;

    const editorContent = editorRef.current?.getEditorJson();

    if (!title || !editorContent) {
      setError('Title and content are required.');
      return;
    }

    setSaving(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', JSON.stringify(editorContent));
    formData.append('status', finalStatus);

    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const response = await updateBlog(id, formData);
      if (response.success) {
        toast({
          title: finalStatus === 'published' ? 'Story Published' : 'Draft updated',
          description: 'Your edits have been saved.',
        });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to update post.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-[#fbf9f5]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#c0c8c3]/20 border-t-[#00261b] rounded-full animate-spin"></div>
          <p className="text-[#00261b] font-black uppercase tracking-widest text-xs">Loading editor...</p>
        </div>
      </div>
    );
  }

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
        <header className="h-18 px-4 md:px-8 flex items-center justify-between border-b border-[#c0c8c3]/10 bg-[#fbf9f5]/80 backdrop-blur-md sticky top-0 z-30 shrink-0">
          <div className="flex items-center gap-4 md:gap-6">
            <Link to="/dashboard" className="text-[#414944] hover:text-[#00261b] p-2 -ml-2 transition-colors"><ArrowLeft size={18} /></Link>
            <div className="flex items-center gap-3">
              <span className="w-2 h-2 rounded-full bg-[#7b5455] animate-pulse" />
              <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-[#414944]/50">Editing Mode — Refining Bloom</span>
            </div>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className={`p-2.5 rounded-xl transition-all ${sidebarOpen ? 'bg-[#bcedd7] text-[#00261b]' : 'hover:bg-white text-[#414944]'}`}
              title="Post Details"
            >
              <SidebarIcon size={20} />
            </button>
            <button
               onClick={() => handleSubmit('published')}
               disabled={saving}
               className="px-6 py-2.5 md:px-8 bg-[#00261b] text-white text-[11px] font-black uppercase tracking-widest rounded-full shadow-lg hover:shadow-xl hover:bg-[#214f3f] transition-all hover:-translate-y-0.5 flex items-center gap-2"
            >
              {saving ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              {status === 'published' ? 'Update' : 'Publish'}
            </button>
          </div>
        </header>

        {/* 3. CENTER CANVAS */}
        <main
          className="flex-1 overflow-y-auto scroll-smooth flex justify-center py-20 px-6"
          onClick={(e) => {
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

            {/* Notion-style TITLE */}
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

            {/* Notion Block Editor — pre-loaded with existing content */}
            <div>
              {initialContent !== null ? (
                <NotionEditor ref={editorRef} content={initialContent} />
              ) : (
                <NotionEditor ref={editorRef} />
              )}
            </div>
          </div>
        </main>

        {/* 4. SETTINGS SIDEBAR */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
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
                  <h3 className="text-sm font-black text-[#00261b] uppercase tracking-widest">Post Settings</h3>
                  <button onClick={() => setSidebarOpen(false)} className="text-[#414944] hover:text-[#00261b] p-2 hover:bg-[#f5f3ef] rounded-full"><X size={20}/></button>
                </div>

                {/* Featured Visual */}
                <section className="space-y-4">
                  <header className="flex items-center gap-3 text-[10px] font-black text-[#414944]/50 uppercase tracking-[0.2em] border-b border-[#c0c8c3]/20 pb-3">
                    <ImageIcon size={14}/> Featured Visual
                  </header>
                  {existingCoverImageUrl && !coverImage && (
                    <div className="relative rounded-xl overflow-hidden border border-[#c0c8c3]/20 shadow-md">
                      <img src={existingCoverImageUrl} alt="Current cover" className="w-full h-auto object-cover aspect-[16/9]" />
                    </div>
                  )}
                  <ImageUpload onFileChange={setCoverImage} />
                  <p className="text-[9px] text-[#414944]/60 uppercase tracking-widest text-center font-bold">Upload to replace current image</p>
                </section>

                {/* Visibility Control */}
                <section className="space-y-4">
                  <header className="flex items-center gap-3 text-[10px] font-black text-[#414944]/50 uppercase tracking-[0.2em] border-b border-[#c0c8c3]/20 pb-3">
                    <Settings size={14}/> Visibility
                  </header>
                  <div className="space-y-3">
                    {[
                      { value: 'published', label: 'Published', desc: 'Publicly visible' },
                      { value: 'draft', label: 'Draft', desc: 'Only you can see' },
                    ].map(opt => (
                      <label key={opt.value} className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all border-2 ${status === opt.value ? 'border-[#00261b] bg-[#fbf9f5]' : 'border-[#efeeea] hover:border-[#c0c8c3]'}`}>
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${status === opt.value ? 'border-[#00261b] bg-[#00261b]' : 'border-[#c0c8c3]'}`}>
                          {status === opt.value && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                        <input type="radio" value={opt.value} checked={status === opt.value} onChange={() => setStatus(opt.value)} className="hidden" />
                        <div>
                          <p className="text-sm font-bold text-[#00261b]">{opt.label}</p>
                          <p className="text-[10px] text-[#414944]/60 uppercase tracking-widest">{opt.desc}</p>
                        </div>
                      </label>
                    ))}
                  </div>
                </section>

                <div className="mt-auto">
                  <p className="text-[10px] text-center text-[#414944]/40 font-bold uppercase tracking-widest leading-relaxed">Changes are saved when you click Save Draft or Publish.</p>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default EditPostPage;
