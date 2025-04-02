import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SharePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [mediaUrls, setMediaUrls] = useState(['']);
  const navigate = useNavigate();

  const handleMediaChange = (index, value) => {
    const updated = [...mediaUrls];
    updated[index] = value;
    setMediaUrls(updated);
  };

  const addMediaField = () => {
    if (mediaUrls.length < 3) setMediaUrls([...mediaUrls, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = {
      title,
      description,
      mediaUrls: mediaUrls.filter(Boolean),
    };

    try {
      await axios.post('/api/recipes', recipe);
      alert('✅ Post shared successfully!');
      navigate('/');
    } catch (error) {
      console.error('Error sharing post:', error);
      alert('❌ Failed to share post.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.heading}>📤 Share a New Post</h2>

        <form onSubmit={handleSubmit}>
          <label style={styles.label}>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter your recipe title"
            required
            style={styles.input}
          />

          <label style={styles.label}>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write a short description"
            required
            style={{ ...styles.input, height: '100px', resize: 'vertical' }}
          />

          <label style={styles.label}>Media URLs (Max 3)</label>
          {mediaUrls.map((url, index) => (
            <input
              key={index}
              type="text"
              value={url}
              onChange={(e) => handleMediaChange(index, e.target.value)}
              placeholder={`Media URL ${index + 1}`}
              required
              style={styles.input}
            />
          ))}

          {mediaUrls.length < 3 && (
            <button
              type="button"
              onClick={addMediaField}
              style={styles.addButton}
            >
              ➕ Add Another Media
            </button>
          )}

          <button type="submit" style={styles.submitButton}>
            📤 Share Post
          </button>
        </form>
      </div>
    </div>
  );
};

// 🔧 Inline styles
const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'center',
    padding: '50px 20px',
    fontFamily: 'Segoe UI, sans-serif',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 6px 15px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '600px',
  },
  heading: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  label: {
    fontWeight: 'bold',
    display: 'block',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    fontSize: '16px',
  },
  addButton: {
    backgroundColor: '#17a2b8',
    color: '#fff',
    border: 'none',
    padding: '10px 15px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  submitButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default SharePost;
