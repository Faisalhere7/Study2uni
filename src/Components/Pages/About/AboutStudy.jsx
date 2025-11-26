import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AboutStudy() {

  useEffect(() => {
    // Intersection Observer for fade-in animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach(el => observer.observe(el));
  }, []);

  return (
    <section className="py-5" style={{ backgroundColor: "#ECF8FF" }}>
      <style>{`
        * { font-family: 'Inter', sans-serif; }
        .fade-in {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .card-hover {
          transition: all 0.3s ease;
        }
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        .card-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: #dbeafe;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1.5rem;
        }
        .card-icon svg {
          width: 32px;
          height: 32px;
          color: #2F74AB;
        }
        .card-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1F4485;
          margin-bottom: 1rem;
        }
        .card-text {
          color: #4B5563;
          font-size: 1rem;
          line-height: 1.6;
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="text-center mb-5 fade-in" data-delay="0">
          <h2 className="display-4 fw-bold text-gray-800 mb-3">About Study2Uni</h2>
          <p className="lead text-muted mx-auto" style={{ maxWidth: '800px' }}>
            At Study2Uni, we are wildly excited to make educational dreams come true. For more than 15 years, we have been placing students at their favorite universities in the United Kingdom. With the help of our exceptional team, students will be assured of the appropriate course and university that suits their academic interests and future career.
          </p>
        </div>

        {/* Cards */}
        <div className="row g-4">
          {/* Our Mission */}
          <div className="col-md-4 fade-in card-hover" data-delay="100">
            <div className="bg-white rounded-4 p-4 h-100 border card">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="10"></circle>
                  <circle cx="12" cy="12" r="6"></circle>
                  <circle cx="12" cy="12" r="2"></circle>
                </svg>
              </div>
              <h3 className="card-title text-center">Our Mission</h3>
              <p className="card-text text-center">
                To offer quality UK education to everyone by providing personalized guidance, professional counseling, and full support to students to follow their academic dreams in the United Kingdom.
              </p>
            </div>
          </div>

          {/* Our Vision */}
          <div className="col-md-4 fade-in card-hover" data-delay="200">
            <div className="bg-white rounded-4 p-4 h-100 border card">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                  <circle cx="12" cy="12" r="3"></circle>
                </svg>
              </div>
              <h3 className="card-title text-center">Our Vision</h3>
              <p className="card-text text-center">
                To become the most reliable education consultancy in the UK and help all students to be the best they can be by accessing the most significant educational opportunities available at UK universities.
              </p>
            </div>
          </div>

          {/* Our Values */}
          <div className="col-md-4 fade-in card-hover" data-delay="300">
            <div className="bg-white rounded-4 p-4 h-100 border card">
              <div className="card-icon">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
              </div>
              <h3 className="card-title text-center">Our Values</h3>
              <p className="card-text text-center">
                Integrity, Excellence, Personalization, and Student Success. We provide exceptional service, custom solutions, and celebrate each student’s achievements as our success.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
