import React from 'react';
import { FaPlus, FaClipboardList, FaUtensils, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        ...styles.sidebar,
        transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
      }}
    >
      
      <div style={styles.closeBtnWrapper}>
        <FaTimes style={styles.closeBtn} onClick={toggleSidebar} />
      </div>

      <h2 style={styles.logo}>
        <span>Dashboard</span>
      </h2>

      <nav>
        <ul style={styles.menuList}>
          <li style={styles.menuItem} onClick={() => navigate('/create')}>
            <FaPlus style={styles.icon} />
            <button style={styles.linkBtn}>Create Post</button>
          </li>
          <li style={styles.menuItem}>
            <FaClipboardList style={styles.icon} />
            <button style={styles.linkBtn}>View Posts</button>
          </li>
          <li style={styles.menuItem}>
            <FaClipboardList style={styles.icon} />
            <button style={styles.linkBtn}>My Post</button>
          </li>
          <li style={styles.menuItem}>
            <FaUtensils style={styles.icon} />
            <button style={styles.linkBtn}>Meals</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const styles = {
  sidebar: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '240px',
    backgroundColor: '#1e1e2f',
    color: '#fff',
    padding: '60px 20px 20px 20px',
    transition: 'transform 0.3s ease-in-out',
    zIndex: 1000,
    boxShadow: '2px 0 12px rgba(0,0,0,0.2)',
    overflowY: 'auto',
  },
  closeBtnWrapper: {
    position: 'absolute',
    top: 18,
    right: 18,
    cursor: 'pointer',
  },
  closeBtn: {
    fontSize: '20px',
    color: '#ffb347',
  },
  logo: {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#ffb347',
    marginBottom: '30px',
  },
  menuList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  menuItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '10px 10px',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background 0.2s',
  },
  icon: {
    color: '#ffa94d',
    fontSize: '18px',
  },
  linkBtn: {
    background: 'none',
    border: 'none',
    color: '#eee',
    fontSize: '16px',
    textAlign: 'left',
    padding: 0,
    cursor: 'pointer',
    fontWeight: 500,
  },
};

export default Sidebar;
