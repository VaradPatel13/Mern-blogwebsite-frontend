

// src/pages/CreatePostPage.jsx (REDESIGNED)

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { createBlog } from '../services/blogService';
import { getAllTags, createTag } from '../services/tagService';
import { getAllCategories } from '../services/categoryService';
import ImageUpload from '../components/ImageUpload';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/components/ui/toast';
import { Plus } from 'lucide-react';

const CreatePostPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [coverImage, setCoverImage] = useState(null);
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState([]);
  const [status, setStatus] = useState('draft'); // New state for status
  
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [newTagName, setNewTagName] = useState(''); // State for new tag input
  
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
        setTags(prev => [...prev, response.data._id]); // Auto-select the new tag
        setNewTagName(''); // Clear input
        toast({ title: "Tag Created", description: `"${response.data.name}" has been added.` });
      }
    } catch (err) {
      toast({ variant: "destructive", title: "Error", description: err.message || 'Failed to create tag.' });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!title || !body || !coverImage || !category) {
      setError('Title, body, cover image, and category are required.');
      return;
    }
    setLoading(true);

    const formData = new FormData();
    formData.append('title', title);
    formData.append('body', body);
    formData.append('coverImage', coverImage);
    formData.append('category', category);
    formData.append('status', status); // Add status to the form data
    tags.forEach(tagId => formData.append('tags[]', tagId));

    try {
      const response = await createBlog(formData);
      if (response.success) {
        toast({ title: "Success!", description: `Your post has been saved as a ${status}.` });
        navigate('/dashboard');
      }
    } catch (err) {
      setError(err.message || 'Failed to create post.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-amber-900">Write a New Story</h1>
          <Button type="submit" disabled={loading} className="bg-amber-600 hover:bg-amber-700 py-6 px-8 text-lg">
            {loading ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>

        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md mb-6" role="alert"><p>{error}</p></div>}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="shadow-lg">
              <CardContent className="p-6">
                <Input type="text" placeholder="Your Awesome Title Here..." value={title} onChange={(e) => setTitle(e.target.value)} className="text-3xl font-bold border-none shadow-none focus-visible:ring-0 h-auto p-0"/>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardContent className="p-2">
                <ReactQuill theme="snow" value={body} onChange={setBody} className="bg-white" placeholder="Tell your story..."/>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar for Metadata */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="text-amber-800">Publishing Details</CardTitle></CardHeader>
              <CardContent>
                <Label htmlFor="status">Status</Label>
                <select id="status" value={status} onChange={(e) => setStatus(e.target.value)} className="w-full p-3 border rounded-lg bg-white mt-2">
                  <option value="draft">Draft</option>
                  <option value="published">Published</option>
                </select>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="text-amber-800">Cover Image</CardTitle></CardHeader>
              <CardContent><ImageUpload onFileChange={setCoverImage} /></CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="text-amber-800">Category</CardTitle></CardHeader>
              <CardContent>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-3 border rounded-lg bg-white">
                  <option value="" disabled>Select a category</option>
                  {availableCategories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
                </select>
              </CardContent>
            </Card>
            <Card className="shadow-lg">
              <CardHeader><CardTitle className="text-amber-800">Tags</CardTitle><CardDescription>Select existing tags or add a new one.</CardDescription></CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {availableTags.map(tag => (
                    <button key={tag._id} type="button" onClick={() => handleTagChange(tag._id)} className={`px-3 py-1 text-sm rounded-full transition-colors ${tags.includes(tag._id) ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
                      {tag.name}
                    </button>
                  ))}
                </div>
                <div className="flex items-center space-x-2 border-t pt-4">
                  <Input type="text" placeholder="Add new tag..." value={newTagName} onChange={(e) => setNewTagName(e.target.value)} />
                  <Button type="button" onClick={handleAddNewTag} className="bg-gray-600 hover:bg-gray-700"><Plus size={16}/></Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePostPage;
