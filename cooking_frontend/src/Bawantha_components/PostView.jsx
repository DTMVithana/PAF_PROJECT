import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => setRecipe(data))
      .catch(() => alert('❌ Failed to load recipe.'));
  }, [id]);

  if (!recipe) return <div style={styles.loading}>Loading...</div>;

  return (
    <div style={styles.page}>
      <button onClick={() => navigate(-1)} style={styles.backBtn}>← Back</button>

      <div style={styles.card}>
        <h1 style={styles.title}>{recipe.title}</h1>
        <p style={styles.description}>{recipe.description}</p>

        <div style={styles.gallery}>
          {(recipe.mediaUrls || []).map((url, index) => (
            <img
              key={index}
              src={url}
              alt={`media-${index}`}
              style={styles.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    fontFamily: 'Segoe UI, sans-serif',
    padding: '40px 20px',
    backgroundColor: '#f5f5f5',
    minHeight: '100vh',
  },
  backBtn: {
    backgroundColor: '#eee',
    border: 'none',
    padding: '8px 14px',
    fontSize: '14px',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    maxWidth: '800px',
    margin: '0 auto',
  },
  title: {
    marginBottom: '15px',
    fontSize: '24px',
    color: '#1a3a5f',
  },
  description: {
    marginBottom: '20px',
    lineHeight: '1.6',
    color: '#333',
  },
  gallery: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '15px',
  },
  image: {
    width: '100%',
    maxWidth: '250px',
    borderRadius: '6px',
    objectFit: 'cover',
  },
  loading: {
    textAlign: 'center',
    padding: '100px 0',
    fontSize: '18px',
  },
};

export default PostView;
