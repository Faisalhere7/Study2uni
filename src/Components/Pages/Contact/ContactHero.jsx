import React from "react";

export default function ContactHero() {
  const styles = {
    section: {
      backgroundColor: "#E9F5FE",
      paddingTop: "5rem",
      paddingBottom: "5rem",
    },
    smallHeading: {
      fontSize: "0.875rem",
      letterSpacing: "0.25em",
      color: "#111827",
      fontWeight: 500,
      marginBottom: "1.5rem",
    },
    mainHeading: {
      fontWeight: 600,
      color: "#0F172A",
      lineHeight: 1.1,
      maxWidth: "1100px",
      margin: "0 auto",
    },
  };

  return (
    <section className="w-100" style={styles.section}>
      <div className="container text-center px-3 px-md-5">
        {/* Small Heading */}
        <p style={styles.smallHeading}>Contact us</p>

        {/* Main Heading */}
        <h1
          className="fw-semibold"
          style={{
            ...styles.mainHeading,
            fontSize: "2.5rem", // mobile
          }}
        >
          Can’t find what you’re looking for?
        </h1>
      </div>

      {/* Responsive font sizes using Bootstrap utilities */}
      <style>
        {`
          @media (min-width: 768px) {
            h1.fw-semibold { font-size: 4rem; }
          }
          @media (min-width: 992px) {
            h1.fw-semibold { font-size: 5rem; }
          }
          @media (min-width: 1200px) {
            h1.fw-semibold { font-size: 80px; }
          }
        `}
      </style>
    </section>
  );
}
