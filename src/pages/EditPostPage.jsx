import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBlogById, updateBlog } from '../services/blogService';
import ImageUpload from '../components/ImageUpload';
import { useToast } from '@/components/ui/toast';
import { ArrowLeft, Save, Send, ImageIcon, Settings, Loader2 } from 'lucide-react';

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
      <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
        <Loader2 size={32} className="animate-spin text-slate-400" />
        <p className="text-slate-500 font-medium">Loading editor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto font-sans">

      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-slate-200">
        <div className="flex items-center gap-4">
          <Link to="/dashboard" className="p-2 text-slate-400 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-serif font-bold text-slate-900">Edit Story</h1>
            <p className="text-sm font-medium text-slate-500">Currently editing a {status}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={(e) => handleSubmit(e, 'draft')}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 rounded-lg transition-colors"
          >
            <Save size={16} /> Save as Draft
          </button>
          <button
            onClick={(e) => handleSubmit(e, 'published')}
            disabled={saving}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm"
          >
            <Send size={16} /> {status === 'published' ? 'Update Published' : 'Publish Now'}
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
        <div className="space-y-8">
          {/* Title Input */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Story Title</label>
            <input
              type="text"
              placeholder="Enter a captivating title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-4xl font-serif font-bold text-slate-900 placeholder:text-slate-300 border-0 border-b border-transparent hover:border-slate-200 focus:border-teal-600 focus:ring-0 bg-transparent px-0 py-2 transition-colors"
            />
          </div>

          {/* Quill Editor */}
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Story Content</label>
            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
              <ReactQuill
                theme="snow"
                value={body}
                onChange={setBody}
                placeholder="Begin developing your story..."
                className="min-h-[500px]"
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

            {existingCoverImageUrl && !coverImage && (
              <div className="mb-4 relative rounded-lg overflow-hidden border border-slate-200">
                <img src={existingCoverImageUrl} alt="Current cover" className="w-full h-auto object-cover" />
              </div>
            )}

            <ImageUpload onFileChange={setCoverImage} />
            <p className="text-xs text-slate-500 mt-3 font-medium">Upload a new file to replace the current image.</p>
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

export default EditPostPage;
