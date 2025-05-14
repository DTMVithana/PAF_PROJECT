import React from 'react';
import '../auth.css';

const AuthForm = ({ children }) => {
const AuthForm = ({ mode }) => {
  const isLogin = mode === "login";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    name: "",
    profilePhotoUrl: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ——— endpoint & body ———
    const url = isLogin ? "/api/auth/login" : "/api/auth/register";
    const payload = isLogin
      ? { username: form.username, password: form.password }
      : form;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      // ---------- error handling ----------
      if (!res.ok) {
        const msg = await res.text();          // backend sends plain text on 4xx
        throw new Error(msg || "Request failed");
      }

      // backend returns JSON on success
      const data = await res.json();           // { message, userId }

      if (isLogin) {
        // 👉 you can store userId or keep it stateless for now
        localStorage.setItem("userId", data.userId);
        localStorage.setItem("username", data.username);
        alert("Login successful!");
        navigate("/home");                     // change to "/" if that’s your route
      } else {
        alert("Signup successful — please log in.");
        navigate("/login");
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="auth-container flex justify-center items-center min-h-screen w-full">
      <div className="auth-card grid grid-cols-1 md:grid-cols-2 shadow-lg rounded-2xl overflow-hidden">
        {children}
      </div>
    </div>
  );
};

export default AuthForm;