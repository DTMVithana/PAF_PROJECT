import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Bawantha_components/Header';
import Sidebar from '../Bawantha_components/Sidebar';
import Footer from '../Bawantha_components/Footer';
import './MealPlanForm.css';

export default function UpdateMealPlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(open => !open);

  const [name, setName] = useState('');
  const [plan_type, setPlanType] = useState('');
  const [gole_category, setGoleCategory] = useState('');
  const [start_date, setStartDate] = useState('');
  const [end_date, setEndDate] = useState('');
  const [discription, setDiscription] = useState('');
  const [target_calories, setTargetCalories] = useState('');
  const [photo, setPhoto] = useState('');

  // Load the existing meal plan
  useEffect(() => {
    axios.get(`http://localhost:9090/api/mealplans/${id}`)
      .then(res => {
        const data = res.data;
        setName(data.name || '');
        setPlanType(data.plan_type || '');
        setGoleCategory(data.gole_category || '');
        setStartDate(data.start_date || '');
        setEndDate(data.end_date || '');
        setDiscription(data.discription || '');
        setTargetCalories(data.target_calories || '');
        setPhoto(data.photo || '');
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (!name || !plan_type || !gole_category || !start_date || !end_date || !target_calories) {
      alert('Please fill in all required fields.');
      return;
    }

    try {
      await axios.put(`http://localhost:9090/api/mealplans/${id}`, {
        name,
        plan_type,
        gole_category,
        start_date,
        end_date,
        discription,
        target_calories,
        photo,
      });
      navigate('/mealplan');
    } catch (err) {
      console.error(err);
      alert('Error updating meal plan');
    }
  };

  return (
    <div className="mealplan-form-page">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />

      <div className="mealplan-form-container">
        <form onSubmit={handleSubmit} className="mealplan-form">
          <h2 className="form-title">Edit Meal Plan</h2>

          <label className="form-label">
            Name*
            <input
              className="form-input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>

          <label className="form-label">
            Plan Type*
            <select
              className="form-input"
              value={plan_type}
              onChange={e => setPlanType(e.target.value)}
              required
            >
              <option value="">-- Select Type --</option>
              <option value="Daily">Daily</option>
              <option value="Weekly">Weekly</option>
              <option value="Custom">Custom</option>
            </select>
          </label>

          <label className="form-label">
            Goal Category*
            <select
              className="form-input"
              value={gole_category}
              onChange={e => setGoleCategory(e.target.value)}
              required
            >
              <option value="">-- Select Goal --</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Keto">Keto</option>
              <option value="Diabetic Friendly">Diabetic Friendly</option>
            </select>
          </label>

          <label className="form-label">
            Start Date*
            <input
              className="form-input"
              type="date"
              value={start_date}
              onChange={e => setStartDate(e.target.value)}
              required
            />
          </label>

          <label className="form-label">
            End Date*
            <input
              className="form-input"
              type="date"
              value={end_date}
              onChange={e => setEndDate(e.target.value)}
              required
            />
          </label>

          <label className="form-label">
            Description
            <textarea
              className="form-input"
              value={discription}
              onChange={e => setDiscription(e.target.value)}
              placeholder="Short description of the plan"
              rows={3}
            />
          </label>

          <label className="form-label">
            Target Calories (per day)*
            <input
              className="form-input"
              type="number"
              value={target_calories}
              onChange={e => setTargetCalories(e.target.value)}
              placeholder="e.g. 2000"
              required
            />
          </label>

          <label className="form-label">
            Photo URL
            <input
              className="form-input"
              value={photo}
              onChange={e => setPhoto(e.target.value)}
              placeholder="Optional image URL"
            />
          </label>

          <div className="form-actions">
            <button type="button" className="btn-cancel" onClick={() => navigate('/mealplan')}>
              Cancel
            </button>
            <button type="submit" className="btn-submit">
              Save Changes
            </button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}
