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
    <div className="max-w-7xl mx-auto font-sans pt-10">

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">New Story</h1>
            <p className="text-sm font-medium text-slate-500">Auto-saving as Draft</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg transition-colors"
          >
            <Save size={16} /> Save as Draft
          </button>
          <button
            onClick={(e) => handleSubmit(e, 'published')}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm"
          >
            <Send size={16} /> Publish Now
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 border border-red-200 px-4 py-3 rounded-lg mb-8 font-medium">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-10">

        {/* Editor Column */}
        <div className="space-y-2 mt-4">
          {/* Title Input */}
          <div>
            <input
              type="text"
              placeholder="Enter a captivating title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-5xl font-serif font-bold text-slate-900 placeholder:text-slate-300 border-none focus:ring-0 bg-transparent px-0 py-4 mb-2 resize-none outline-none leading-tight"
            />
          </div>

          {/* Quill Editor */}
          <div>
            {/* 
              Clean Editor Container with Persistent Toolbar
            */}
            <div className="w-full">
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                placeholder="Tell your story..."
                className="quill-medium-editor text-xl font-serif text-slate-800 leading-relaxed min-h-[500px]"
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
        <div className="space-y-6">

          {/* Cover Image Settings */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4">
              <ImageIcon size={16} className="text-slate-400" /> Featured Image
            </h3>
            <ImageUpload onFileChange={setCoverImage} />
            <p className="text-xs text-slate-500 mt-3 font-medium">High-resolution images work best (1920x1080 recommended).</p>
          </div>

          {/* Category Settings */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4">
              <Layout size={16} className="text-slate-400" /> Topic / Category
            </h3>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 focus:outline-none transition-all"
            >
              <option value="" disabled>Select primary topic</option>
              {availableCategories.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.name}</option>
              ))}
            </select>
          </div>

          {/* Tags Settings */}
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4">
              <Tag size={16} className="text-slate-400" /> Related Tags
            </h3>

            <div className="flex flex-wrap gap-2 mb-5">
              {availableTags.map(tag => (
                <button
                  key={tag._id}
                  type="button"
                  onClick={() => handleTagChange(tag._id)}
                  className={`px-3 py-1.5 text-xs font-bold rounded-md transition-colors border ${tags.includes(tag._id)
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                >
                  {tag.name}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
              <input
                type="text"
                placeholder="Create new tag..."
                value={newTagName}
                onChange={(e) => setNewTagName(e.target.value)}
                className="w-full text-sm font-medium bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-teal-600/20 focus:border-teal-600 outline-none transition-all"
              />
              <button
                type="button"
                onClick={handleAddNewTag}
                className="shrink-0 w-9 h-9 flex items-center justify-center bg-slate-900 hover:bg-slate-800 text-white rounded-lg transition-colors"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Publishing Settings */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide flex items-center gap-2 mb-4">
              <Settings size={16} className="text-slate-400" /> Visibility
            </h3>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-teal-600 transition-colors">
                <input type="radio" value="published" checked={status === 'published'} onChange={() => setStatus('published')} className="text-teal-600 focus:ring-teal-600 w-4 h-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">Public</span>
                  <span className="text-xs font-medium text-slate-500">Visible to everyone</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3 bg-white border border-slate-200 rounded-lg cursor-pointer hover:border-teal-600 transition-colors">
                <input type="radio" value="draft" checked={status === 'draft'} onChange={() => setStatus('draft')} className="text-teal-600 focus:ring-teal-600 w-4 h-4" />
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-slate-900">Draft</span>
                  <span className="text-xs font-medium text-slate-500">Only visible to you</span>
                </div>
              </label>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CreatePostPage;
