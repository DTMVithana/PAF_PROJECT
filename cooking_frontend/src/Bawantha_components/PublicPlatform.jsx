// PublicPlatform.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PublicPlatform = () => {
  const [recipes, setRecipes] = useState([]);
  const [likes, setLikes] = useState({});
  const [openMenuId, setOpenMenuId] = useState(null);
  const [openComments, setOpenComments] = useState({});
  const [commentInputs, setCommentInputs] = useState({});
  const [allComments, setAllComments] = useState({});
  const [editComment, setEditComment] = useState({});
  const [editingIndex, setEditingIndex] = useState({});

  useEffect(() => {
    axios.get('/api/recipes/shared')
      .then(res => {
        setRecipes(res.data);
        const initialLikes = {};
        const initialComments = {};
        res.data.forEach(post => {
          initialLikes[post.id] = 0;
          initialComments[post.id] = post.comments || [];
        });
        setLikes(initialLikes);
        setAllComments(initialComments);
      })
      .catch(err => {
        console.error(err);
        alert('Failed to load posts.');
      });
  }, []);

  const handleLike = (id) => {
    setLikes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const toggleMenu = (id) => {
    setOpenMenuId(prev => (prev === id ? null : id));
  };

  const handleEdit = (id) => {
    window.location.href = `/edit/${id}`;
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(`/api/recipes/${id}`);
        setRecipes(prev => prev.filter(recipe => recipe.id !== id));
      } catch (error) {
        console.error('Failed to delete', error);
        alert('Could not delete post.');
      }
    }
  };

  const toggleComments = (postId) => {
    setOpenComments(prev => ({ ...prev, [postId]: !prev[postId] }));
  };

  const handleCommentInput = (postId, value) => {
    setCommentInputs(prev => ({ ...prev, [postId]: value }));
  };

  const submitComment = async (postId) => {
    const comment = commentInputs[postId]?.trim();
    if (!comment) return;

    try {
      const response = await axios.put(`/api/recipes/${postId}/comment`, { comment });
      setAllComments(prev => ({
        ...prev,
        [postId]: response.data.comments
      }));
      setCommentInputs(prev => ({ ...prev, [postId]: '' }));
    } catch (err) {
      console.error('Comment failed', err);
      alert("Failed to save comment.");
    }
  };

  const startEditing = (postId, index, text) => {
    setEditingIndex({ postId, index });
    setEditComment({ ...editComment, [postId]: text });
  };

  const saveEditedComment = async (postId, index) => {
    const newText = editComment[postId];
    try {
      const response = await axios.put(`/api/recipes/${postId}/comment/${index}`, { comment: newText });
      setAllComments(prev => ({
        ...prev,
        [postId]: response.data.comments
      }));
      setEditingIndex({});
      setEditComment({});
      alert('Comment updated successfully!');
    } catch (err) {
      alert("Failed to update comment.");
    }
  };

  const deleteComment = async (postId, index) => {
    if (window.confirm("Do you want this comment to delete?")) {
      try {
        const response = await axios.delete(`/api/recipes/${postId}/comment/${index}`);
        setAllComments(prev => ({
          ...prev,
          [postId]: response.data.comments
        }));
        alert('Comment deleted successfully!');
      } catch (err) {
        alert("Failed to delete comment.");
      }
    }
  };

  const handleShare = (post) => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.description,
        url: window.location.href,
      })
      .then(() => console.log('Post shared successfully'))
      .catch((error) => console.error('Error sharing', error));
    } else {
      alert('Sharing is not supported on this browser.');
    }
  };

  // 🚀 Ask Question for specific post
  const handleAskQuestion = (recipeId) => {
    window.location.href = `/recipe/${recipeId}/questions`;
  };

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.header}>🌍 Public Cooking Feed</h1>

        {recipes.length === 0 ? (
          <p>No posts yet. Be the first to share something delicious!</p>
        ) : (
          recipes.map((post) => (
            <div key={post.id} style={styles.card}>
              <div style={styles.cardHeader}>
                <h3 style={styles.title}>{post.title}</h3>
                <div style={styles.menuWrapper}>
                  <div
                    style={styles.menuIcon}
                    onClick={() => toggleMenu(post.id)}
                  >
                    ⋯
                  </div>
                  {openMenuId === post.id && (
                    <div style={styles.dropdown}>
                      <div style={styles.dropdownItem} onClick={() => handleEdit(post.id)}>✏️ Edit</div>
                      <div style={styles.dropdownItem} onClick={() => handleDelete(post.id)}>🗑️ Delete</div>
                    </div>
                  )}
                </div>
              </div>

              <p style={styles.description}>{post.description}</p>

              <div style={styles.mediaWrap}>
                {(post.mediaUrls || []).map((url, index) => (
                  <img
                    key={index}
                    src={url}
                    alt={`media-${index}`}
                    style={styles.media}
                  />
                ))}
              </div>

              {/* Action Buttons */}
              <div style={styles.actions}>
                <button onClick={() => handleLike(post.id)} style={styles.likeBtn}>
                  ❤️ Like ({likes[post.id] || 0})
                </button>
                <button onClick={() => toggleComments(post.id)} style={styles.commentBtn}>
                  💬 Comment ({(allComments[post.id] || []).length})
                </button>
                {/* 🚀 Ask Question per Post */}
                <button onClick={() => handleAskQuestion(post.id)} style={styles.askQuestionBtnSmall}>
                  🙋 Ask Question
                </button>
                <button onClick={() => handleShare(post)} style={styles.shareBtn}>
                  🔁 Share
                </button>
              </div>

              {/* Comment Section */}
              {openComments[post.id] && (
                <div style={styles.commentBox}>
                  {(allComments[post.id] || []).map((cmt, index) => (
                    <div key={index} style={styles.commentLine}>
                      {editingIndex.postId === post.id && editingIndex.index === index ? (
                        <>
                          <input
                            value={editComment[post.id] || ''}
                            onChange={(e) => setEditComment({ ...editComment, [post.id]: e.target.value })}
                            style={styles.commentInput}
                          />
                          <button onClick={() => saveEditedComment(post.id, index)} style={styles.sendBtn}>💾</button>
                        </>
                      ) : (
                        <>
                          <p style={styles.commentItem}>🗨️ {cmt}</p>
                          <div style={styles.commentMenu}>
                            <span onClick={() => startEditing(post.id, index, cmt)} style={styles.commentDot}>✏️</span>
                            <span onClick={() => deleteComment(post.id, index)} style={styles.commentDot}>🗑️</span>
                          </div>
                        </>
                      )}
                    </div>
                  ))}

                  {/* New Comment Input */}
                  <div style={{ display: 'flex' }}>
                    <input
                      type="text"
                      value={commentInputs[post.id] || ''}
                      onChange={(e) => handleCommentInput(post.id, e.target.value)}
                      placeholder="Write a comment..."
                      style={styles.commentInput}
                    />
                    <button onClick={() => submitComment(post.id)} style={styles.sendBtn}>
                      Send
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

// CSS-in-JS styles
const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#f2f2f2',
    minHeight: '100vh',
    fontFamily: 'Segoe UI, sans-serif',
  },
  wrapper: {
    maxWidth: '800px',
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    fontWeight: '600',
    fontSize: '26px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    marginBottom: '25px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: '0',
  },
  menuWrapper: {
    position: 'relative',
  },
  menuIcon: {
    cursor: 'pointer',
    fontSize: '20px',
  },
  dropdown: {
    position: 'absolute',
    top: '25px',
    right: '0',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  dropdownItem: {
    padding: '10px',
    cursor: 'pointer',
    fontSize: '14px',
    borderBottom: '1px solid #eee',
  },
  description: {
    marginTop: '10px',
    fontSize: '15px',
  },
  mediaWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: '10px',
  },
  media: {
    width: '100%',
    maxHeight: '400px',
    objectFit: 'cover',
    marginBottom: '10px',
    borderRadius: '5px',
  },
  actions: {
    display: 'flex',
    gap: '10px',
    marginTop: '15px',
    flexWrap: 'wrap',
  },
  likeBtn: {
    backgroundColor: '#ffcccc',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  commentBtn: {
    backgroundColor: '#cce5ff',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  askQuestionBtnSmall: {
    backgroundColor: '#ff9900',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '20px',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  shareBtn: {
    backgroundColor: '#d9d9d9',
    padding: '8px 15px',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
  },
  commentBox: {
    marginTop: '15px',
    backgroundColor: '#fafafa',
    padding: '10px',
    borderRadius: '5px',
  },
  commentLine: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '8px',
    justifyContent: 'space-between',
  },
  commentItem: {
    margin: '0',
  },
  commentMenu: {
    display: 'flex',
    gap: '5px',
  },
  commentDot: {
    cursor: 'pointer',
    fontSize: '16px',
  },
  commentInput: {
    flexGrow: '1',
    marginRight: '10px',
    padding: '8px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  sendBtn: {
    padding: '8px 12px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PublicPlatform;
