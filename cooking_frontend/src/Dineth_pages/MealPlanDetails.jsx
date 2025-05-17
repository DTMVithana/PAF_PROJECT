import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../Bawantha_components/Header';
import Sidebar from '../Bawantha_components/Sidebar';
import Footer from '../Bawantha_components/Footer';
import './MealPlanForm.css';


export default function MealPlanDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(prev => !prev);

  const [mealPlan, setMealPlan] = useState(null);
  const [showNutritionForm, setShowNutritionForm] = useState(false);
  const [nutrition, setNutrition] = useState({
    protein: '',
    carbs: '',
    fats: '',
    fiber: '',
    notes: '',
  });

  useEffect(() => {
    axios.get(`http://localhost:9090/api/mealplans/${id}`)
      .then(res => {
        setMealPlan(res.data);
        if (res.data.nutrition) {
          setNutrition(res.data.nutrition);
        }
      })
      .catch(err => {
        console.error(err);
        alert('Error fetching meal plan details');
      });
  }, [id]);

  const handleNutritionSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:9090/api/mealplans/${id}`, {
        ...mealPlan,
        nutrition: nutrition,
      });

      alert('Nutrition details saved successfully.');
      setShowNutritionForm(false);

      const res = await axios.get(`http://localhost:9090/api/mealplans/${id}`);
      setMealPlan(res.data);
      setNutrition(res.data.nutrition);
    } catch (error) {
      console.error(error);
      alert('Failed to save nutrition details.');
    }
  };

  if (!mealPlan) return <div>Loading...</div>;

  return (
    <div className="mealplan-form-page">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />

      <div className="mealplan-form-container">
        <div className="mealplan-flex">
          {/* LEFT: Meal Plan Info */}
          <div className="mealplan-left">
            <div className="mealplan-form">
              <h2 className="form-title">{mealPlan.name}</h2>

              {mealPlan.photo && (
                <img
                  src={mealPlan.photo}
                  alt={mealPlan.name}
                  style={{ maxWidth: '100%', borderRadius: '8px', marginBottom: '20px' }}
                />
              )}

              <p><strong>Plan Type:</strong> {mealPlan.plan_type}</p>
              <p><strong>Goal Category:</strong> {mealPlan.gole_category}</p>
              <p><strong>Date Range:</strong> {mealPlan.start_date} → {mealPlan.end_date}</p>
              <p><strong>Target Calories:</strong> {mealPlan.target_calories}</p>
              <p><strong>Description:</strong> {mealPlan.discription || 'No description provided.'}</p>

              <div className="form-actions">
                <button className="btn-cancel" onClick={() => navigate('/mealplan')}>
                  Back to List
                </button>
                <button className="btn-submit" onClick={() => navigate(`/mealplan/edit/${id}`)}>
                  Edit Plan
                </button>
                <button className="btn-submit" onClick={() => setShowNutritionForm(!showNutritionForm)}>
                  {showNutritionForm ? 'Cancel Nutrition Entry' : (mealPlan.nutrition ? 'Edit Nutrition' : 'Add Nutrition Details')}
                </button>
              </div>

              {/* Nutrition Form */}
              {showNutritionForm && (
                <form onSubmit={handleNutritionSubmit} style={{ marginTop: '20px' }}>
                  <h3>{mealPlan.nutrition ? 'Edit' : 'Add'} Nutrition Details</h3>

                  {['protein', 'carbs', 'fats', 'fiber'].map(field => (
                    <label className="form-label" key={field}>
                      {field.charAt(0).toUpperCase() + field.slice(1)} (g)
                      <input
                        className="form-input"
                        type="number"
                        value={nutrition[field]}
                        onChange={e => setNutrition({ ...nutrition, [field]: e.target.value })}
                      />
                    </label>
                  ))}

                  <label className="form-label">
                    Notes
                    <textarea
                      className="form-input"
                      rows={2}
                      value={nutrition.notes}
                      onChange={e => setNutrition({ ...nutrition, notes: e.target.value })}
                    />
                  </label>

                  <button type="submit" className="btn-submit">Save Nutrition</button>
                </form>
              )}
            </div>
          </div>

          {/* RIGHT: Nutrition Card */}
          <div className="nutrition-card">
            {mealPlan.nutrition ? (
              <>
                <h3 className="nutrition-title">Nutrition Overview</h3>
                <p><strong>Protein:</strong> {mealPlan.nutrition.protein} g</p>
                <p><strong>Carbohydrates:</strong> {mealPlan.nutrition.carbs} g</p>
                <p><strong>Fats:</strong> {mealPlan.nutrition.fats} g</p>
                <p><strong>Fiber:</strong> {mealPlan.nutrition.fiber} g</p>
                <p><strong>Notes:</strong> {mealPlan.nutrition.notes || '—'}</p>
              </>
            ) : (
              <p style={{ color: '#999' }}>No nutrition data added yet.</p>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
