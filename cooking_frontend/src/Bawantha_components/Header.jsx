

import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Header = ({ toggleSidebar }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    navigate("/login");
  };


  return (
    <div style={styles.navbar}>
    
      <button onClick={toggleSidebar} style={styles.menuBtn}>☰</button>

      <div style={styles.leftSection}>
        <div style={styles.logo}>Cook Book</div>

        <div style={styles.navLinks}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/home')}>Home</span>
  <span style={{ cursor: 'pointer' }}>Meal Planning</span>
  <span style={{ cursor: 'pointer' }}>Categories</span>
  <span style={{ cursor: 'pointer' }}>On Going</span>
  <span style={{ cursor: 'pointer' }}onClick={() => navigate('/public')}>Public</span>
  
        </div>

        <input type="text" placeholder="Find a recipe or ingredient" style={styles.search} />
      </div>

      <div style={styles.profile}>
  <span role="img" aria-label="user">👤</span>
  <button onClick={() => {
  const username = JSON.parse(localStorage.getItem("user"))?.username;
  navigate(`/profile/${username}`);
}}>
    Profile
  </button>
  {/* <button style={styles.profileBtn} onClick={() => navigate('/profile')}>
    Profile
  </button> */}
  <button style={styles.logoutBtn} onClick={() => setShowLogoutConfirm(true)}>
    Log Out
  </button>
</div>

      {showLogoutConfirm && (
  <div style={styles.modalOverlay}>
    <div style={styles.moda}>
      <p style={{ marginBottom: 20 }}>Are you sure you want to log out?</p>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button style={styles.cancelBtn} onClick={() => setShowLogoutConfirm(false)}>Cancel</button>
        <button style={styles.confirmBtn} onClick={handleLogout}>Yes, Log Out</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '20px 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    flexWrap: 'wrap',
    marginLeft: '0px',
  },
  menuBtn: {
    fontSize: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    marginRight: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '200px'
  },
  logo: {
    fontSize: '28px',
    color: '#e85a00',
    fontWeight: 'bold',
    marginLeft: '0px'
  },
  navLinks: {
    display: 'flex',
    gap: '28px',
    fontSize: '14px',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  search: {
    padding: '9px 15px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  },
  logoutBtn: {
    padding: '6px 12px',
    backgroundColor: '#e85a00',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
  },

  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#1a1a1a', // ⬅️ Light background color
    padding: '30px 25px',
    borderRadius: '12px',
    width: '400px',
    textAlign: 'center',
    boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
    transform: 'translateY(-30px)',
    animation: 'fadeIn 0.3s ease-in-out',
    border: '1px solid #444',    
    color: '#f1f1f1',    // Optional: subtle border
  },
  
  
  cancelBtn: {
    backgroundColor: '#ccc',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    marginRight: '10px',
    transition: 'background-color 0.2s',
  },
  confirmBtn: {
    backgroundColor: '#e85a00',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.2s',
  },
  
  
};

export default Header;
