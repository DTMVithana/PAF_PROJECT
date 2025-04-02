import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
// import Sidebar from './Sidebar';
import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar';




const RecipeForm = () => {
  const [title, setTitle] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [description, setDescription] = useState('');
  const [mainImage, setMainImage] = useState('');
  const [mediaUrls, setMediaUrls] = useState(['']);
  const [steps, setSteps] = useState([{ description: '', imageUrl: '' }]);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const backgroundImages = [
    "https://ca-times.brightspotcdn.com/dims4/default/cc33da0/2147483647/strip/true/crop/6582x4388+0+0/resize/2400x1600!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F37%2F50%2F28ad1c96426fa31619f425e8b971%2Fla-photos-freelance-contract-843855-la-fo-week-of-meals-oct-jc-16.JPG",
    "https://www.activatefoods.com.au/cdn/shop/articles/ready-made-meals.jpg",
    "https://beehivemeals.com/cdn/shop/files/beehive-meals-apricot-chicken-Current-Menu-Page_540x.jpg?v=1737774768"
  ];

  useEffect(() => {
    if (id) {
      axios.get(`/api/recipes/${id}`).then(response => {
        const data = response.data;
        setTitle(data.title);
        setDescription(data.description);
        setMainImage(data.mainImage || '');
        setMediaUrls(data.mediaUrls || ['']);
        setSteps(data.steps?.length ? data.steps : [{ description: '', imageUrl: '' }]);
      });
    }
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 8000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  const handleMediaChange = (index, value) => {
    const updatedUrls = [...mediaUrls];
    updatedUrls[index] = value;
    setMediaUrls(updatedUrls);
  };

  const addMediaField = () => {
    if (mediaUrls.length < 3) setMediaUrls([...mediaUrls, '']);
  };

  const handleStepChange = (index, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index][field] = value;
    setSteps(updatedSteps);
  };

  const addStep = () => {
    setSteps([...steps, { description: '', imageUrl: '' }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const recipe = {
      title,
      description,
      mainImage,
      mediaUrls: mediaUrls.filter(Boolean),
      steps: steps.filter(step => step.description.trim() !== '' || step.imageUrl.trim() !== '')
    };

    try {
      if (id) {
        await axios.put(`/api/recipes/${id}`, recipe);
      } else {
        await axios.post('/api/recipes', recipe);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving recipe:', error);
      alert('Failed to save recipe.');
    }
  };

  return (
    <div>
    <div style={styles.page}>
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />
      {/* Background images */}
      <div style={styles.backgroundContainer}>
        {backgroundImages.map((image, index) => (
          <div
            key={index}
            style={{
              ...styles.backgroundImage,
              backgroundImage: `url(${image})`,
              opacity: currentBgIndex === index ? 0.8 : 0,
              zIndex: currentBgIndex === index ? 1 : 0
            }}
          />
        ))}
        <div style={styles.overlay} />
      </div>
      

     

      {/* Main Content */}
      <div style={styles.container}>
        <div style={styles.breadcrumbs}>
          <span onClick={() => navigate('/')} style={styles.breadcrumbLink}>Dashboard</span>
          <span style={styles.breadcrumbSeparator}>›</span>
          <span style={styles.breadcrumbCurrent}>{id ? 'Edit Recipe' : 'New Recipe'}</span>
        </div>

        <div style={styles.card}>
          <div style={styles.cardHeader}>
            <h2 style={styles.heading}>
              {id ? 'Update Recipe Information' : 'Create New Recipe Entry'}
            </h2>
            <p style={styles.subheading}>
              {id ? 'Modify the details of your existing recipe' : 'Fill in the information to share your recipe'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={styles.form}>
            {/* Title */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Recipe Title</label>
              <input
                type="text"
                placeholder="Enter recipe title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Description */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Recipe Description</label>
              <textarea
                placeholder="Describe the recipe..."
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                style={styles.textarea}
              />
            </div>

            {/* Main Image */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Main Image URL</label>
              <input
                type="text"
                placeholder="Main image"
                value={mainImage}
                onChange={(e) => setMainImage(e.target.value)}
                style={styles.input}
              />
            </div>

            {/* Media URLs */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Media URLs</label>
              <p style={styles.helperText}>Add up to 3 image or short video URLs (30s max)</p>
              {mediaUrls.map((url, index) => (
                <div key={index} style={styles.mediaField}>
                  <input
                    type="text"
                    placeholder={`Media URL ${index + 1}`}
                    value={url}
                    onChange={(e) => handleMediaChange(index, e.target.value)}
                    style={styles.input}
                  />
                  <span style={styles.mediaFieldNumber}>{index + 1}</span>
                </div>
              ))}
              {mediaUrls.length < 3 && (
                <button type="button" onClick={addMediaField} style={styles.addBtn}>
                  Add Additional Media
                </button>
              )}
            </div>

            {/* Cooking Steps */}
            <div style={styles.formGroup}>
              <label style={styles.label}>Meal Steps</label>
              <p style={styles.helperText}>Add step-by-step cooking instructions with images</p>
              {steps.map((step, index) => (
                <div key={index} style={{ marginBottom: '20px', backgroundColor: '#f9f9f9', padding: '15px', borderRadius: '8px' }}>
                  <label style={styles.label}>Step {index + 1} Description</label>
                  <textarea
                    placeholder="Step description"
                    value={step.description}
                    onChange={(e) => handleStepChange(index, 'description', e.target.value)}
                    style={styles.textarea}
                  />
                  <label style={styles.label}>Step {index + 1} Image URL</label>
                  <input
                    type="text"
                    placeholder="Image URL for this step"
                    value={step.imageUrl}
                    onChange={(e) => handleStepChange(index, 'imageUrl', e.target.value)}
                    style={styles.input}
                  />
                </div>
              ))}
              <button type="button" onClick={addStep} style={styles.addBtn}>➕ Add Another Step</button>
            </div>

            {/* Form Actions */}
            <div style={styles.formActions}>
              <button type="button" onClick={() => navigate('/')} style={styles.cancelBtn}>Cancel</button>
              <button type="submit" style={styles.submitBtn}>{id ? 'Update Recipe' : 'Submit Recipe'}</button>
            </div>
          </form>
        </div>
        
      </div>

      {/* Footer
      <footer style={styles.footer}>
        <p>&copy; 2025 Recipe Management System. All rights reserved.</p>
      </footer> */}



    </div>
    <Footer />
    </div>
    
  );

  
};
// ✅ Styles moved to top to avoid "styles not defined" errors
const styles = {
  page: {
    fontFamily: '"Roboto", "Segoe UI", sans-serif',
    minHeight: '100vh',
    position: 'relative',
    paddingBottom: '60px',
    overflow: 'hidden'
  },
  backgroundContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1
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
    zIndex: 2
  },
  container: {
    maxWidth: '840px',
    margin: '30px auto',
    padding: '0 20px',
    position: 'relative',
    zIndex: 10
  },
  breadcrumbs: {
    marginBottom: '20px',
    fontSize: '14px',
    color: '#fff',
    textShadow: '0 1px 2px rgba(0,0,0,0.3)'
  },
  breadcrumbLink: {
    color: '#fff',
    cursor: 'pointer',
    textDecoration: 'none',
    fontWeight: '500'
  },
  breadcrumbSeparator: {
    margin: '0 12px',
    color: 'rgba(255, 255, 255, 0.94)'
  },
  breadcrumbCurrent: {
    color: 'rgba(255,255,255,0.9)'
  },
  card: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '8px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
    overflow: 'hidden',
    border: '1px solid rgba(255,255,255,0.2)',
    backdropFilter: 'blur(10px)'
  },
  cardHeader: {
    padding: '24px 30px',
    borderBottom: '1px solid rgba(4, 18, 46, 0.2)',
    backgroundColor: 'rgba(250, 251, 252, 0.26)'
  },
  heading: {
    margin: '0 0 6px 0',
    fontSize: '22px',
    fontWeight: '600',
    color: '#1a3a5f'
  },
  subheading: {
    margin: 0,
    fontSize: '14px',
    color: '#666',
    fontWeight: 'normal'
  },
  form: {
    padding: '30px'
  },
  formGroup: {
    marginBottom: '24px'
  },
  label: {
    fontWeight: '500',
    marginBottom: '8px',
    display: 'block',
    color: '#333',
    fontSize: '15px'
  },
  helperText: {
    fontSize: '13px',
    color: '#666',
    margin: '0 0 12px 0'
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
    backgroundColor: 'rgba(255,255,255,0.9)'
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
    backgroundColor: 'rgba(255,255,255,0.9)'
  },
  mediaField: {
    position: 'relative',
    marginBottom: '15px'
  },
  mediaFieldNumber: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    backgroundColor: '#1a3a5f',
    color: '#fff',
    borderRadius: '50%',
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    fontWeight: 'bold'
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
  },
  formActions: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '15px',
    marginTop: '30px',
    borderTop: '1px solid rgba(231, 233, 237, 0.7)',
    paddingTop: '25px'
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
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
    boxShadow: '0 2px 8px rgba(26, 58, 95, 0.3)'
  },
  footer: {
    backgroundColor: 'rgba(26, 58, 95, 0.9)',
    padding: '15px 0',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backdropFilter: 'blur(8px)'
  }
};

export default RecipeForm;
