import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WhatWeDo() {
  const statsData = [
    { label: "Students Guided", value: 2400, suffix: "K+" },
    { label: "Universities Partnered", value: 100, suffix: "+" },
    { label: "Success Rate", value: 92, suffix: "%" },
    { label: "Years Experience", value: 15, suffix: "+" }
  ];

  const [counts, setCounts] = useState(statsData.map(() => 0));

  useEffect(() => {
    const intervals = statsData.map((stat, index) => {
      const increment = Math.ceil(stat.value / 100); // approximate increments
      return setInterval(() => {
        setCounts(prev => {
          const newCounts = [...prev];
          if (newCounts[index] < stat.value) {
            newCounts[index] += increment;
            if (newCounts[index] > stat.value) newCounts[index] = stat.value;
          }
          return newCounts;
        });
      }, 20);
    });

    return () => intervals.forEach(interval => clearInterval(interval));
  }, []);

  return (
    <section className="py-5" style={{ backgroundColor: "#fcfeff" }}>
      <style>{`
        .what-we-do-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }
        .left-column h6 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #ECF8FF;
          text-transform: uppercase;
          margin-bottom: 0.5rem;
          background-color: #2F74AB;
          display: inline-block;
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
        }
        .left-column h1 {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          font-size: 45px;
          font-weight: 700;
          color: #2F74AB;
          margin-top: 0.75rem;
          line-height: 1.4;
        }
        .right-column p {
          color: #4B5563;
          font-size: 20px;
          line-height: 1.8;
        }
        .stats-section {
          margin-top: 3rem;
        }
        .stat-card {
          background-color: #ECF8FF;
          color: #000000ff;
          border-radius: 12px;
          padding: 2rem 1rem;
          text-align: center;
          margin-bottom: 1rem;
          transition: transform 0.3s;
        }
        .stat-card:hover {
          transform: translateY(-5px);
        }
        .stat-number {
          font-size: 2.5rem;
          font-weight: 700;
          color: #2F74AB;
        }
        .stat-label {
          font-size: 1rem;
          font-weight: 500;
          margin-top: 0.5rem;
        }
        @media (max-width: 576px) {
          .left-column h1 { font-size: 1.5rem; }
          .right-column p { font-size: 0.95rem; }
          .stat-number { font-size: 2rem; }
        }
      `}</style>

      <div className="container what-we-do-wrapper">
        <div className="row align-items-center">
          {/* Left Column */}
          <div className="col-lg-6 left-column">
            <h6>What We Do</h6>
            <h1>We offer life-changing opportunities for students to study in the UK.</h1>
          </div>

          {/* Right Column */}
          <div className="col-lg-6 right-column">
            <p>
              At Study2Uni, proper guidance is all that is needed to make dreams a reality. We simplify every process, including finding the best courses and universities and applying.
            </p>
            <p>
              Over the years, our staff has assisted thousands of students in getting into the university of their dreams with personalized attention, professional guidance, and genuine interest in the students. At Study2Uni, you start confidently and clearly on your way to studying in the UK.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="row stats-section">
          {statsData.map((stat, index) => (
            <div key={index} className="col-md-3 col-6">
              <div className="stat-card">
                <div className="stat-number">{counts[index]}{stat.suffix}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
