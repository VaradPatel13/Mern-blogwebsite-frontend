

// src/components/CommentSection.jsx (NEW FILE)
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addComment } from '../services/commentService';
import { Link } from 'react-router-dom';

const CommentSection = ({ blogId, initialComments, setComments }) => {
    const [newComment, setNewComment] = useState('');
    const { isAuthenticated } = useAuth();

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;
        try {
            const response = await addComment(blogId, newComment);
            if (response.success) {
                setComments(prev => [response.data, ...prev]);
                setNewComment('');
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    return (
        <div>
            <h2 className="text-3xl font-bold mb-6">Comments</h2>
            {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="mb-8">
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add your comment..."
                        className="w-full p-3 border rounded-lg"
                        rows="3"
                    ></textarea>
                    <button type="submit" className="mt-2 px-4 py-2 bg-amber-500 text-white rounded-md">Post Comment</button>
                </form>
            ) : (
                <p className="mb-8">Please <Link to="/login" className="text-blue-500">log in</Link> to comment.</p>
            )}
            <div className="space-y-6">
                {initialComments.map(comment => (
                    <div key={comment._id} className="flex items-start space-x-3">
                        <img src={comment.owner.avatar} alt={comment.owner.fullName} className="w-10 h-10 rounded-full" />
                        <div>
                            <p className="font-semibold">{comment.owner.fullName}</p>
                            <p className="text-sm text-gray-500">{new Date(comment.createdAt).toLocaleString()}</p>
                            <p className="mt-1">{comment.text}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CommentSection;
