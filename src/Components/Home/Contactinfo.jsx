import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Contactinfo() {
  return (
    <section className="start-journey-section py-7">
      <div className="container text-center text-white">
        <h2 className="display-5 fw-bold mb-4">Ready to Start Your Journey?</h2>
        <p className="lead mb-5">
          Join thousands of successful students who trusted us with their educational dreams. Let’s make your study abroad goals a reality.
        </p>
        <a href="/contact" className="btn btn-lg btn-outline-light fw-bold start-journey-btn">
          Book Free Consultation
        </a>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .start-journey-section {
          background: linear-gradient(135deg, #387AAF 0%, #2F74AB 100%);
          padding-top: 6rem;
          padding-bottom: 6rem;
        }
        .start-journey-btn {
          padding: 0.75rem 2rem;
          font-size: 1.25rem;
          border-radius: 0.75rem;
          transition: all 0.3s ease;
        }
        .start-journey-btn:hover {
          background-color: white;
          color: #2F74AB;
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }

        @media (max-width: 576px) {
          .start-journey-section h2 {
            font-size: 1.8rem;
          }
          .start-journey-section p {
            font-size: 1rem;
          }
          .start-journey-btn {
            width: 100%;
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
