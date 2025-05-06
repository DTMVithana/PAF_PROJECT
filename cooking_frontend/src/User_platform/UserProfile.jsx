import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const currentUser = localStorage.getItem('userId');

  useEffect(() => {
    fetch('/api/recipes')
      .then(res => res.json())
      .then(data => {
        const userPosts = data.filter(p => p.author === currentUser);
        setPosts(userPosts);
      });
  }, [currentUser]);

  return (
    <div style={{ padding: '40px' }}>
      <h2>📁 My Posts</h2>
      {posts.map(post => (
        <div key={post.id} style={{ marginBottom: 20 }}>
          <h4>{post.title}</h4>
          <p>{post.description}</p>
          <button onClick={() => navigate(`/edit/${post.id}`)}>✏️ Edit</button>
          <button onClick={() => navigate(`/post/${post.id}`)}>👁️ View</button>
        </div>
      ))}
    </div>
  );
};

export default MyPosts;
