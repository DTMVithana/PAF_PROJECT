import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    try {
      const parsed = JSON.parse(storedUser);
      if (parsed.username === username) {
        setUser(parsed); // ✅ gives you id, email, etc.
      }
    } catch (err) {
      console.error("Invalid user in localStorage:", err);
    }
  }, [username]);

  if (!user) {
    return <div style={{ padding: 40, color: "red" }}>User not found or unauthorized.</div>;
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>👤 User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>User ID:</strong> {user.id}</p>
    </div>
  );
};

export default UserProfile;
