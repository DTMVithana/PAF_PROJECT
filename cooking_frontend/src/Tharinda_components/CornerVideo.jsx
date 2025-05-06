import React, { useState } from 'react';

const CornerVideo = () => {
  const videos = [
    "https://cdn.pixabay.com/video/2023/06/29/169349-841069126_tiny.mp4",
    "https://cdn.pixabay.com/video/2024/08/18/227128_tiny.mp4",
    "https://cdn.pixabay.com/video/2023/08/08/175152-852857786_tiny.mp4"
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [fade, setFade] = useState(false);

  const handleVideoEnd = () => {
    
    setFade(true);
    
    setTimeout(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
      
      setTimeout(() => {
        setFade(false);
      }, 50);
    }, 500);
  };

  return (
    <div style={styles.container}>
      <video
        key={currentVideoIndex} 
        src={videos[currentVideoIndex]}
        controls
        autoPlay
        muted
        onEnded={handleVideoEnd}
        style={{
          ...styles.video,
          transition: 'opacity 0.5s ease-in-out', 
          opacity: fade ? 0 : 1,
        }}
      />
    </div>
  );
};

const styles = {
  container: {
    position: 'sticky', 
    right: '20px',
    bottom: '-250px',
    width: '420px',
    height: '290px',
    // backgroundColor: '#000',
    borderRadius: '6px',
    overflow: 'hidden',
    // boxShadow: '0 2px 8px rgba(239, 238, 238, 0.3)',
    // zIndex: 9999,
    marginTop: '100px',
  },
  video: {
    position: 'sticky',
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

export default CornerVideo;
