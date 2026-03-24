import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { addComment } from '../services/commentService';
import { Link } from 'react-router-dom';
import { Send, MessageCircle } from 'lucide-react';
import { formatTimeAgo } from '../utils/timeUtils';

const CommentSection = ({ blogId, initialComments, setComments }) => {
    const [newComment, setNewComment] = useState('');
    const { isAuthenticated, user } = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim() || isSubmitting) return;
        
        try {
            setIsSubmitting(true);
            const response = await addComment(blogId, newComment);
            if (response.success) {
                setComments(prev => [response.data, ...prev]);
                setNewComment('');
            }
        } catch (error) {
            console.error("Error posting comment:", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="mt-16 pt-16 border-t border-slate-100">
            <div className="flex items-center gap-3 mb-10">
                <h2 className="text-2xl font-serif font-bold text-slate-900">
                    Responses <span className="text-slate-400 font-sans text-xl ml-2 font-normal">({initialComments.length})</span>
                </h2>
            </div>
            
            {isAuthenticated ? (
                <form onSubmit={handleCommentSubmit} className="mb-14">
                    <div className="relative bg-slate-50 border border-slate-200 rounded-xl p-4 transition-all focus-within:bg-white focus-within:ring-2 focus-within:ring-slate-100 focus-within:border-slate-300">
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="What are your thoughts?"
                            className="w-full p-4 bg-transparent text-slate-800 placeholder:text-slate-400 focus:outline-none resize-none min-h-[120px] text-lg leading-relaxed"
                            disabled={isSubmitting}
                        ></textarea>
                        <div className="flex justify-between items-center mt-2 pt-4 border-t border-slate-200/50">
                            <div className="flex items-center gap-3">
                                <img src={user?.avatar} className="w-8 h-8 rounded-full border border-slate-100" alt="me" />
                                <span className="text-sm font-medium text-slate-500">Posting as {user?.fullName}</span>
                            </div>
                            <button 
                                type="submit" 
                                disabled={isSubmitting || !newComment.trim()}
                                className="px-6 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 transition-all disabled:opacity-50 text-sm shadow-sm"
                            >
                                {isSubmitting ? 'Posting...' : 'Post response'}
                            </button>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="mb-14 p-10 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                    <p className="text-slate-600 font-medium mb-4">Log in to join the conversation.</p>
                    <Link to="/login" className="inline-block px-8 py-2.5 bg-white text-slate-900 font-bold rounded-lg border border-slate-200 shadow-sm hover:bg-slate-50 transition-all text-sm">
                        Log in
                    </Link>
                </div>
            )}

            <div className="space-y-10">
                {initialComments.length > 0 ? (
                    initialComments.map(comment => (
                        <div key={comment._id} className="pb-8 border-b border-slate-50 last:border-0">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <Link to={`/profile/${comment.owner.username}`}>
                                        <img 
                                            src={comment.owner.avatar} 
                                            alt={comment.owner.fullName} 
                                            className="w-10 h-10 rounded-full border border-slate-100 object-cover" 
                                        />
                                    </Link>
                                    <div>
                                        <Link to={`/profile/${comment.owner.username}`} className="font-bold text-slate-900 hover:underline underline-offset-2 transition-colors text-sm">
                                            {comment.owner.fullName}
                                        </Link>
                                        <div className="text-[12px] text-slate-500 font-medium">
                                            {formatTimeAgo(comment.createdAt)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-slate-700 leading-relaxed text-base">
                                {comment.text}
                            </p>
                        </div>
                    ))
                ) : (
                    <div className="py-12 text-center">
                        <p className="text-slate-400 font-medium">No responses yet. Be the first to share your thoughts.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CommentSection;
