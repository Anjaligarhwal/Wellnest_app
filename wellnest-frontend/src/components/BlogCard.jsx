import React, { useState } from 'react';
import { FiClock, FiMessageSquare, FiHeart } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { toggleLike } from '../api/blogApi';

const BlogCard = ({ post, onRefresh }) => {
    const [likes, setLikes] = useState(post.likes);
    const [isLiked, setIsLiked] = useState(false);
    const [isLiking, setIsLiking] = useState(false);

    const handleLike = async (e) => {
        e.preventDefault(); 
        e.stopPropagation();

        if (isLiking) return;

        setIsLiking(true);
        try {
            const response = await toggleLike(post.id);

            if (response.data) {
                setLikes(response.data.likes);
                setIsLiked(!isLiked);
            }
        } catch (err) {
            console.error('Error liking post:', err);
           
            if (isLiked) {
                setLikes(likes - 1);
            } else {
                setLikes(likes + 1);
            }
            setIsLiked(!isLiked);
        } finally {
            setIsLiking(false);
        }
    };

    return (
        <div className="blog-card" style={{ background: '#ffffff', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', border: '1px solid #e2e8f0', overflow: 'hidden', borderRadius: '16px' }}>
            <div style={{ height: 160, overflow: 'hidden', background: '#f1f5f9', position: 'relative' }}>
                {post.image ? (
                    <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                    <div style={{ width: '100%', height: '100%', background: 'linear-gradient(135deg, #e2e8f0, #cbd5e1)' }} />
                )}
            </div>
            <div className="blog-card-content" style={{ padding: '20px' }}>
                <span className="blog-tag" style={{ background: '#f0f9ff', color: '#0284c7', padding: '4px 10px', borderRadius: '99px', fontSize: '12px', fontWeight: 600 }}>{post.category || 'Wellness'}</span>
                <h2 className="blog-title" style={{ color: '#0f172a', fontSize: '18px', fontWeight: 700, margin: '12px 0 8px' }}>{post.title}</h2>
                <p className="blog-excerpt" style={{ color: '#64748b', fontSize: '14px', lineHeight: '1.6', marginBottom: '16px' }}>{post.excerpt}</p>

                <div className="blog-footer" style={{ borderTop: '1px solid #f1f5f9', paddingTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="blog-author" style={{ color: '#64748b', fontSize: '13px' }}>
                        By <span style={{ color: '#334155', fontWeight: 600 }}>{post.author}</span>
                    </div>
                    <div className="blog-icon-stat" style={{ color: '#64748b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FiClock />
                        {post.date}
                    </div>
                </div>

                <div className="blog-footer" style={{ marginTop: 12, display: 'flex', gap: '16px' }}>
                    <div
                        className="blog-icon-stat"
                        onClick={handleLike}
                        style={{ cursor: isLiking ? 'wait' : 'pointer', userSelect: 'none', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}
                    >
                        <FiHeart style={{ color: isLiked ? '#ef4444' : '#64748b', fill: isLiked ? '#ef4444' : 'none', transition: 'all 0.2s' }} />
                        {likes}
                    </div>
                    <div className="blog-icon-stat" style={{ color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                        <FiMessageSquare style={{ color: '#64748b' }} /> {post.comments ? post.comments.length : 0}
                    </div>
                </div>
            </div>
            <Link to={`/blog/${post.id}`} className="primary-btn" style={{ borderRadius: 0, width: '100%', justifyContent: 'center', display: 'flex', padding: '12px', background: '#f8fafc', color: '#0f172a', borderTop: '1px solid #e2e8f0', fontWeight: 600 }}>
                Read Article
            </Link>
        </div>
    );
};

export default BlogCard;
