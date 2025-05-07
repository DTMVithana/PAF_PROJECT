import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../Tharinda_components/Header';
import Footer from '../Tharinda_components/Footer';
import Sidebar from '../Tharinda_components/Sidebar';
import CornerVideo from '../Tharinda_components/CornerVideo';
import './OnGoing.css';

function OnGoing() {
  const [ongoingRecipes, setOngoingRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('http://localhost:9090/api/progress-recipes/ongoing');
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        const data = await res.json();
        setOngoingRecipes(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching ongoing recipes:', err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const timeAgo = (timestamp) => {
    if (!timestamp) return 'Unknown time';
    const diffMs = new Date() - new Date(timestamp);
    const diffMins = Math.floor(diffMs / 60000);
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  };

  const handleShare = async (id) => {
    try {
      await fetch(`http://localhost:9090/api/progress/${id}/share`, { method: 'PUT' });
      alert('Recipe shared to public platform!');
    } catch (err) {
      alert('Failed to share recipe.');
    }
  };

  return (
    <div style={styles.page}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />

      <div style={styles.main}>
        <div style={styles.feature}>
          <h1 style={styles.pageTitle}>My Ongoing Recipes ({ongoingRecipes.length})</h1>

          {loading && <p>Loading recipes...</p>}
          {error && <p className="error-message">Error: {error}</p>}

          {!loading && !error && (
            <>
              {ongoingRecipes.length === 0 ? (
                <div style={styles.emptyState}>
                  <p>No ongoing recipes found. Start cooking something new!</p>
                  <Link to="/recipes" style={styles.addNewBtn}>Find New Recipes</Link>
                </div>
              ) : (
                <div style={styles.postsGrid}>
                  {ongoingRecipes.map((recipe) => (
                    <div
                      key={recipe.id}
                      style={styles.postCard}
                      onClick={() => navigate(`/progress/view/${recipe.id}`)}
                    >
                      <img
                        src={recipe.imageUrl || recipe.mediaUrls?.[0] || 'https://via.placeholder.com/300x200?text=No+Image'}
                        alt={recipe.title}
                        style={styles.postImage}
                      />
                      <h3>{recipe.title}</h3>
                      <p style={styles.description}>{recipe.description}</p>
                      <div style={styles.progressInfo}>
                        <p>Progress: Step {recipe.currentstep} of {recipe.number_of_steps}</p>
                        <div style={styles.progressBar}>
                          <div
                            style={{
                              ...styles.progressFill,
                              width: `${(recipe.currentstep / recipe.number_of_steps) * 100}%`
                            }}
                          />
                        </div>
                        <p style={styles.lastUpdated}>
                          Last updated: {timeAgo(recipe.updatedAt)}
                        </p>
                      </div>
                      <div style={styles.menuWrapper} onClick={(e) => e.stopPropagation()}>
                        <button
                          style={styles.menuButton}
                          onClick={() => setMenuOpen(menuOpen === recipe.id ? null : recipe.id)}
                        >
                          ⋮
                        </button>
                        {menuOpen === recipe.id && (
                          <div style={styles.dropdownMenu}>
                            <button
                              style={styles.dropdownItem}
                              onClick={() => navigate(`/progress/update/${recipe.id}`)}
                            >
                              Continue Cooking
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
                  ))}
                </div>
              )}
              {ongoingRecipes.length > 0 && (
                <Link to="/recipes" style={styles.addNewBtn}>Find New Recipes</Link>
              )}
            </>
          )}
        </div>

        <div style={styles.latest}>
          <h3 style={{ borderBottom: '3px solid red', paddingBottom: 6 }}>Cooking Tips</h3>
          {[...Array(3)].map((_, i) => (
            <div key={i} style={styles.latestItem}>
              <img src="https://via.placeholder.com/70" alt="tip" style={styles.latestImg} />
              <div>
                <span style={styles.latestTag}>TIP</span>
                <p style={styles.latestTitle}>Helpful cooking tip #{i + 1}</p>
              </div>
            </div>
          ))}
          <CornerVideo />
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  page: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    background: '#fdfdfd',
  },
  main: {
    display: 'flex',
    padding: '20px',
    flex: 1,
  },
  feature: {
    flex: 3,
    paddingRight: '20px',
  },
  latest: {
    flex: 1,
    background: '#fff',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '8px',
    height: 'fit-content',
  },
  latestItem: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  latestImg: {
    width: '70px',
    height: '70px',
    objectFit: 'cover',
    borderRadius: '5px',
  },
  latestTag: {
    fontSize: '12px',
    fontWeight: 'bold',
    color: '#ff0000',
  },
  latestTitle: {
    margin: 0,
    fontSize: '14px',
  },
  pageTitle: {
    fontSize: '28px',
    marginBottom: '20px',
  },
  postsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    gap: '20px',
  },
  postCard: {
    background: '#fff',
    border: '1px solid #ddd',
    padding: '15px',
    borderRadius: '10px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    position: 'relative',
  },
  postImage: {
    width: '100%',
    height: '180px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  description: {
    fontSize: '14px',
    color: '#333',
  },
  progressInfo: {
    marginTop: '10px',
  },
  progressBar: {
    height: '8px',
    background: '#eee',
    borderRadius: '4px',
    margin: '8px 0',
  },
  progressFill: {
    height: '100%',
    background: '#f00',
    borderRadius: '4px',
  },
  lastUpdated: {
    fontSize: '12px',
    color: '#777',
  },
  emptyState: {
    textAlign: 'center',
    marginTop: '50px',
  },
  addNewBtn: {
    marginTop: '20px',
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#e91e63',
    color: '#fff',
    borderRadius: '6px',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
  menuWrapper: {
    position: 'absolute',
    top: '10px',
    right: '10px',
  },
  menuButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
  },
  dropdownMenu: {
    position: 'absolute',
    right: 0,
    top: '24px',
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '6px',
    zIndex: 1,
    boxShadow: '0px 2px 6px rgba(0,0,0,0.1)',
  },
  dropdownItem: {
    display: 'block',
    padding: '8px 12px',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '14px',
  },
};

export default OnGoing;
