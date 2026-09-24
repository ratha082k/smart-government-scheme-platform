import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const res = await api.post(
        "/auth/login",
        form
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      alert("✅ Login Successful");

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
        "Invalid Email or Password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          minHeight: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#f4f7fb",
        }}
      >

        <div
          style={{
            width: "420px",
            background: "white",
            padding: "35px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >

          <h1
            style={{
              textAlign: "center",
              marginBottom: "30px",
              color: "#2563eb",
            }}
          >
            Welcome Back 👋
          </h1>

          <form onSubmit={handleSubmit}>

            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={form.email}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <div style={{ position: "relative" }}>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                style={inputStyle}
                required
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                }}
              >
                {showPassword ? "🙈" : "👁"}
              </button>

            </div>

            <button
              style={buttonStyle}
              disabled={loading}
            >
              {loading
                ? "Logging in..."
                : "Login"}
            </button>

          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Don't have an account?

            <Link
              to="/register"
              style={{
                marginLeft: "5px",
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Register
            </Link>

          </p>

        </div>

      </div>
    </>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontSize: "16px",
  fontWeight: "bold",
};

export default Login;