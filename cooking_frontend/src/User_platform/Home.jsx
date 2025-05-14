import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Bawantha_components/Sidebar';
import Header from '../Bawantha_components/Header';
import Footer from '../Bawantha_components/Footer';
import CornerVideo from '../Bawantha_components/CornerVideo';







const Home = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [menuOpen, setMenuOpen] = useState(null);
  const [showAllLatest, setShowAllLatest] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    fetchRecipes();
  }, []);

  const fetchRecipes = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await fetch('/api/recipes', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (!res.ok) throw new Error("Unauthorized or bad response");

    const data = await res.json();
    console.log("Fetched data:", data);

    if (Array.isArray(data)) {
      setRecipes(data);
    } else {
      console.error("Expected an array but got:", data);
      setRecipes([]);
    }
  } catch (err) {
    console.error('Failed to load recipes.', err);
    alert('Failed to load recipes. Are you logged in?');
  }
};
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this recipe?')) {
      try {
        await fetch(`/api/recipes/${id}`, { method: 'DELETE' });
        fetchRecipes();
      } catch (err) {
        alert('Failed to delete recipe.');
      }
    }
  };

  const handleShare = async (id) => {
    try {
      await fetch(`/api/recipes/${id}/share`, { method: 'PUT' });
      alert('Post shared to public platform!');
    } catch (err) {
      alert('Failed to share post.');
    }
  };


  const sortedRecipes = [...recipes].sort(
    (a, b) => new Date(b.updatedAt || b.createdAt) - new Date(a.updatedAt || a.createdAt)
  );
  const latest = showAllLatest ? sortedRecipes : sortedRecipes.slice(0, 5);

  const timeAgo = (timestamp) => {
    const diffMs = new Date() - new Date(timestamp);
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;

    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  return (
    <div style={styles.page}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />

      <div style={styles.main}>
        <div style={styles.feature}>
          <div style={styles.postsGrid}>
            {recipes.length === 0 ? (
              <p>No recipes found.</p>
            ) : (
              recipes.map((recipe => (
                <div
                  key={recipe.id}
                  style={styles.postCard}
                  onClick={() => navigate(`/post/${recipe.id}`)}
                >
                  {recipe.mediaUrls?.[0] && (
                    <img src={recipe.mediaUrls[0]} alt={recipe.title} style={styles.postImage} />
                  )}
                  <h4>{recipe.title}</h4>
                  <p>{recipe.description}</p>

                  <div
                    style={styles.menuWrapper}
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      style={styles.menuButton}
                      onClick={() =>
                        setMenuOpen(menuOpen === recipe.id ? null : recipe.id)
                      }
                    >
                      ⋮
                    </button>

                    {menuOpen === recipe.id && (
                      <div style={styles.dropdownMenu}>
                        <button
                          style={styles.dropdownItem}
                          onClick={() => navigate(`/edit/${recipe.id}`)}
                        >
                          Edit
                        </button>
                        <button
                          style={styles.dropdownItem}
                          onClick={() => handleDelete(recipe.id)}
                        >
                          Delete
                        </button>
                        <button
                          style={styles.dropdownItem}
                          onClick={() => handleShare(recipe.id)}
                        >
                          Share
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )))
            )}
          </div>
        </div>

        <div style={styles.latest}>
        
          <h3 style={{ borderBottom: '3px solid red', paddingBottom: 6 }}>
            The Latest
          </h3>
          {latest.map((item, idx) => (
            <div key={idx} style={styles.latestItem}>
              <img
                src={item.mediaUrls?.[0] || 'https://via.placeholder.com/70'}
                alt="latest"
                style={styles.latestImg}
              />
              <div>
                <span style={styles.latestTag}>RECIPE</span> ·{' '}
                <span>{timeAgo(item.updatedAt || item.createdAt)}</span>
                <p style={styles.latestTitle}>{item.title}</p>
              </div>
            </div>
          ))}

          <button
            style={styles.seeMore}
            onClick={() => setShowAllLatest(!showAllLatest)}
          >
            {showAllLatest ? 'Show Less' : 'See More'}
          </button>
          <CornerVideo />
        </div>
      </div>
      
      <Footer />
       
    </div>
  );
};

const styles = {
 
page: {
  display: 'flex',
  flexDirection: 'column',
  minHeight: '100vh',
  fontFamily: 'Segoe UI, sans-serif',
  backgroundColor: '#fff',
},
  main: {
    flex: 1,
    display: 'flex',
    justifyContent: 'space-between',
    padding: '40px 30px',
    flexWrap: 'wrap',
    marginLeft: '60px',
  },
  feature: { flex: 2, maxWidth: '65%' },
  postsGrid: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '20px',
  },
  postCard: {
    width: 'calc(33.33% - 14px)',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '16px',
    backgroundColor: '#fafafa',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    position: 'relative',
    cursor: 'pointer',
  },
  postImage: {
    width: '100%',
    height: '160px',
    objectFit: 'cover',
    borderRadius: '6px',
    marginBottom: '10px',
  },
  menuWrapper: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    bottom: '35px',
    right: 0,
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    minWidth: '120px',
    zIndex: 100,
  },
  dropdownItem: {
    padding: '8px 14px',
    fontSize: '14px',
    color: '#333',
    textAlign: 'left',
    border: 'none',
    background: 'white',
    cursor: 'pointer',
    borderBottom: '1px solid #eee',
  },
  latest: { flex: 1, maxWidth: '30%', marginLeft: '20px' },
  latestItem: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
    alignItems: 'flex-start',
  },
  latestImg: { width: '70px', height: '70px', borderRadius: '6px' },
  latestTag: { color: 'orange', fontWeight: 'bold', fontSize: '12px' },
  latestTitle: { fontSize: '14px', margin: 0, color: '#111', fontWeight: 500 },
  seeMore: {
    padding: '10px 15px',
    border: '1px solid red',
    backgroundColor: '#fff',
    color: 'red',
    fontWeight: 'bold',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
  },
};

export default Home;
