import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
   const navigate = useNavigate(); 
  const userString = localStorage.getItem("user");
  let user = null;

  try {
    user = JSON.parse(userString);
  } catch (e) {
    console.error("Invalid user JSON:", e);
  }

  if (!user) {
    return <p style={{ padding: 40, color: "red" }}>User not found or not logged in.</p>;
  }

  return (
    <div style={{ padding: '40px' }}>
      <h2>👤 User Profile</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>
    <button onClick={() => navigate('/myposts')}>
  📁 View My Posts
</button>
    </div>
  );
};

export default UserProfile;
