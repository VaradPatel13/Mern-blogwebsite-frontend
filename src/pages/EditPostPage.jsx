
// src/pages/EditPostPage.jsx (NEW FILE)
// A page pre-filled with existing blog data for editing.

import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { getBlogById, updateBlog } from '../services/blogService';

const EditPostPage = () => {
  const { id } = useParams(); // Get blog ID from URL
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [existingCoverImageUrl, setExistingCoverImageUrl] = useState('');
  const [status, setStatus] = useState('draft');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await getBlogById(id);
        if (response.success) {
          const blog = response.data;
          setTitle(blog.title);
          setBody(blog.body);
          setStatus(blog.status);
          setExistingCoverImageUrl(blog.coverImage);
        }
      } catch (err) {
        setError(err.message || 'Failed to load blog data.');
      } finally {
        setLoading(false);
      }
    };
    fetchBlogData();
  }, [id]);

  const handleFileChange = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('status', status);
    if (coverImage) {
      formData.append('coverImage', coverImage);
    }

    try {
      const response = await updateBlog(id, formData);
      if (response.success) {
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to update post.');
    }
  };

  if (loading) return <p>Loading editor...</p>;
  if (error && !title) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-4xl mx-auto py-8">
      <h1 className="text-4xl font-bold mb-8">Edit Post</h1>
      
      {error && <p className="text-red-500 bg-red-100 p-3 rounded-lg mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-2">Title</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full px-4 py-2 border rounded-lg"/>
        </div>
        
        <div>
          <label htmlFor="coverImage" className="block text-lg font-medium text-gray-700 mb-2">Change Cover Image (Optional)</label>
          <input type="file" id="coverImage" onChange={handleFileChange} className="w-full text-gray-700"/>
          {existingCoverImageUrl && <img src={existingCoverImageUrl} alt="Current cover" className="w-48 mt-2 rounded"/>}
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700 mb-2">Body</label>
          <ReactQuill theme="snow" value={body} onChange={setBody} className="bg-white"/>
        </div>

        <div>
          <label htmlFor="status" className="block text-lg font-medium text-gray-700 mb-2">Status</label>
          <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full px-4 py-2 border rounded-lg">
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 text-lg font-semibold">
          Update Post
        </button>
      </form>
    </div>
  );
};

export default EditPostPage;
