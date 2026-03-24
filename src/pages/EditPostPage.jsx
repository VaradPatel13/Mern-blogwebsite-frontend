import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBlogById, updateBlog } from '../services/blogService';
import ImageUpload from '../components/ImageUpload';
import { useToast } from '@/components/ui/toast';
import { ArrowLeft, Save, Send, ImageIcon as ImageIcon2, Image as ImageIcon, Settings, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const EditPostPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [existingCoverImageUrl, setExistingCoverImageUrl] = useState('');
  const [status, setStatus] = useState('draft');
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
          setBody(blog.body || '');
          setStatus(blog.status || 'draft');
          setExistingCoverImageUrl(blog.coverImage || '');
        }
      } catch (err) {
        setError(err.message || 'Failed to load story data.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

  const handleSubmit = async (e, publishStatus) => {
    e.preventDefault();
    setError('');
    const finalStatus = publishStatus || status;

    if (!title || !body) {
      setError('Title and story content are required.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setSaving(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('status', finalStatus);

    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const response = await updateBlog(id, formData);
      if (response.success) {
        toast({
          title: finalStatus === 'published' ? "Story Published" : "Draft updated",
          description: `Your edits have been saved.`
        });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to update post.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 bg-[var(--background)]">
        <div className="w-12 h-12 border-4 border-[#c0c8c3]/20 border-t-[#00261b] rounded-full animate-spin"></div>
        <p className="text-[#00261b] font-black uppercase tracking-widest text-xs">Unearthing Bloom...</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[var(--background)] font-manrope selection:bg-[#bcedd7] selection:text-[#002116] pb-24 relative overflow-hidden flex flex-col pt-8 lg:pt-16 w-full">
      
      {/* Decorative Blob */}
      <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-[#a0d1bc]/20 rounded-full blur-[120px] pointer-events-none z-0"></div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-[1400px] mx-auto w-full px-6 lg:px-12 relative z-10"
      >

        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 pb-8 border-b border-[#c0c8c3]/30">
          <div className="flex items-center gap-6">
            <Link to="/dashboard" className="w-12 h-12 flex items-center justify-center text-[#414944] hover:text-[#00261b] bg-[#eae8e4] hover:bg-[#d6d4d0] shadow-sm hover:shadow-md rounded-full transition-all duration-300">
              <ArrowLeft size={20} strokeWidth={2.5} />
            </Link>
            <div>
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#7b5455] mb-2 hidden sm:block">Modification Mode</p>
              <h1 className="text-4xl lg:text-5xl font-newsreader font-black tracking-tighter text-[#00261b] leading-none mb-1">Editing Bloom</h1>
            </div>
          </div>
          <div className="flex items-center gap-4 w-full sm:w-auto mt-4 sm:mt-0">
            <button
              onClick={(e) => handleSubmit(e, 'draft')}
              disabled={saving}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-8 py-4 text-[11px] uppercase tracking-widest font-black text-[#414944] bg-[#eae8e4] border border-transparent hover:border-[#c0c8c3] hover:bg-white rounded-2xl transition-all shadow-sm active:scale-95"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} strokeWidth={2.5} />} Save Draft
            </button>
            <button
              onClick={(e) => handleSubmit(e, 'published')}
              disabled={saving}
              className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-10 py-4 text-[11px] uppercase tracking-widest font-black text-[#bcedd7] bg-[#00261b] hover:bg-[#214f3f] rounded-2xl transition-all shadow-[0_15px_30px_rgba(0,38,27,0.15)] hover:shadow-[0_20px_40px_rgba(0,38,27,0.25)] hover:-translate-y-1 active:translate-y-0 active:scale-95"
            >
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} strokeWidth={2.5} />} {status === 'published' ? 'Update Published' : 'Publish Now'}
            </button>
          </div>
        </div>

        {error && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[#ffdad6]/30 text-[#ba1a1a] border border-[#ffdad6] px-8 py-5 rounded-[1.5rem] mb-12 text-[11px] font-black uppercase tracking-widest shadow-sm backdrop-blur-sm flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-[#ba1a1a] text-white flex items-center justify-center text-lg shrink-0">!</span>
            {error}
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 lg:gap-16">

          {/* Editor Column */}
          <div className="space-y-8">
            
            {/* Title Input */}
            <div className="bg-[#f5f3ef] rounded-[2rem] border border-[#c0c8c3]/20 p-8 md:p-10 shadow-[0_20px_40px_rgba(0,38,27,0.02)] transition-shadow focus-within:shadow-[0_20px_40px_rgba(0,38,27,0.05)] focus-within:bg-white">
              <input
                type="text"
                placeholder="Enter a captivating title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full text-4xl lg:text-5xl font-newsreader font-black tracking-tighter text-[#00261b] placeholder:text-[#c0c8c3] border-none focus:ring-0 bg-transparent px-0 py-2 resize-none outline-none leading-[1.1] md:leading-[1]"
              />
            </div>

            {/* Quill Editor */}
            <div className="bg-[#f5f3ef] rounded-[2rem] border border-[#c0c8c3]/20 shadow-[0_20px_40px_rgba(0,38,27,0.02)] overflow-hidden focus-within:shadow-[0_20px_40px_rgba(0,38,27,0.05)] focus-within:bg-white transition-all">
              <div className="w-full">
                <ReactQuill
                  theme="snow"
                  value={body}
                  onChange={setBody}
                  placeholder="Weave your thoughts here..."
                  className="quill-premium-editor text-lg text-[#1b1c1a] font-medium leading-relaxed min-h-[500px]"
                  modules={{
                    toolbar: [
                      [{ 'header': [2, 3, false] }],
                      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                      [{'list': 'ordered'}, {'list': 'bullet'}],
                      ['link', 'image', 'code-block'],
                      ['clean']
                    ]
                  }}
                />
              </div>
            </div>
          </div>

          {/* Sidebar Settings Configuration */}
          <div className="space-y-8">

            {/* Cover Image Settings */}
            <div className="bg-[#f5f3ef] border border-[#c0c8c3]/20 rounded-[2rem] p-8 shadow-[0_20px_40px_rgba(0,38,27,0.02)]">
              <h3 className="text-[10px] font-black text-[#414944]/60 uppercase tracking-[0.2em] flex items-center gap-3 mb-6 pb-4 border-b border-[#c0c8c3]/30">
                <ImageIcon size={16} className="text-[#00261b]" strokeWidth={2.5} /> Featured Visual
              </h3>
              
              {existingCoverImageUrl && !coverImage && (
                <div className="mb-6 relative rounded-[1.5rem] overflow-hidden border border-[#c0c8c3]/20 shadow-md">
                  <img src={existingCoverImageUrl} alt="Current cover" className="w-full h-auto object-cover aspect-[16/9]" />
                  <div className="absolute inset-0 bg-black/10"></div>
                </div>
              )}

              <ImageUpload onFileChange={setCoverImage} />
              <p className="text-[9px] text-[#414944]/60 mt-5 uppercase tracking-widest text-center font-bold">Upload to overwrite current visual</p>
            </div>

            {/* Publishing Settings */}
            <div className="bg-[#e4e2de]/40 border border-[#c0c8c3]/30 rounded-[2rem] p-8 shadow-[inset_0_-10px_40px_rgba(255,255,255,0.5),0_10px_20px_rgba(0,38,27,0.02)] focus-within:bg-[#f5f3ef] transition-colors duration-500">
              <h3 className="text-[10px] font-black text-[#414944]/60 uppercase tracking-[0.2em] flex items-center gap-3 mb-6 pb-4 border-b border-[#c0c8c3]/30">
                <Settings size={16} className="text-[#00261b]" strokeWidth={2.5} /> Visibility Control
              </h3>
              <div className="space-y-4">
                <label className="flex items-center gap-5 p-5 bg-white border-2 border-[#efeeea] rounded-2xl cursor-pointer hover:border-[#00261b] hover:shadow-md transition-all group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${status === 'published' ? 'border-[#0a251c] bg-[#0a251c]' : 'border-[#c0c8c3] group-hover:border-[#0a251c]'}`}>
                    {status === 'published' && <div className="w-2 h-2 rounded-full bg-[#bcedd7]" />}
                  </div>
                  <input type="radio" value="published" checked={status === 'published'} onChange={() => setStatus('published')} className="hidden" />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#00261b]">World Wide</span>
                    <span className="text-[10px] font-black text-[#414944]/60 uppercase tracking-widest mt-0.5">Publicly visible</span>
                  </div>
                </label>
                <label className="flex items-center gap-5 p-5 bg-white border-2 border-[#efeeea] rounded-2xl cursor-pointer hover:border-[#00261b] hover:shadow-md transition-all group">
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${status === 'draft' ? 'border-[#0a251c] bg-[#0a251c]' : 'border-[#c0c8c3] group-hover:border-[#0a251c]'}`}>
                    {status === 'draft' && <div className="w-2 h-2 rounded-full bg-[#bcedd7]" />}
                  </div>
                  <input type="radio" value="draft" checked={status === 'draft'} onChange={() => setStatus('draft')} className="hidden" />
                  <div className="flex flex-col">
                    <span className="text-[15px] font-bold text-[#00261b]">Greenhouse Draft</span>
                    <span className="text-[10px] font-black text-[#414944]/60 uppercase tracking-widest mt-0.5">Only you can see</span>
                  </div>
                </label>
              </div>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default EditPostPage;
