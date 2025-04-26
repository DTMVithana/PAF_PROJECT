// src/Dineth_pages/MealPlanList.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Bawantha_components/Header';
import Sidebar from '../Bawantha_components/Sidebar';
import Footer from '../Bawantha_components/Footer';
import './MealPlanList.css';

function MealPlanList() {
  const [plans, setPlans] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(open => !open);

  useEffect(() => {
    document.title = 'Your Meal Plans';
    fetchPlans();
  }, []);

  const fetchPlans = () => {
    axios
      .get('http://localhost:9090/api/mealplans')
      .then(res => setPlans(res.data))
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this meal plan?')) {
      axios.delete(`http://localhost:9090/api/mealplans/${id}`)
        .then(() => fetchPlans())
        .catch(err => console.error(err));
    }
  };

  return (
    <div className="mealplan-page">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <Header toggleSidebar={toggleSidebar} />

      <main className="mealplan-content">
        <header className="page-header">
          <h1 className="page-title">Your Meal Plans</h1>
          <button
            className="btn-add"
            onClick={() => navigate('/mealplan/create')}
          >
            + Create Meal Plan
          </button>
        </header>

        <div className="mealplan-list">
          {plans.map(mp => (
            <div key={mp.id} className="mealplan-card">
              {mp.photo && (
                <img
                  src={mp.photo}
                  alt={mp.name}
                  className="mealplan-card-img"
                />
              )}
              <div className="mealplan-card-body">
                <h3 className="mealplan-card-title">{mp.name}</h3>
                <p className="mealplan-card-date">{mp.date}</p>
                <div className="mealplan-card-actions">
                  <button
                    className="mealplan-card-button"
                    onClick={() => navigate(`/mealplan/edit/${mp.id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="mealplan-card-button delete"
                    onClick={() => handleDelete(mp.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default MealPlanList;