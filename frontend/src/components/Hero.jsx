import { Link } from "react-router-dom";

function Hero() {
  return (
    <section
      style={{
        minHeight: "85vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #0f172a, #2563eb)",
        color: "white",
        textAlign: "center",
        padding: "40px 20px",
      }}
    >
      <h1
        style={{
          fontSize: "52px",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        🏛 Smart Government Scheme
        <br />
        Recommendation Platform
      </h1>

      <p
        style={{
          maxWidth: "750px",
          fontSize: "20px",
          lineHeight: "1.8",
          color: "#e2e8f0",
          marginBottom: "40px",
        }}
      >
        Discover government schemes that perfectly match your eligibility.
        Our platform helps students, farmers, senior citizens, women,
        entrepreneurs, and many others find suitable government benefits
        quickly and easily.
      </p>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          to="/recommend"
          style={{
            background: "#ffffff",
            color: "#2563eb",
            padding: "14px 28px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Find Schemes
        </Link>

        <Link
          to="/register"
          style={{
            border: "2px solid white",
            color: "white",
            padding: "14px 28px",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            fontSize: "18px",
          }}
        >
          Register
        </Link>
      </div>

      <div
        style={{
          marginTop: "70px",
          display: "flex",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <FeatureCard number="100+" title="Government Schemes" />
        <FeatureCard number="24/7" title="Available Online" />
        <FeatureCard number="1000+" title="Happy Users" />
      </div>
    </section>
  );
}

function FeatureCard({ number, title }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.12)",
        backdropFilter: "blur(10px)",
        padding: "25px",
        borderRadius: "12px",
        minWidth: "180px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
      }}
    >
      <h2
        style={{
          margin: 0,
          fontSize: "32px",
          color: "#ffffff",
        }}
      >
        {number}
      </h2>

      <p
        style={{
          marginTop: "10px",
          color: "#e2e8f0",
        }}
      >
        {title}
      </p>
    </div>
  );
}

export default Hero;