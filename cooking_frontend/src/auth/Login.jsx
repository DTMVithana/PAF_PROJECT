import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "./AuthService";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(formData);
      navigate("/home");
    } catch (err) {
      const message = err.response?.data?.message || "Login failed. Try again.";
      setError(message);
    }
  };

  return (
    <div style={styles.container}>
      <h2>Login</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account?</p>
      <Link to="/register">
        <button style={styles.signupButton}>Sign Up</button>
      </Link>
    </div>
  );
};

const styles = {
  container: { maxWidth: "300px", margin: "0 auto", padding: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  signupButton: { marginTop: "10px" },
  error: { color: "red" },
};

export default Login;
