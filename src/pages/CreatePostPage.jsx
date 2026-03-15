import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Reverted to Snow theme for a persistent toolbar
import { createBlog } from '../services/blogService';
import { getAllTags, createTag } from '../services/tagService';
import { getAllCategories } from '../services/categoryService';
import ImageUpload from '../components/ImageUpload';
import { useToast } from '@/components/ui/toast';
import { Plus, ArrowLeft, Image as ImageIcon, Layout, Tag, Settings, Save, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('draft');

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
      console.error("Failed to fetch categories or tags", err);
    }
  };

  const handleTagChange = (tagId) => {
    setTags(prev =>
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };

  const handleAddNewTag = async () => {
    if (!newTagName.trim()) return;
    try {
      const response = await createTag(newTagName);
      if (response.success) {
        setAvailableTags(prev => [...prev, response.data]);
        setTags(prev => [...prev, response.data._id]);
        setNewTagName('');
        toast({ title: "Tag added" });
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message || 'Failed to create tag.' });
    }
  };

  const handleSubmit = async (e, publishStatus) => {
    e.preventDefault();
    setError('');
    const finalStatus = publishStatus || status;

    if (!title || !body || !coverImage || !category) {
      setError('Title, body content, cover image, and category are required before saving.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('coverImage', coverImage);
    formData.append('category', category);
    formData.append('status', finalStatus);
    tags.forEach(tagId => formData.append('tags[]', tagId));

    try {
      const response = await createBlog(formData);
      if (response.success) {
        toast({
          title: finalStatus === 'published' ? "Published successfully" : "Draft saved",
          description: `Your story is now ${finalStatus}.`
        });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to save story.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto font-sans pt-12 pb-24 px-6"
    >

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-12 pb-8 border-b border-slate-100">
        <div className="flex items-center gap-6">
          <Link to="/dashboard" className="p-3 text-slate-400 hover:text-slate-900 bg-slate-50 border border-slate-100 hover:border-slate-300 hover:bg-white hover:shadow-lg rounded-2xl transition-all">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tighter text-slate-900 mb-1">New Story</h1>
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-teal-600">Auto-saving as Draft</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 text-sm font-bold text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 hover:text-slate-900 rounded-2xl transition-all hover:shadow-md"
          >
            <Save size={16} /> Save Draft
          </button>
          <button
            onClick={(e) => handleSubmit(e, 'published')}
            disabled={loading}
            className="flex items-center gap-2 px-8 py-3 text-sm font-bold text-white bg-slate-900 hover:bg-teal-600 rounded-2xl transition-all hover:shadow-xl hover:-translate-y-0.5"
          >
            <Send size={16} /> Publish
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 border border-red-100 px-6 py-4 rounded-2xl mb-10 text-[11px] font-black uppercase tracking-widest shadow-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">

        {/* Editor Column */}
        <div className="space-y-6">
          {/* Title Input */}
          <div className="bg-white rounded-[2rem] border border-slate-100 p-8 shadow-xl shadow-slate-200/50">
            <input
              type="text"
              placeholder="Enter a captivating title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl lg:text-5xl font-bold tracking-tighter text-slate-900 placeholder:text-slate-200 border-none focus:ring-0 bg-transparent px-0 py-2 resize-none outline-none leading-[1.1]"
            />
          </div>

          {/* Quill Editor */}
          <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
            <div className="w-full">
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                placeholder="Weave your thoughts here..."
                className="quill-premium-editor text-lg text-slate-700 leading-relaxed min-h-[500px]"
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
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
              <ImageIcon size={14} className="text-teal-500" /> Featured Image
            </h3>
            <ImageUpload onFileChange={setCoverImage} />
            <p className="text-[10px] text-slate-400 mt-4 uppercase tracking-widest text-center">Format: 16:9 Recommended</p>
          </div>

          {/* Category Settings */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
              <Layout size={14} className="text-teal-500" /> Primary Topic
            </h3>
            <div className="relative">
                <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full text-sm font-bold text-slate-700 bg-slate-50 border border-slate-100 rounded-xl px-5 py-4 appearance-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 focus:outline-none transition-all cursor-pointer"
                >
                <option value="" disabled>Select primary topic</option>
                {availableCategories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-5 text-slate-400">
                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                </div>
            </div>
          </div>

          {/* Tags Settings */}
          <div className="bg-white border border-slate-100 rounded-[2rem] p-8 shadow-xl shadow-slate-200/50">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
              <Tag size={14} className="text-teal-500" /> Related Tags
            </h3>

            <div className="flex flex-wrap gap-2 mb-6">
              {availableTags.map(tag => (
                <button
                  key={tag._id}
                  type="button"
                  onClick={() => handleTagChange(tag._id)}
                  className={`px-4 py-2 text-[11px] font-bold uppercase tracking-widest rounded-xl transition-all border ${tags.includes(tag._id)
                      ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/20'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
              <input
                type="text"
                placeholder="New tag..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="w-full text-sm font-bold bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500 outline-none transition-all placeholder:text-slate-300"
              />
              <button
                type="button"
                onClick={handleAddNewTag}
                className="shrink-0 w-12 h-12 flex items-center justify-center bg-slate-900 hover:bg-teal-600 text-white rounded-xl transition-all hover:shadow-lg"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* Publishing Settings */}
          <div className="bg-slate-50 border border-slate-100 rounded-[2rem] p-8 shadow-inner focus-within:bg-white focus-within:shadow-xl transition-all duration-500">
            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] flex items-center gap-2 mb-6">
              <Settings size={14} className="text-slate-500" /> Visibility
            </h3>
            <div className="space-y-4">
              <label className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl cursor-pointer hover:border-teal-500 hover:shadow-md transition-all">
                <input type="radio" value="published" checked={status === 'published'} onChange={() => setStatus('published')} className="text-teal-500 focus:ring-teal-500 w-5 h-5 accent-teal-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">Public</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Visible to World</span>
                </div>
              </label>
              <label className="flex items-center gap-4 p-4 bg-white border border-slate-100 rounded-2xl cursor-pointer hover:border-teal-500 hover:shadow-md transition-all">
                <input type="radio" value="draft" checked={status === 'draft'} onChange={() => setStatus('draft')} className="text-teal-500 focus:ring-teal-500 w-5 h-5 accent-teal-500" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">Draft</span>
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Only You</span>
                </div>
              </label>
            </div>
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default CreatePostPage;
