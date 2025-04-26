import React from 'react';
import { useNavigate } from 'react-router-dom';

const Header = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div style={styles.navbar}>
      
      <div style={styles.leftWrapper}>
        <button onClick={toggleSidebar} style={styles.menuBtn}>☰</button>

        <div style={styles.leftSection}>
          <div style={styles.logo}>Cook Book</div>

          <div style={styles.navLinks}>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/')}>Home</span>
            <span style={{ cursor: 'pointer' }}>Categories</span>
            <span style={{ cursor: 'pointer' }}>On Going</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/public')}>Public</span>
            <span style={{ cursor: 'pointer' }} onClick={() => navigate('/mealplan/create')}>Meal Plans</span>
          </div>
        </div>
      </div>

      <div style={styles.rightSection}>
        <input
          type="text"
          placeholder="Find a recipe or ingredient"
          style={styles.search}
        />

        <div style={styles.profile}>
          <span role="img" aria-label="user">👤</span>
          <button style={styles.logoutBtn}>Log Out</button>
        </div>
      </div>

    </div>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #eee',
    flexWrap: 'wrap',
    width: '100vw',          // ✅ Full window width
    boxSizing: 'border-box', // ✅ Include padding inside width
  },
  leftWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    flex: '1 1 auto',
    minWidth: '280px',
  },
  menuBtn: {
    fontSize: '20px',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '6px 12px',
    cursor: 'pointer',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
  },
  leftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    flexWrap: 'wrap',
  },
  logo: {
    fontSize: '24px',
    color: '#e85a00',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    gap: '18px',
    fontSize: '14px',
    fontWeight: '500',
    flexWrap: 'wrap',
  },
  rightSection: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '10px',
    flex: '1 1 auto',
    minWidth: '250px',
    marginTop: '10px',
  },
  search: {
    padding: '8px 16px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '1px solid #ccc',
    width: '180px',
  },
  profile: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
};

export default Header;
