// src/Dineth_pages/MealPlanForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './MealPlanForm.css';

function MealPlanForm() {
  const [name, setName]   = useState('');
  const [start_date, setSDate]   = useState('');
  const [end_date, setEDate]   = useState('');
  const [photo, setPhoto] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:9090/api/mealplans',
        { name, start_date,end_date, photo }
      );
      navigate('/mealplan');
    } catch (err) {
      console.error(err);
      alert('Error creating meal plan');
    }
  };

  return (
    <div className="mealplan-form-container">
      <form onSubmit={handleSubmit} className="mealplan-form">
        <h2 className="form-title">New Meal Plan</h2>

        <label className="form-label">
          Name
          <input
            className="form-input"
            value={name}
            onChange={e => setName(e.target.value)}
            placeholder="e.g. Weekly Plan"
            required
          />
        </label>

        <label className="form-label">
          Start Date
          <input
            className="form-input"
            type="date"
            value={start_date}
            onChange={e => setSDate(e.target.value)}
            required
          />
        </label>
        <label className="form-label">
          End Date
          <input
            className="form-input"
            type="date"
            value={end_date}
            onChange={e => setEDate(e.target.value)}
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
            Create
          </button>
        </div>
      </form>
    </div>
  );
}

export default MealPlanForm;