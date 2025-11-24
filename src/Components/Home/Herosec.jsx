import React, { useEffect } from "react";
import StudentImg from "../../assets/Student.png";

export default function Herosec() {
  useEffect(() => {
    // Counter Animation
    const counters = document.querySelectorAll(".stat-number");
    const targets = [93, 150, 1000];

    counters.forEach((counter, index) => {
      const target = targets[index];
      let value = 0;
      const duration = 1000;
      const step = target / (duration / 20);

      const counterInterval = setInterval(() => {
        value += step;
        if (value >= target) {
          value = target;
          clearInterval(counterInterval);
        }
        counter.textContent = Math.floor(value) + (index === 0 ? "%" : "+");
      }, 20);
    });
  }, []);

  return (
    <section
      className="py-5 hero-section position-relative"
      style={{
        background: "linear-gradient(135deg, #E7F6FF 0%, #D0EBFF 100%)",
        overflow: "hidden",
      }}
    >
      {/* Top-right lines background */}
      <div
        className="lines-background position-absolute w-100 h-100"
        style={{ top: 0, left: 0, pointerEvents: "none" }}
      >
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
      </div>

      <div className="container">
        <div className="row align-items-center">
          {/* LEFT SIDE */}
          <div className="col-lg-6 mb-5">
            <h1 className="display-4 fw-bold mb-3 fade-up">
              Find Best Courses
              <span className="d-block mt-2" style={{ color: "#2F74AB" }}>
                to Study in the UK
              </span>
            </h1>

            <p className="lead text-secondary fade-up delay-1">
              Explore the best courses to study in the UK and find your perfect match.
              Get guidance on top universities and programs for global success.
            </p>

            <div className="d-flex gap-3 flex-wrap fade-up delay-2 mt-4">
              <button
                className="btn book-btn shadow-sm"
                onClick={() => (window.location.href = "/contact/")}
              >
                Book Consultation
              </button>

              <button
                className="btn get-started-btn shadow-sm"
                onClick={() => (window.location.href = "/sign-up/")}
              >
                Get Started
              </button>
            </div>

            {/* Stats */}
            <div className="row text-center mt-5 fade-up delay-3">
              <div className="col">
                <div className="stat-number display-5 fw-bold" style={{ color: "#2F74AB" }}>0%</div>
                <p className="text-muted mt-2 small text-uppercase">Success Rate</p>
              </div>
              <div className="col">
                <div className="stat-number display-5 fw-bold" style={{ color: "#2F74AB" }}>0+</div>
                <p className="text-muted mt-2 small text-uppercase">Universities</p>
              </div>
              <div className="col">
                <div className="stat-number display-5 fw-bold" style={{ color: "#2F74AB" }}>0+</div>
                <p className="text-muted mt-2 small text-uppercase">Students Guided</p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-6 text-center fade-up delay-1 position-relative floating-image">
            {/* Floating Image with matching background */}
            <div className="rounded-4 shadow-lg overflow-hidden floating-container">
              <img
                src={StudentImg}
                alt="Student"
                className="img-fluid"
              />
            </div>

            {/* Decorative Circle */}
            <div className="decor-circle circle2"></div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Fade Animations */
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeUp 0.8s ease forwards;
        }
        .delay-1 { animation-delay: 0.2s !important; }
        .delay-2 { animation-delay: 0.4s !important; }
        .delay-3 { animation-delay: 0.6s !important; }
        @keyframes fadeUp {
          0% { opacity: 0; transform: translateY(20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        /* Floating image container with matching background */
        .floating-container {
          background: linear-gradient(135deg, #E7F6FF 0%, #D0EBFF 100%);
          border-radius: 1rem;
        }

        .floating-image img {
          animation: floatImg 6s ease-in-out infinite;
        }
        @keyframes floatImg {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }

        /* Bottom decorative circle */
        .decor-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(30px);
          z-index: -1;
        }
        .circle2 {
          width: 160px;
          height: 160px;
          background: rgba(47, 116, 171, 0.15);
          bottom: -20px;
          left: -20px;
        }

        /* Background lines top-right */
        .lines-background .line {
          position: absolute;
          border-radius: 2px;
          opacity: 0.15;
          transform: rotate(45deg);
        }
        .line1 {
          width: 250px;
          height: 2px;
          top: 10px;
          right: 50px;
          background: #2F74AB;
        }
        .line2 {
          width: 180px;
          height: 2px;
          top: 40px;
          right: 80px;
          background: #7FB6DB;
        }
        .line3 {
          width: 120px;
          height: 2px;
          top: 70px;
          right: 20px;
          background: #2F74AB;
        }

        /* Buttons Styling */
        .btn {
          font-size: 1.1rem;
          font-weight: 600;
          padding: 0.75rem 2rem;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }
        .book-btn {
          background-color: #fff;
          color: #2F74AB;
          border: 2px solid #2F74AB;
        }
        .book-btn:hover {
          background-color: #2F74AB;
          color: #fff;
        }
        .get-started-btn {
          background-color: #2F74AB;
          color: #fff;
          border: 2px solid #2F74AB;
        }
        .get-started-btn:hover {
          transform: translateY(-3px);
          background-color: #2F74AB;
          color: #fff;
          border: 2px solid #2F74AB;
        }
      `}</style>
    </section>
  );
}
