import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import EmojiPicker from 'emoji-picker-react';
import { 
  FaHeart, 
  FaCommentAlt, 
  FaPencilAlt, 
  FaTrashAlt, 
  FaUtensils,
  FaPaperPlane,
  FaSmile,
  FaSave,
  FaReply,
  FaEllipsisV,
  FaBars
} from 'react-icons/fa';
import { 
  BiCommentDetail, 
  BiSend, 
  BiLike, 
  BiSmile, 
  BiEditAlt, 
  BiTrash, 
  BiReply,
  BiCheck
} from 'react-icons/bi';
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
  const [isTyping, setIsTyping] = useState({});
  const [likeAnimations, setLikeAnimations] = useState({});
  const [newCommentIds, setNewCommentIds] = useState({});
  
  // Refs for animations and focus
  const commentInputRefs = useRef({});

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

    // Set animation flag
    setLikeAnimations(prev => ({...prev, [postId]: true}));
    
    // Reset animation flag after animation completes
    setTimeout(() => {
      setLikeAnimations(prev => ({...prev, [postId]: false}));
    }, 800);

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
    setOpenComments(prev => {
      const newState = { ...prev, [postId]: !prev[postId] };
      
      // Focus on comment input when opening comments
      if (newState[postId]) {
        setTimeout(() => {
          commentInputRefs.current[postId]?.focus();
        }, 300);
      }
      
      return newState;
    });
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
    
    // Show typing indicator
    if (value.length > 0) {
      if (!isTyping[postId]) {
        setIsTyping(prev => ({ ...prev, [postId]: true }));
      }
      
      // Clear typing indicator after a delay
      clearTimeout(window.typingTimeout);
      window.typingTimeout = setTimeout(() => {
        setIsTyping(prev => ({ ...prev, [postId]: false }));
      }, 1000);
    } else {
      setIsTyping(prev => ({ ...prev, [postId]: false }));
    }
  };

  const submitComment = async (postId) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;

    // Clear typing indicator
    setIsTyping(prev => ({ ...prev, [postId]: false }));

    try {
      const response = await axios.put(`/api/recipes/${postId}/comment`, { comment });
      
      // Add new comment ID to track for animation
      const newCommentIndex = response.data.comments.length - 1;
      setNewCommentIds(prev => ({ 
        ...prev, 
        [postId]: { ...prev[postId], [newCommentIndex]: true } 
      }));
      
      // Clear animation after it completes
      setTimeout(() => {
        setNewCommentIds(prev => ({ 
          ...prev, 
          [postId]: { ...prev[postId], [newCommentIndex]: false } 
        }));
      }, 1000);
      
      setAllComments(prev => ({ ...prev, [postId]: response.data.comments }));
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
      
      // Show temporary success feedback
      const commentInput = commentInputRefs.current[postId];
      if (commentInput) {
        commentInput.style.boxShadow = '0 0 0 2px rgba(34, 197, 94, 0.3)';
        setTimeout(() => {
          commentInput.style.boxShadow = '';
        }, 1000);
      }
    } catch (error) {
      console.error("Error submitting comment:", error);
    }
  };

  const startEditing = (postId, index, text) => {
    setEditingIndex({ postId, index });
    setEditComment({ ...editComment, [postId]: text });
  };

  const saveEditedComment = async (postId, index) => {
    const newText = editComment[postId];
    if (!newText?.trim()) return;
    
    try {
      const response = await axios.put(`/api/recipes/${postId}/comment/${index}`, { comment: newText });
      setAllComments(prev => ({ ...prev, [postId]: response.data.comments }));
      setEditingIndex({});
      setEditComment({});
    } catch (error) {
      console.error("Error saving edited comment:", error);
    }
  };

  const deleteComment = async (postId, index) => {
    try {
      const response = await axios.delete(`/api/recipes/${postId}/comment/${index}`);
      setAllComments(prev => ({ ...prev, [postId]: response.data.comments }));
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleReply = (key) => {
    const reply = replyInputs[key]?.trim();
    if (!reply) return;

    // Add reply with animation
    setAllReplies(prev => ({
      ...prev,
      [key]: [...(prev[key] || []), reply]
    }));

    setReplyInputs(prev => ({
      ...prev,
      [key]: ''
    }));
  };

  const handleKeyPress = (e, postId) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      submitComment(postId);
    }
  };

  const handleReplyKeyPress = (e, key) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReply(key);
    }
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <div className="recipe-card-header">
                  <div className="recipe-title-section">
                    <FaUtensils className="recipe-icon" />
                    <h2>{post.title}</h2>
                  </div>
                  <div className="menu-toggle" onClick={() => toggleMenu(post.id)}>
                    <FaEllipsisV />
                  </div>
                  <AnimatePresence>
                    {openMenuId === post.id && (
                      <motion.div 
                        className="dropdown-menu"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="dropdown-item" onClick={() => handleEdit(post.id)}>
                          <FaPencilAlt /> Edit
                        </div>
                        <div className="dropdown-item" onClick={() => handleDelete(post.id)}>
                          <FaTrashAlt /> Delete
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <p className="recipe-description">{post.description}</p>

                <div className="media-gallery">
                  {post.mediaUrls?.map((url, index) => (
                    <img key={index} src={url} alt={`dish-${index}`} className="recipe-media" />
                  ))}
                </div>

                <div className="recipe-actions">
                  <motion.button 
                    className={`like-btn ${post.likedByUsers?.includes(userId) ? 'liked' : ''}`} 
                    onClick={() => handleLike(post.id)}
                    whileTap={{ scale: 1.2 }}
                  >
                    <motion.div
                      animate={likeAnimations[post.id] ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 0.4 }}
                    >
                      {post.likedByUsers?.includes(userId) ? <FaHeart /> : <BiLike />}
                    </motion.div>
                    {post.likedByUsers?.length || 0}
                  </motion.button>
                  
                  <motion.button 
                    className="comment-btn" 
                    onClick={() => toggleComments(post.id)}
                    whileHover={{ y: -2 }}
                  >
                    <BiCommentDetail />
                    <span className="comment-count">
                      {(allComments[post.id] || []).length}
                    </span>
                  </motion.button>
                </div>

                <AnimatePresence>
                  {openComments[post.id] && (
                    <motion.div
                      className="comments-section"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <h3>
                        <BiCommentDetail /> Conversation
                      </h3>
                      
                      {isTyping[post.id] && (
                        <div className="typing-indicator">
                          <span></span>
                          <span></span>
                          <span></span>
                        </div>
                      )}
                      
                      {(allComments[post.id] || []).length === 0 ? (
                        <p className="no-comments">No comments yet. Start the conversation!</p>
                      ) : (
                        allComments[post.id].map((cmt, index) => {
                          const replyKey = `${post.id}-${index}`;
                          const isNewComment = newCommentIds[post.id]?.[index];
                          
                          return (
                            <motion.div
                              key={index}
                              className="comment-item"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ 
                                opacity: 1, 
                                x: 0,
                                scale: isNewComment ? [1, 1.03, 1] : 1,
                                boxShadow: isNewComment 
                                  ? ['0 2px 8px rgba(0,0,0,0.05)', '0 4px 12px rgba(99, 102, 241, 0.2)', '0 2px 8px rgba(0,0,0,0.05)'] 
                                  : '0 2px 8px rgba(0,0,0,0.05)'
                              }}
                              transition={{ 
                                delay: index * 0.05,
                                duration: isNewComment ? 0.6 : 0.3
                              }}
                            >
                              {editingIndex.postId === post.id && editingIndex.index === index ? (
                                <div className="comment-edit">
                                  <input
                                    value={editComment[post.id] || ''}
                                    onChange={(e) => setEditComment({ ...editComment, [post.id]: e.target.value })}
                                    autoFocus
                                  />
                                  <button className="save-btn" onClick={() => saveEditedComment(post.id, index)}>
                                    <BiCheck /> Save
                                  </button>
                                </div>
                              ) : (
                                <div className="comment-display">
                                  <span><BiCommentDetail /> {cmt}</span>
                                  <div className="comment-actions">
                                    <motion.button 
                                      onClick={() => startEditing(post.id, index, cmt)}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <BiEditAlt />
                                    </motion.button>
                                    <motion.button 
                                      onClick={() => deleteComment(post.id, index)}
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                    >
                                      <BiTrash />
                                    </motion.button>
                                  </div>
                                </div>
                              )}

                              <div className="reply-section">
                                <AnimatePresence>
                                  {(allReplies[replyKey] || []).map((reply, rIndex) => (
                                    <motion.div 
                                      key={rIndex} 
                                      className="reply-item"
                                      initial={{ opacity: 0, x: -10 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: 10 }}
                                      transition={{ duration: 0.2 }}
                                    >
                                      <span className="reply-indicator"><BiReply /></span>
                                      {reply}
                                    </motion.div>
                                  ))}
                                </AnimatePresence>
                                <div className="reply-input-group">
                                  <input
                                    value={replyInputs[replyKey] || ''}
                                    onChange={(e) =>
                                      setReplyInputs(prev => ({
                                        ...prev,
                                        [replyKey]: e.target.value
                                      }))
                                    }
                                    placeholder="Add a reply..."
                                    onKeyPress={(e) => handleReplyKeyPress(e, replyKey)}
                                  />
                                  <motion.button 
                                    onClick={() => handleReply(replyKey)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                  >
                                    <BiReply />
                                  </motion.button>
                                </div>
                              </div>
                            </motion.div>
                          );
                        })
                      )}

                      <div className="comment-input-group">
                        <input
                          ref={el => commentInputRefs.current[post.id] = el}
                          value={commentInputs[post.id] || ''}
                          onChange={(e) => handleCommentInput(post.id, e.target.value)}
                          placeholder="Share your thoughts..."
                          onKeyPress={(e) => handleKeyPress(e, post.id)}
                        />
                        <motion.button 
                          whileHover={{ scale: 1.1 }} 
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setShowEmojiPicker(prev => ({ ...prev, [post.id]: !prev[post.id] }))}
                        >
                          <BiSmile />
                        </motion.button>
                        <motion.button 
                          className="submit-btn" 
                          onClick={() => submitComment(post.id)}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          disabled={!commentInputs[post.id]?.trim()}
                        >
                          <BiSend />
                        </motion.button>
                      </div>
                      
                      <AnimatePresence>
                        {showEmojiPicker[post.id] && (
                          <motion.div 
                            className="emoji-picker-container"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                          >
                            <EmojiPicker
                              onEmojiClick={(emojiData) => {
                                setCommentInputs(prev => ({
                                  ...prev,
                                  [post.id]: (prev[post.id] || '') + emojiData.emoji
                                }));
                                // Focus back on input after emoji selection
                                commentInputRefs.current[post.id]?.focus();
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
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