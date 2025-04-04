
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
    
      <button onClick={toggleSidebar} style={styles.menuBtn}>☰</button>

      <div style={styles.leftSection}>
        <div style={styles.logo}>Cook Book</div>

        <div style={styles.navLinks}>
        <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
  <span style={{ cursor: 'pointer' }}>Meal Planning</span>
  <span style={{ cursor: 'pointer' }}>Categories</span>
  <span style={{ cursor: 'pointer' }}>On Going</span>
  <span style={{ cursor: 'pointer' }}onClick={() => navigate('/public')}>Public</span>
  
        </div>

        <input type="text" placeholder="Find a recipe or ingredient" style={styles.search} />
      </div>

      <div style={styles.profile}>
        <span role="img" aria-label="user">👤</span>
        <button style={styles.logoutBtn}>Log Out</button>
      </div>
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
    gap: '270px'
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
    padding: '9px 20px',
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
  }
};

export default Header;
