import { useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await axiosInstance.post("/auth/register", {
        username: formData.username,
        password: formData.password,
      });
      alert("Registered successfully. Please login.");
      navigate("/login");
    } catch (err) {
      setError(
        err.response?.data?.message || "Registration failed. Try a different username."
      );
    }
  };

  return (
    <div style={styles.container}>
      <h2>Sign Up</h2>
      {error && <p style={styles.error}>{error}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>Username</label>
        <input
          name="username"
          placeholder="Enter username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

const styles = {
  container: { maxWidth: "320px", margin: "0 auto", padding: "20px" },
  form: { display: "flex", flexDirection: "column", gap: "10px" },
  error: { color: "red", fontWeight: 500 },
};

export default Register;
