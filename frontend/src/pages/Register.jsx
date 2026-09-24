import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    occupation: "",
    state: "",
    district: "",
    category: "",
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
      await api.post(
        "/auth/register",
        form
      );

      alert("✅ Registration Successful");

      navigate("/login");

    } catch (err) {

      console.log(err);

      alert(
        err.response?.data?.message ||
        "Registration Failed. Please try again."
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
          padding: "30px",
        }}
      >

        <div
          style={{
            width: "500px",
            background: "white",
            padding: "35px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          }}
        >

          <h1
            style={{
              textAlign: "center",
              color: "#2563eb",
              marginBottom: "25px",
            }}
          >
            Create Account
          </h1>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />

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
                  fontSize: "18px",
                }}
              >
                {showPassword ? "🙈" : "👁"}
              </button>

            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="occupation"
              placeholder="Occupation"
              value={form.occupation}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="state"
              placeholder="State"
              value={form.state}
              onChange={handleChange}
              style={inputStyle}
            />

            <input
              type="text"
              name="district"
              placeholder="District"
              value={form.district}
              onChange={handleChange}
              style={inputStyle}
            />

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={inputStyle}
              required
            >
              <option value="">
                Select Category
              </option>

              <option value="General">
                General
              </option>

              <option value="BC">
                BC
              </option>

              <option value="MBC">
                MBC
              </option>

              <option value="SC">
                SC
              </option>

              <option value="ST">
                ST
              </option>

            </select>

            <button
              style={buttonStyle}
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Register"}
            </button>

          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "20px",
            }}
          >
            Already have an account?

            <Link
              to="/login"
              style={{
                marginLeft: "5px",
                color: "#2563eb",
                textDecoration: "none",
                fontWeight: "bold",
              }}
            >
              Login
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

export default Register;