import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function WhyChoose() {
  useEffect(() => {
    const features = document.querySelectorAll(".study2uni-feature");

    // Initial hidden state
    features.forEach(item => {
      item.classList.add("opacity-0", "translate-y-3");
    });

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.remove("opacity-0", "translate-y-3");
            entry.target.classList.add("opacity-100", "translate-y-0");
          }, i * 150);
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    features.forEach(item => observer.observe(item));
  }, []);

  const featuresData = [
    { title: "Expert Guidance", desc: "With our highly trained staff, we can offer you professional advice on the best courses and universities to study in the UK." },
    { title: "Proven Track Record", desc: "With a 93% success rate and over 1000 students placed in top universities worldwide, our results speak for themselves." },
    { title: "Scholarship Support", desc: "Although we do not offer scholarships, we can assist you in identifying the most suitable funding sources for your level and financial status." },
    { title: "Personalized Approach", desc: "Each student is an individual, which is why we tailor our services to your academic objectives, interests, and career ambitions." },
    { title: "Trusted Information", desc: "We ensure that our information on universities, courses, and scholarships is up to date and accurate." },
    { title: "End-to-End Support", desc: "Choosing a course through application preparation: We will guide you through the entire process to ensure a smooth, successful study experience in the UK." },
  ];

  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold text-primary">Why Choose Study2Uni?</h2>
        </div>

        <div className="row g-4"> {/* Bootstrap gap increased */}
          {featuresData.map((feature, index) => (
            <div key={index} className="col-md-6">
              <div className="study2uni-feature d-flex align-items-start p-4 bg-white rounded shadow-sm border border-light transition h-100">
                <div className="me-3 flex-shrink-0">
                  <div className="icon-circle d-flex justify-content-center align-items-center">
                    <svg className="text-white" width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </div>
                </div>
                <div>
                  <h5 className="fw-bold mb-2">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .text-primary { color: #2F74AB !important; }
        .study2uni-feature {
          transition: all 0.3s ease;
          cursor: default;
        }
        .study2uni-feature:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
        }
        .icon-circle {
          width: 35px;
          height: 35px;
          background-color: #2F74AB;
          border-radius: 50%;
        }
        .translate-y-3 { transform: translateY(20px); }
        .translate-y-0 { transform: translateY(0); }
        .opacity-0 { opacity: 0; }
        .opacity-100 { opacity: 1; }
      `}</style>
    </section>
  );
}
