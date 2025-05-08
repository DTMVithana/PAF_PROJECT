import React from 'react';

const Footer = () => {
  return (
    <footer style={styles.footer}>
      <p>&copy; 2025 Cooking. All rights reserved.</p>
    </footer>
  );
};

const styles = {
  footer: {
    backgroundColor: 'rgba(26, 58, 95, 0.9)',
    padding: '15px 0',
    textAlign: 'center',
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: '13px',
    width: '100%',
    backdropFilter: 'blur(8px)',
    marginTop: 'auto'
  },
  text: {
    margin: 0
  }
};

export default Footer;