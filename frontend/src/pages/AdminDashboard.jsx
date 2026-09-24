import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  getSchemes,
  addScheme,
  deleteScheme,
} from "../services/api";

function AdminDashboard() {
  const [schemes, setSchemes] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    benefit: "",
    state: "Any",
    category: "General",
  });

  const loadSchemes = async () => {
    try {
      const res = await getSchemes();
      setSchemes(res.data.schemes);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadSchemes();
  }, []);

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
      await addScheme(form);

      alert("✅ Scheme Added Successfully");

      setForm({
        name: "",
        description: "",
        benefit: "",
        state: "Any",
        category: "General",
      });

      loadSchemes();
    } catch (err) {
      alert("Failed to add scheme");
    } finally {
      setLoading(false);
    }
  };

  const removeScheme = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this scheme?"
    );

    if (!confirmDelete) return;

    try {
      await deleteScheme(id);
      loadSchemes();
    } catch (err) {
      alert("Failed to delete scheme");
    }
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          maxWidth: "1100px",
          margin: "40px auto",
          padding: "20px",
        }}
      >
        {/* Header */}
        <div
          style={{
            background: "linear-gradient(90deg,#2563eb,#1e3a8a)",
            color: "white",
            padding: "30px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <h1>Admin Dashboard</h1>
          <p>Manage all government schemes from one place.</p>
        </div>

        {/* Statistics */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: "20px",
            marginBottom: "30px",
          }}
        >
          <StatCard
            title="Total Schemes"
            value={schemes.length}
          />

          <StatCard
            title="Categories"
            value="5"
          />

          <StatCard
            title="States"
            value="All"
          />
        </div>

        {/* Add Scheme */}
        <div
          style={{
            background: "white",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            marginBottom: "40px",
          }}
        >
          <h2
            style={{
              color: "#2563eb",
              marginBottom: "20px",
            }}
          >
            Add New Scheme
          </h2>

          <form
            onSubmit={handleSubmit}
            style={{
              display: "grid",
              gap: "15px",
            }}
          >
            <input
              name="name"
              placeholder="Scheme Name"
              value={form.name}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              style={{
                ...inputStyle,
                minHeight: "120px",
              }}
              required
            />

            <input
              name="benefit"
              placeholder="Benefit"
              value={form.benefit}
              onChange={handleChange}
              style={inputStyle}
              required
            />

            <select
              name="state"
              value={form.state}
              onChange={handleChange}
              style={inputStyle}
            >
              <option>Any</option>
              <option>Tamil Nadu</option>
              <option>Kerala</option>
              <option>Karnataka</option>
              <option>Andhra Pradesh</option>
            </select>

            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={inputStyle}
            >
              <option>General</option>
              <option>BC</option>
              <option>MBC</option>
              <option>SC</option>
              <option>ST</option>
            </select>

            <button
              type="submit"
              style={buttonStyle}
              disabled={loading}
            >
              {loading ? "Adding..." : "Add Scheme"}
            </button>
          </form>
        </div>

        {/* Scheme List */}
        <h2
          style={{
            color: "#1e293b",
            marginBottom: "20px",
          }}
        >
          Available Schemes
        </h2>

        {schemes.length === 0 ? (
          <p>No schemes available.</p>
        ) : (
          schemes.map((scheme) => (
            <div
              key={scheme._id}
              style={{
                background: "white",
                padding: "25px",
                borderRadius: "12px",
                marginBottom: "20px",
                boxShadow: "0 5px 15px rgba(0,0,0,.08)",
              }}
            >
              <h2 style={{ color: "#2563eb" }}>
                {scheme.name}
              </h2>

              <p>{scheme.description}</p>

              <p>
                <strong>Benefit:</strong> {scheme.benefit}
              </p>

              <p>
                <strong>Category:</strong> {scheme.category}
              </p>

              <p>
                <strong>State:</strong> {scheme.state}
              </p>

              <button
                onClick={() => removeScheme(scheme._id)}
                style={{
                  background: "#dc2626",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "15px",
                }}
              >
                Delete
              </button>
            </div>
          ))
        )}
      </div>
    </>
  );
}

function StatCard({ title, value }) {
  return (
    <div
      style={{
        background: "white",
        padding: "25px",
        borderRadius: "12px",
        textAlign: "center",
        boxShadow: "0 5px 15px rgba(0,0,0,.08)",
      }}
    >
      <h3 style={{ color: "#64748b" }}>{title}</h3>
      <h1 style={{ color: "#2563eb" }}>{value}</h1>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "14px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
  fontWeight: "bold",
};

export default AdminDashboard;