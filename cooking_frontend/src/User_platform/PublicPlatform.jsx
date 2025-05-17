import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import { FaHeart, FaCommentDots, FaEdit, FaTrash, FaUtensils } from 'react-icons/fa';
import './PublicPlatform.css';
import Header from '../Bawantha_components/Header';
import Sidebar from '../Bawantha_components/Sidebar';

const PublicPlatform = () => {
  const [recipes, setRecipes] = useState([]);
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [allComments, setAllComments] = useState({});
  const [editingIndex, setEditingIndex] = useState({});
  const [editComment, setEditComment] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState({});
  const [replyInputs, setReplyInputs] = useState({});
  const [allReplies, setAllReplies] = useState({});

  // Get user ID from localStorage
  const userString = localStorage.getItem("user");
  let userId = null;
  
  try {
    const user = JSON.parse(userString);
    userId = user?._id || user?.id; // Adjust based on your user object structure
  } catch (e) {
    console.error("Error parsing user data:", e);
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    axios.get('/api/recipes/shared')
      .then(res => {
        setRecipes(res.data);
        const commentsInit = {};
        res.data.forEach(post => {
          commentsInit[post.id] = post.comments || [];
        });
        setAllComments(commentsInit);
      });
  }, []);

  const handleLike = async (postId) => {
    if (!userId) {
      alert("Please login to like recipes");
      return;
    }

    try {
      const response = await axios.put(`/api/recipes/${postId}/like`, { userId });
      setRecipes(prev => prev.map(recipe => 
        recipe.id === postId ? response.data : recipe
      ));
    } catch (error) {
      console.error("Error liking recipe:", error);
    }
  };

  const toggleComments = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const toggleMenu = (id) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await axios.delete(`/api/recipes/${id}`);
      setRecipes(prev => prev.filter(recipe => recipe.id !== id));
    }
  };

  const handleCommentInput = (postId, value) => {
    setCommentInputs(prev => ({ ...prev, [postId]: value }));
  };

  const submitComment = async (postId) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;

    const response = await axios.put(`/api/recipes/${postId}/comment`, { comment });
    setAllComments(prev => ({ ...prev, [postId]: response.data.comments }));
    setCommentInputs(prev => ({ ...prev, [postId]: '' }));
  };

  const startEditing = (postId, index, text) => {
    setEditingIndex({ postId, index });
    setEditComment({ ...editComment, [postId]: text });
  };

  const saveEditedComment = async (postId, index) => {
    const newText = editComment[postId];
    const response = await axios.put(`/api/recipes/${postId}/comment/${index}`, { comment: newText });
    setAllComments(prev => ({ ...prev, [postId]: response.data.comments }));
    setEditingIndex({});
    setEditComment({});
  };

  const deleteComment = async (postId, index) => {
    const response = await axios.delete(`/api/recipes/${postId}/comment/${index}`);
    setAllComments(prev => ({ ...prev, [postId]: response.data.comments }));
  };

  const handleReply = (key) => {
    const reply = replyInputs[key]?.trim();
    if (!reply) return;

    setAllReplies(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), reply]
    }));

    setReplyInputs(prev => ({
      ...prev,
      [key]: ''
    }));
  };

  return (
    <div className="platform-wrapper">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />

      <div className="platform-content-wrapper">
        <div className="post-feed">
          {recipes.length === 0 ? (
            <div className="platform-empty">
              <div className="empty-icon">👨‍🍳</div>
              <p>No recipes have been shared yet. Be the first to inspire!</p>
            </div>
          ) : (
            recipes.map(post => (
              <motion.div
                key={post.id}
                className="recipe-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="recipe-card-header">
                  <div className="recipe-title-section">
                    <span className="recipe-icon">🍲</span>
                    <h2>{post.title}</h2>
                  </div>
                  <div className="menu-toggle" onClick={() => toggleMenu(post.id)}>⋮</div>
                  {openMenuId === post.id && (
                    <div className="dropdown-menu">
                      <div className="dropdown-item" onClick={() => handleEdit(post.id)}><FaEdit /> Edit</div>
                      <div className="dropdown-item" onClick={() => handleDelete(post.id)}><FaTrash /> Delete</div>
                    </div>
                  )}
                </div>

                <p className="recipe-description">{post.description}</p>

                <div className="media-gallery">
                  {post.mediaUrls?.map((url, index) => (
                    <img key={index} src={url} alt={`dish-${index}`} className="recipe-media" />
                  ))}
                </div>

                <div className="recipe-actions">
                  <button 
                    className={`like-btn ${post.likedByUsers?.includes(userId) ? 'liked' : ''}`} 
                    onClick={() => handleLike(post.id)}
                  >
                    <FaHeart /> {post.likedByUsers?.length || 0}
                  </button>
                  <button className="comment-btn" onClick={() => toggleComments(post.id)}>
                    <FaCommentDots /> {(allComments[post.id] || []).length}
                  </button>
                </div>

                {openComments[post.id] && (
                  <motion.div
                    className="comments-section"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h3>Comments</h3>
                    {(allComments[post.id] || []).length === 0 ? (
                      <p className="no-comments">No comments yet. Start the conversation!</p>
                    ) : (
                      allComments[post.id].map((cmt, index) => {
                        const replyKey = `${post.id}-${index}`;
                        return (
                          <motion.div
                            key={index}
                            className="comment-item"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {editingIndex.postId === post.id && editingIndex.index === index ? (
                              <div className="comment-edit">
                                <input
                                  value={editComment[post.id] || ''}
                                  onChange={(e) => setEditComment({ ...editComment, [post.id]: e.target.value })}
                                />
                                <button className="save-btn" onClick={() => saveEditedComment(post.id, index)}>💾</button>
                              </div>
                            ) : (
                              <div className="comment-display">
                                <span>💬 {cmt}</span>
                                <div className="comment-actions">
                                  <button onClick={() => startEditing(post.id, index, cmt)}>✏️</button>
                                  <button onClick={() => deleteComment(post.id, index)}>🗑️</button>
                                </div>
                              </div>
                            )}

                            <div className="reply-section">
                              {(allReplies[replyKey] || []).map((reply, rIndex) => (
                                <div key={rIndex} className="reply-item">↳ {reply}</div>
                              ))}
                              <div className="reply-input-group">
                                <input
                                  value={replyInputs[replyKey] || ''}
                                  onChange={(e) =>
                                    setReplyInputs(prev => ({
                                      ...prev,
                                      [replyKey]: e.target.value
                                    }))
                                  }
                                  placeholder="Reply..."
                                />
                                <button onClick={() => handleReply(replyKey)}>↩️</button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })
                    )}
                    <div className="comment-input-group">
                      <input
                        value={commentInputs[post.id] || ''}
                        onChange={(e) => handleCommentInput(post.id, e.target.value)}
                        placeholder="Share your thoughts… 💬"
                      />
                      <button onClick={() =>
                        setShowEmojiPicker(prev => ({ ...prev, [post.id]: !prev[post.id] }))
                      }>😀</button>
                      <button className="submit-btn" onClick={() => submitComment(post.id)}>🚀</button>
                    </div>
                    {showEmojiPicker[post.id] && (
                      <EmojiPicker
                        onEmojiClick={(emojiData) =>
                          setCommentInputs(prev => ({
                            ...prev,
                            [post.id]: (prev[post.id] || '') + emojiData.emoji
                          }))
                        }
                      />
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))
          )}
        </div>

        <aside className="right-panel">
          <div className="profile-card">
            <img src="/user-avatar.png" alt="User" />
            <h3>Welcome back, Chef!</h3>
            <button className="post-btn">+ Share a Recipe</button>
          </div>

          <div className="trending-tags">
            <h4>🔥 Trending Tags</h4>
            <div className="tags">
              <span>#Breakfast</span>
              <span>#Healthy</span>
              <span>#QuickMeals</span>
            </div>
          </div>

          <div className="top-creators">
            <h4>👑 Top Creators</h4>
            <ul>
              <li>@chef_anna</li>
              <li>@veggie_vibes</li>
              <li>@quickbites</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PublicPlatform;