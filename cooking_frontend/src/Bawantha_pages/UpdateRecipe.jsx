import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Sidebar from '../Bawantha_components/Sidebar';
import Header from '../Bawantha_components/Header';
import Footer from '../Bawantha_components/Footer';


const commonIngredients = [
  "Salt", "Pepper", "Olive oil", "Garlic", "Onion", "Chicken", "Beef", "Pork", "Rice", "Pasta",
  "Flour", "Sugar", "Butter", "Milk", "Eggs", "Tomato", "Carrot", "Potato", "Broccoli", "Spinach",
  "Cheese", "Yogurt", "Lemon", "Lime", "Coconut milk", "Soy sauce", "Vinegar", "Honey", "Cinnamon", "Cumin",
  "Paprika", "Basil", "Oregano", "Thyme", "Rosemary", "Parsley", "Cilantro", "Ginger", "Turmeric", "Curry powder",
  "Chili powder", "Bay leaf", "Nutmeg", "Allspice", "Cloves", "Cardamom", "Coriander", "Mustard seeds", "Sesame oil", "Cornstarch",
 
];

const UpdateRecipe = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [recipe, setRecipe] = useState({
    title: '',
    description: '',
    mainImage: '',
    tags: [],
    mediaUrls: [''],
    steps: [{ description: '', imageUrl: '' }],
    ingredients: [{ name: '', amount: '' }]
  });
  const [loading, setLoading] = useState(true);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  
 
  const [suggestions, setSuggestions] = useState([]);
  const [activeSuggestionIndex, setActiveSuggestionIndex] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [currentIngredientIndex, setCurrentIngredientIndex] = useState(null);
  
  const ingredientInputRefs = useRef([]);

  const backgroundImages = [
    "https://ca-times.brightspotcdn.com/dims4/default/cc33da0/2147483647/strip/true/crop/6582x4388+0+0/resize/2400x1600!/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F37%2F50%2F28ad1c96426fa31619f425e8b971%2Fla-photos-freelance-contract-843855-la-fo-week-of-meals-oct-jc-16.JPG",
    "https://www.activatefoods.com.au/cdn/shop/articles/ready-made-meals.jpg",
    "https://beehivemeals.com/cdn/shop/files/beehive-meals-apricot-chicken-Current-Menu-Page_540x.jpg?v=1737774768"
  ];

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        console.log('Fetched recipe data:', data);
        
        
        let formattedIngredients = [{ name: '', amount: '' }];
        if (data.ingredients && data.ingredients.length > 0) {
          formattedIngredients = data.ingredients.map(ing => {
            if (typeof ing === 'string') {
              
              const parts = ing.split(' ');
              const amount = parts.length > 1 ? parts.slice(0, 2).join(' ') : '';
              const name = parts.length > 1 ? parts.slice(2).join(' ') : ing;
              return { name, amount };
            }
            return ing;
          });
        }
        
        setRecipe({
          title: data.title || '',
          description: data.description || '',
          mainImage: data.mainImage || '',
          tags: data.tags || [],
          mediaUrls: data.mediaUrls || [''],
          steps: Array.isArray(data.steps) && data.steps.length > 0 
                  ? data.steps 
                  : [{ description: '', imageUrl: '' }],
          ingredients: formattedIngredients
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

  
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][field] = value;
    setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }));

    
    if (field === 'name' && value.trim()) {
      const filtered = commonIngredients.filter(ing => 
        ing.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(filtered.length > 0);
      setActiveSuggestionIndex(0);
      setCurrentIngredientIndex(index);
    } else {
      setShowSuggestions(false);
    }
  };

  const addIngredient = () => {
    setRecipe(prev => ({
      ...prev,
      ingredients: [...prev.ingredients, { name: '', amount: '' }]
    }));
    
    setTimeout(() => {
      if (ingredientInputRefs.current[recipe.ingredients.length]) {
        ingredientInputRefs.current[recipe.ingredients.length].focus();
      }
    }, 10);
  };

  const removeIngredient = (index) => {
    if (recipe.ingredients.length > 1) {
      const updatedIngredients = [...recipe.ingredients];
      updatedIngredients.splice(index, 1);
      setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }));
    }
  };

  const handleSuggestionClick = (suggestion) => {
    if (currentIngredientIndex !== null) {
      const updatedIngredients = [...recipe.ingredients];
      updatedIngredients[currentIngredientIndex].name = suggestion;
      setRecipe(prev => ({ ...prev, ingredients: updatedIngredients }));
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e, index) => {
    if (!showSuggestions) return;
    
   
    if (e.keyCode === 40) {
      e.preventDefault();
      setActiveSuggestionIndex(
        activeSuggestionIndex < suggestions.length - 1 
          ? activeSuggestionIndex + 1 
          : 0
      );
    }
   
    else if (e.keyCode === 38) {
      e.preventDefault();
      setActiveSuggestionIndex(
        activeSuggestionIndex > 0 
          ? activeSuggestionIndex - 1 
          : suggestions.length - 1
      );
    }
    
    else if (e.keyCode === 13 && showSuggestions) {
      e.preventDefault();
      handleIngredientChange(index, 'name', suggestions[activeSuggestionIndex]);
      setShowSuggestions(false);
    }
   
    else if (e.keyCode === 27) {
      setShowSuggestions(false);
    }
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
    
   
    const formattedIngredients = recipe.ingredients
      .filter(ing => ing.name.trim() !== '')
      .map(ing => {
        const amountStr = ing.amount.trim() ? `${ing.amount.trim()} ` : '';
        return `${amountStr}${ing.name.trim()}`;
      });
    
  
    const updatedRecipe = {
      ...recipe,
      ingredients: formattedIngredients
    };
    
    console.log('Updated recipe state:', updatedRecipe);

    try {
      const response = await fetch(`/api/recipes/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedRecipe),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      alert('Recipe updated successfully.');
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Error updating recipe:', error);
      alert('Failed to update recipe.');
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
          <div style={styles.breadcrumbs}>
            <span onClick={() => navigate('/')} style={styles.breadcrumbLink}>Dashboard</span>
            <span style={styles.breadcrumbSeparator}>›</span>
            <span style={styles.breadcrumbCurrent}>Edit Recipe</span>
          </div>
          
          <div style={styles.card}>
            <div style={styles.cardHeader}>
              <h2 style={styles.heading}>Update Recipe Information</h2>
              <p style={styles.subheading}>Modify the details of your existing recipe</p>
            </div>
            
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Recipe Title</label>
                <input 
                  type="text" 
                  name="title" 
                  placeholder="Enter recipe title"
                  value={recipe.title} 
                  onChange={handleInputChange} 
                  style={styles.input} 
                  required 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Recipe Description</label>
                <textarea 
                  name="description"
                  placeholder="Describe the recipe..." 
                  value={recipe.description} 
                  onChange={handleInputChange} 
                  style={styles.textarea} 
                  required 
                />
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Media URLs</label>
                <p style={styles.helperText}>Add up to 3 image or short video URLs (30s max)</p>
                {recipe.mediaUrls.map((url, i) => (
                  <div key={i} style={styles.mediaField}>
                    <input
                      type="text"
                      placeholder={`Media URL ${i + 1}`}
                      value={url}
                      onChange={(e) => handleMediaChange(i, e.target.value)}
                      style={styles.input}
                    />
                    <span style={styles.mediaFieldNumber}>{i + 1}</span>
                  </div>
                ))}
                {recipe.mediaUrls.length < 3 && (
                  <button type="button" onClick={addMediaField} style={styles.addBtn}>
                    Add Additional Media
                  </button>
                )}
              </div>

              {/* Ingredients Section */}
              <div style={styles.formGroup}>
                <label style={styles.label}>Ingredients</label>
                <p style={styles.helperText}>List all ingredients needed for this recipe</p>
                <div style={styles.ingredientsContainer}>
                  {recipe.ingredients.map((ingredient, index) => (
                    <div key={index} style={styles.ingredientRow}>
                      <div style={styles.ingredientAmountCol}>
                        <input
                          type="text"
                          placeholder="Amount (e.g., 2 cups)"
                          value={ingredient.amount}
                          onChange={(e) => handleIngredientChange(index, 'amount', e.target.value)}
                          style={styles.ingredientInput}
                        />
                      </div>
                      <div style={styles.ingredientNameCol}>
                        <div style={styles.suggestionsContainer}>
                          <input
                            ref={el => ingredientInputRefs.current[index] = el}
                            type="text"
                            placeholder="Ingredient name"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                            onFocus={() => {
                              if (ingredient.name.trim()) {
                                const filtered = commonIngredients.filter(ing => 
                                  ing.toLowerCase().startsWith(ingredient.name.toLowerCase())
                                );
                                setSuggestions(filtered);
                                setShowSuggestions(filtered.length > 0);
                                setCurrentIngredientIndex(index);
                              }
                            }}
                            style={styles.ingredientInput}
                          />
                          {showSuggestions && currentIngredientIndex === index && (
                            <ul style={styles.suggestionsList}>
                              {suggestions.map((suggestion, i) => (
                                <li 
                                  key={i}
                                  style={{
                                    ...styles.suggestionItem,
                                    backgroundColor: i === activeSuggestionIndex ? '#f0f7ff' : 'white'
                                  }}
                                  onMouseDown={() => handleSuggestionClick(suggestion)}
                                  onMouseEnter={() => setActiveSuggestionIndex(i)}
                                >
                                  {suggestion}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                      <div style={styles.ingredientActions}>
                        {recipe.ingredients.length > 1 && (
                          <button 
                            type="button" 
                            onClick={() => removeIngredient(index)}
                            style={styles.removeBtn}
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                  <button type="button" onClick={addIngredient} style={styles.addBtn}>
                    ➕ Add Another Ingredient
                  </button>
                </div>
              </div>

              <div style={styles.sectionDivider}></div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Meal Steps</label>
                <p style={styles.helperText}>Add step-by-step cooking instructions with images</p>
                {recipe.steps && recipe.steps.length > 0 ? (
                  recipe.steps.map((step, index) => (
                    <div key={index} style={styles.stepContainer}>
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
                      <div style={styles.stepDivider}></div>
                    </div>
                  ))
                ) : (
                  <p style={{ color: '#1a3a5f' }}>No steps found.</p>
                )}
                <button type="button" onClick={addStep} style={styles.addBtn}>
                  ➕ Add Another Step
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
    backdropFilter: 'blur(10px)',
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
    color: '#1a3a5f',
  },
  subheading: {
    margin: 0,
    fontSize: '14px',
    color: '#666',
    fontWeight: 'normal'
  },
  form: {
    padding: '30px',
  },
  formGroup: {
    marginBottom: '24px',
  },
  label: {
    fontWeight: '500',
    marginBottom: '8px',
    display: 'block',
    color: '#333',
    fontSize: '15px',
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
    boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    marginTop: '10px',
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

  ingredientsContainer: {
    backgroundColor: '#f8f9fb',
    padding: '15px',
    borderRadius: '8px',
    border: '1px solid #e7e9ed'
  },
  ingredientRow: {
    display: 'flex',
    marginBottom: '10px',
    alignItems: 'center',
    gap: '10px'
  },
  ingredientAmountCol: {
    width: '35%',
  },
  ingredientNameCol: {
    width: '55%',
    position: 'relative'
  },
  ingredientActions: {
    width: '10%',
    display: 'flex',
    justifyContent: 'center'
  },
  ingredientInput: {
    padding: '10px 12px',
    border: '1px solid #d0d5dd',
    borderRadius: '6px',
    fontSize: '14px',
    width: '100%',
    backgroundColor: 'white'
  },
  suggestionsContainer: {
    position: 'relative',
    width: '100%'
  },
  suggestionsList: {
    position: 'absolute',
    top: '100%',
    left: 0,
    zIndex: 20,
    margin: 0,
    padding: 0,
    width: '100%',
    maxHeight: '200px',
    overflowY: 'auto',
    listStyle: 'none',
    backgroundColor: 'white',
    border: '1px solid #d0d5dd',
    borderRadius: '0 0 6px 6px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
  },
  suggestionItem: {
    padding: '8px 12px',
    cursor: 'pointer',
    fontSize: '14px',
    borderBottom: '1px solid #f0f0f0',
    transition: 'background-color 0.2s'
  },
  removeBtn: {
    backgroundColor: '#f8f9fb',
    color: '#777',
    border: '1px solid #d0d5dd',
    borderRadius: '50%',
    width: '26px',
    height: '26px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '12px',
    cursor: 'pointer',
    padding: 0
  },
  sectionDivider: {
    height: '1px',
    backgroundColor: 'rgba(4, 18, 46, 0.1)',
    margin: '30px 0'
  },
  stepContainer: {
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    marginBottom: '20px'
  },
  stepDivider: {
    height: '1px',
    backgroundColor: 'rgba(4, 18, 46, 0.1)',
    margin: '15px 0 0 0'
  }
};

export default UpdateRecipe;