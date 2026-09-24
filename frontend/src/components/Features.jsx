function Features() {
  const features = [
    {
      icon: "🎯",
      title: "Smart Recommendations",
      description:
        "Get personalized government schemes based on your eligibility and profile.",
    },
    {
      icon: "⚡",
      title: "Fast & Easy",
      description:
        "Find suitable schemes in just a few clicks without searching multiple websites.",
    },
    {
      icon: "🔒",
      title: "Secure Platform",
      description:
        "Your personal information is protected with secure authentication.",
    },
  ];

  return (
    <section
      style={{
        padding: "80px 20px",
        background: "#f8fafc",
        textAlign: "center",
      }}
    >
      <h2
        style={{
          fontSize: "38px",
          marginBottom: "15px",
        }}
      >
        Why Choose SmartGov?
      </h2>

      <p
        style={{
          color: "#555",
          marginBottom: "50px",
        }}
      >
        A modern platform to discover government schemes quickly and easily.
      </p>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "30px",
          flexWrap: "wrap",
        }}
      >
        {features.map((feature, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              width: "300px",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
              transition: "0.3s",
            }}
          >
            <div
              style={{
                fontSize: "50px",
              }}
            >
              {feature.icon}
            </div>

            <h3>{feature.title}</h3>

            <p
              style={{
                color: "#666",
                lineHeight: "1.6",
              }}
            >
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Features;