import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../Tharinda_components/Sidebar';
import Header from '../Tharinda_components/Header';
import Footer from '../Tharinda_components/Footer';

const UpdateProgressRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    mainImage: '',
    mediaUrls: [],
    steps: [],
    estimatedtime: 0,
    number_of_steps: 1,
    currentstep: 1,
    status: 'Draft',
    tags: []
    
  });

  const [loading, setLoading] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);

  const backgroundImages = [
    "https://ca-times.brightspotcdn.com/dims4/default/cc33da0/2147483647/strip/true/crop/6582x4388+0+0/resize/2400x1600!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F37%2F50%2F28ad1c96426fa31619f425e8b971%2Fla-photos-freelance-contract-843855-la-fo-week-of-meals-oct-jc-16.JPG",
    "https://www.activatefoods.com.au/cdn/shop/articles/ready-made-meals.jpg",
    "https://beehivemeals.com/cdn/shop/files/beehive-meals-apricot-chicken-Current-Menu-Page_540x.jpg?v=1737774768"
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await axios.get(`/api/ongoing/${id}`);
        setRecipe(res.data);
      } catch (error) {
        console.error('Error fetching recipe:', error);
      }
    };
    fetchRecipe();
  }, [id]);


  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched recipe data:', data);
        setRecipe({
          title: data.title || '',
          description: data.description || '',
          mainImage: data.mainImage || '',
          tags: data.tags || [],
          mediaUrls: data.mediaUrls || [''],
          steps: Array.isArray(data.steps) && data.steps.length > 0 
                  ? data.steps 
                  : [{ description: '', imageUrl: '' }],
        });
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching recipe:', error);
        alert('Failed to fetch recipe.');
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex(prevIndex => (prevIndex + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRecipe(prev => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (index, value) => {
    const updatedMedia = [...recipe.mediaUrls];
    updatedMedia[index] = value;
    setRecipe(prev => ({ ...prev, mediaUrls: updatedMedia }));
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...recipe.steps];
    updatedSteps[index][field] = value;
    setRecipe(prev => ({ ...prev, steps: updatedSteps }));
  };

  const addMediaField = () => {
    if (recipe.mediaUrls.length < 3) {
      setRecipe(prev => ({ ...prev, mediaUrls: [...prev.mediaUrls, ''] }));
    }
  };

  const addStep = () => {
    setRecipe(prev => ({ ...prev, steps: [...prev.steps, { description: '', imageUrl: '' }] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log('Updated ongoing recipe state:', recipe);

    try {
      await axios.put(`/api/ongoing/${id}`, recipe);
      navigate('/ongoing');
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  if (loading) {
    return <p style={styles.loading}>Loading...</p>;
  }

  return (
    <div>
      <div style={styles.page}>
        {/* Background Images */}
        <div style={styles.backgroundContainer}>
          {backgroundImages.map((image, index) => (
            <div
              key={index}
              style={{
                ...styles.backgroundImage,
                backgroundImage: `url(${image})`,
                opacity: currentBgIndex === index ? 0.8 : 0,
                zIndex: currentBgIndex === index ? 1 : 0,
              }}
            />
          ))}
          <div style={styles.overlay} />
        </div>

        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        <Header toggleSidebar={toggleSidebar} />

        <div style={styles.container}>
          <div style={styles.card}>
            <h2 style={styles.heading}>Update Recipe</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Title</label>
                <input 
                  type="text" 
                  name="title" 
                  value={recipe.title} 
                  onChange={handleInputChange} 
                  style={styles.input} 
                  required 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Description</label>
                <textarea 
                  name="description" 
                  value={recipe.description} 
                  onChange={handleInputChange} 
                  style={styles.textarea} 
                  required 
                />
              </div>

              {/* <div style={styles.formGroup}>
                <label style={styles.label}>Main Image URL</label>
                <input 
                  type="text" 
                  name="mainImage" 
                  value={recipe.mainImage} 
                  onChange={handleInputChange} 
                  style={styles.input} 
                />
              </div> */}

              <div style={styles.formGroup}>
                <label style={styles.label}>Media URLs</label>
                {recipe.mediaUrls.map((url, i) => (
                  <input
                    key={i}
                    type="text"
                    value={url}
                    onChange={(e) => handleMediaChange(i, e.target.value)}
                    style={{ ...styles.input, marginBottom: '12px' }}
                  />
                ))}
                {recipe.mediaUrls.length < 3 && (
                  <button type="button" onClick={addMediaField} style={styles.addBtn}>
                    + Add Media
                  </button>
                )}
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Steps</label>
                {recipe.steps && recipe.steps.length > 0 ? (
                  recipe.steps.map((step, index) => (
                    <div key={index} style={styles.stepCard}>
                      <textarea
                        placeholder={`Step ${index + 1} description`}
                        value={step.description}
                        onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                        style={styles.textarea}
                      />
                      <input
                        type="text"
                        placeholder="Step image URL"
                        value={step.imageUrl}
                        onChange={(e) => handleStepChange(index, 'imageUrl', e.target.value)}
                        style={styles.input}
                      />
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#1a3a5f' }}>No steps found.</p>
                )}
                <button type="button" onClick={addStep} style={styles.addBtn}>
                  + Add Step
                </button>
              </div>

              <div style={styles.formActions}>
                <button type="button" onClick={() => navigate('/')} style={styles.cancelBtn}>
                  Cancel
                </button>
                <button type="submit" style={styles.submitBtn}>
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

const styles = {
  page: {
    fontFamily: '"Roboto", "Segoe UI", sans-serif',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: '60px',
    overflow: 'hidden',
  },
  backgroundContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1,
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    transition: 'opacity 2s ease-in-out',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(26, 58, 95, 0.85)',
    zIndex: 2,
  },
  container: {
    maxWidth: '840px',
    margin: '30px auto',
    padding: '0 20px',
    position: 'relative',
    zIndex: 10,
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '8px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)',
    padding: '30px',
  },
  heading: {
    margin: '0 0 20px 0',
    fontSize: '22px',
    fontWeight: '600',
    color: '#1a3a5f',
  },
  form: {
    width: '100%',
  },
  formGroup: {
    marginBottom: '40px', 
  },
  label: {
    fontWeight: '500',
    marginBottom: '15px', 
    color: '#333',
    fontSize: '15px',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #d0d5dd',
    borderRadius: '6px',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    height: '150px',
    borderRadius: '6px',
    border: '1px solid #d0d5dd',
    resize: 'vertical',
    fontSize: '15px',
    outline: 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    boxSizing: 'border-box',
    backgroundColor: 'rgba(255,255,255,0.9)',
    marginBottom: '12px',
  },
  addBtn: {
    backgroundColor: 'rgba(240, 244, 248, 0.8)',
    color: '#1a3a5f',
    border: '1px solid #d0d5dd',
    padding: '10px 16px',
    borderRadius: '6px',
    fontSize: '14px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    marginBottom: '12px',
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '30px',
    borderTop: '1px solid rgba(231, 233, 237, 0.7)',
    paddingTop: '25px',
  },
  cancelBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    color: '#555',
    border: '1px solid #d0d5dd',
    padding: '12px 24px',
    fontSize: '15px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  },
  submitBtn: {
    backgroundColor: '#1a3a5f',
    color: '#fff',
    padding: '12px 30px',
    fontSize: '15px',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500',
    transition: 'all 0.2s',
    boxShadow: '0 2px 8px rgba(26, 58, 95, 0.3)',
  },
  loading: {
    textAlign: 'center',
    marginTop: '50px',
    color: '#1a3a5f',
    fontSize: '18px',
  },
  stepCard: {
    marginBottom: '20px',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
  },
};

export default UpdateProgressRecipe;
