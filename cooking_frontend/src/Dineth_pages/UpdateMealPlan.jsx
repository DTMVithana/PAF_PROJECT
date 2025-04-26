// src/Dineth_pages/UpdateMealPlan.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../Bawantha_components/Header';
import Sidebar from '../Bawantha_components/Sidebar';
import Footer from '../Bawantha_components/Footer';
import './MealPlanForm.css'; // reuse the form styles

export default function UpdateMealPlan() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen(open => !open);

  const [name, setName]   = useState('');
  const [date, setDate]   = useState('');
  const [photo, setPhoto] = useState('');

  // Load the existing meal plan
  useEffect(() => {
    axios.get(`http://localhost:9090/api/mealplans/${id}`)
      .then(res => {
        setName(res.data.name);
        setDate(res.data.date);
        setPhoto(res.data.photo || '');
      })
      .catch(err => console.error(err));
  }, [id]);

  const handleSubmit = e => {
    e.preventDefault();
    axios.put(`http://localhost:9090/api/mealplans/${id}`, { name, date, photo })
      .then(() => navigate('/mealplan'))
      .catch(err => {
        console.error(err);
        alert('Error updating meal plan');
      });
  };

  return (
    <div className="mealplan-form-page">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />

      <div className="mealplan-form-container">
        <form onSubmit={handleSubmit} className="mealplan-form">
          <h2 className="form-title">Edit Meal Plan</h2>

          <label className="form-label">
            Name
            <input
              className="form-input"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </label>

          <label className="form-label">
            Date
            <input
              className="form-input"
              type="date"
              value={date}
              onChange={e => setDate(e.target.value)}
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
