import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Sidebar from '../Bawantha_components/Sidebar';
import Header from '../Bawantha_components/Header';
import Footer from '../Bawantha_components/Footer';
import QuestionSection from '../Uvindu_components/QuestionSection';

const PostView = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { id } = useParams();
  // const navigate = useNavigate();
  const [recipe, setRecipe] = useState(null);
  const [expandedSteps, setExpandedSteps] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [showQuestions, setShowQuestions] = useState(false);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setRecipe(data);
        setExpandedSteps(Array(data.steps?.length || 0).fill(false));
        setLoading(false);
      })
      .catch(() => {
        alert('Failed to load recipe.');
        setLoading(false);
      });
  }, [id]);

  const toggleStep = (index) => {
    setExpandedSteps(prev => {
      const updated = [...prev];
      updated[index] = !updated[index];
      return updated;
    });
  };

  if (loading) return <div className="loading-container">
    <div className="loading-spinner"></div>
    <p>Loading recipe...</p>
  </div>;

  let stepElements = [];

  if (recipe?.steps && recipe.steps.length > 0) {
    for (let i = 0; i < recipe.steps.length; i++) {
      const step = recipe.steps[i];
      const isExpanded = expandedSteps[i];

      stepElements.push(
        <div key={i} className="step-accordion">
          <div className={`step-header ${isExpanded ? 'expanded' : ''}`} onClick={() => toggleStep(i)}>
            <div className="step-number">{i + 1}</div>
            <div className="step-title">{step.description}</div>
            <div className="step-toggle">{isExpanded ? '−' : '+'}</div>
          </div>
          {isExpanded && (
            <div className="step-content">
              {step.imageUrl && (
                <img src={step.imageUrl} alt={`Step ${i + 1}`} className="step-image" />
              )}
              <div className="step-details">
                <p>{step.details || "Follow the instructions carefully for best results."}</p>
              </div>
            </div>
          )}
        </div>
      );
    }
  }

  return (
    <div className="page">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />
      
        {/* <div className="nav-container">
          <button onClick={() => navigate(-1)} className="back-button">
            <span>←</span> Back to recipes
          </button>
         
        </div> */}
      
      
      <div className="content-container">
        <div className="recipe-header">
          <h1 className="recipe-title">{recipe?.title}</h1>
          {/* <div className="recipe-meta">
            <span className="prep-time">Prep: 20 min</span>
            <span className="cook-time">Cook: 30 min</span>
            <span className="servings">Serves: 4</span>
          </div> */}
        </div>

        <div className="recipe-grid">
          <div className="recipe-image-container">
            {recipe?.mediaUrls?.[0] ? (
              <img src={recipe.mediaUrls[0]} alt={recipe.title} className="recipe-main-image" />
            ) : (
              <div className="image-placeholder">No image available</div>
            )}
          </div>
          
          <div className="recipe-info">
            <div className="info-card">
              <h2 className="section-title">About this dish</h2>
              <p className="recipe-description">{recipe?.description}</p>
              
              {/* <div className="recipe-tags">
                {(recipe?.tags || ['Quick', 'Easy', 'Vegetarian']).map((tag, index) => (
                  <span key={index} className="recipe-tag">{tag}</span>
                ))}
              </div> */}
            </div>
          </div>
        </div>

        <div className="ingredients-section">
          <h2 className="section-title">Ingredients</h2>
          <div className="ingredients-grid">
            {(recipe?.ingredients && recipe.ingredients.length > 0) ? (
              recipe.ingredients.map((ingredient, index) => (
                <div key={index} className="ingredient-item">
                  <span className="ingredient-check">✓</span>
                  <span>{ingredient}</span>
                </div>
              ))
            ) : (
              <div className="no-ingredients">No ingredients listed for this recipe.</div>
            )}
          </div>
        </div>

        <div className="steps-section">
          <h2 className="section-title">Preparation Steps</h2>
          <div className="steps-container">
            {stepElements}
          </div>
        </div>
        
        <div className="questions-container">
          <button 
            onClick={() => setShowQuestions(!showQuestions)} 
            className="question-toggle-btn"
          >
            {showQuestions ? "Hide Questions" : "Ask a Question"}
          </button>
          
          {showQuestions && (
            <QuestionSection 
              recipeId={id}
              currentUser="AnonymousUser"  // Replace with actual user if available
            />
          )}
        </div>
      </div>
      <Footer />
     

      <style jsx>{`
        /* Core Layout */
        .page {
          font-family: 'Segoe UI', 'Open Sans', sans-serif;
          background-color: #f9f9f9;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        
        .top-navigation {
          background-color: #1d3557;
          color: white;
          padding: 15px 0;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          position: sticky;
          top: 0;
          z-index: 100;
        }
        
        .nav-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .app-title {
          font-size: 18px;
          font-weight: 600;
        }
        
        .content-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 30px 20px;
          flex: 1;
        }
        
        .page-footer {
          background-color: #1d3557;
          color: white;
          padding: 20px 0;
          margin-top: 40px;
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          text-align: center;
        }

        /* Recipe Header */
        .recipe-header {
          margin-bottom: 30px;
          text-align: center;
        }
        
        .recipe-title {
          font-size: 32px;
          font-weight: 700;
          color: #1d3557;
          margin-bottom: 15px;
        }
        
        .recipe-meta {
          display: flex;
          justify-content: center;
          gap: 20px;
          color: #666;
          font-size: 14px;
        }
        
        .recipe-meta span {
          background-color: #f1faee;
          padding: 5px 12px;
          border-radius: 20px;
          border: 1px solid #e5e5e5;
        }

        /* Recipe Grid Layout */
        .recipe-grid {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 30px;
          margin-bottom: 40px;
        }
        
        @media (max-width: 768px) {
          .recipe-grid {
            grid-template-columns: 1fr;
          }
        }
        
        .recipe-image-container {
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        }
        
        .recipe-main-image {
          width: 100%;
          height: 400px;
          object-fit: cover;
          display: block;
        }
        
        .image-placeholder {
          background-color: #e9ecef;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #adb5bd;
          font-size: 16px;
        }
        
        .recipe-info {
          display: flex;
          flex-direction: column;
        }
        
        .info-card {
          background-color: white;
          border-radius: 10px;
          padding: 25px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
          height: 100%;
        }
        
        .recipe-description {
          color: #495057;
          line-height: 1.7;
          margin-bottom: 20px;
          font-size: 16px;
        }
        
        .recipe-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 15px;
        }
        
        .recipe-tag {
          background-color: #e6f3ff;
          color: #0077cc;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 500;
        }

        /* Ingredients Section */
        .ingredients-section {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .section-title {
          font-size: 22px;
          font-weight: 600;
          color: #1d3557;
          margin-bottom: 20px;
          position: relative;
          padding-bottom: 10px;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 3px;
          background-color: #457b9d;
        }
        
        .ingredients-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
          gap: 12px;
        }
        
        .ingredient-item {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 8px 0;
        }
        
        .ingredient-check {
          color: #a8dadc;
          font-weight: bold;
        }
        
        .no-ingredients {
          grid-column: 1 / -1;
          padding: 15px;
          text-align: center;
          color: #6c757d;
          background-color: #f8f9fa;
          border-radius: 6px;
        }

        /* Steps Section */
        .steps-section {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .steps-container {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        
        .step-accordion {
          border: 1px solid #e9ecef;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .step-header {
          padding: 15px 20px;
          background-color: #f8f9fa;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background-color 0.2s;
        }
        
        .step-header:hover {
          background-color: #e9ecef;
        }
        
        .step-header.expanded {
          background-color: #e3f2fd;
          border-bottom: 1px solid #e9ecef;
        }
        
        .step-number {
          width: 28px;
          height: 28px;
          background-color: #457b9d;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: 15px;
          flex-shrink: 0;
        }
        
        .step-title {
          flex-grow: 1;
          font-weight: 500;
        }
        
        .step-toggle {
          font-size: 18px;
          font-weight: bold;
          color: #457b9d;
          margin-left: 10px;
        }
        
        .step-content {
          padding: 20px;
          background-color: white;
        }
        
        .step-image {
          width: 100%;
          max-height: 300px;
          object-fit: cover;
          border-radius: 8px;
          margin-bottom: 15px;
        }
        
        .step-details {
          color: #495057;
          line-height: 1.6;
        }

        /* Chef's Notes */
        .chef-notes {
          background-color: #fffaeb;
          border-left: 4px solid #ffcb77;
          padding: 20px;
          border-radius: 0 8px 8px 0;
          margin-bottom: 30px;
        }
        
        .chef-notes h3 {
          color: #e67700;
          margin-bottom: 10px;
          font-size: 18px;
        }
        
        .chef-notes p {
          color: #664d03;
          line-height: 1.6;
        }

        /* Buttons */
        .back-button {
          background-color: transparent;
          color: white;
          border: 1px solid rgba(255,255,255,0.3);
          padding: 8px 16px;
          border-radius: 4px;
          font-size: 14px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 6px;
          transition: background-color 0.2s;
        }
        
        .back-button:hover {
          background-color: rgba(255,255,255,0.1);
        }

        /* Questions Section */
        .questions-container {
          background-color: white;
          border-radius: 10px;
          padding: 30px;
          margin-bottom: 40px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        
        .question-toggle-btn {
          background-color: #457b9d;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 20px;
        }
        
        .question-toggle-btn:hover {
          background-color: #1d3557;
        }
        
        .question-toggle-btn::before {
          content: '💬';
        }

        /* Loading State */
        .loading-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          background-color: #f9f9f9;
        }
        
        .loading-spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid #457b9d;
          width: 40px;
          height: 40px;
          animation: spin 1s linear infinite;
          margin-bottom: 15px;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default PostView;