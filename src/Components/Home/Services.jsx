import React from "react";

export default function ServicesSection() {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold text-dark mb-3">Our Key Services</h2>
          <p className="text-secondary mx-auto" style={{ maxWidth: "700px" }}>
            Comprehensive support throughout your UK education journey, from application to arrival
          </p>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          <ServiceCard
            title="University Admission Advice"
            description="We assist with applications, documents, and personal statements for top UK universities."
            iconPath="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            link="/university-admission-advice/"
          />

          <ServiceCard
            title="Career & Course Guidance"
            description="Plan your future with expert advice on study choices and career opportunities in the UK."
            iconPath="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            link="/career-and-course-guidance/"
          />

          <ServiceCard
            title="Visa & Documentation Support"
            description="Step-by-step help with visa applications, document checks, and interview preparation."
            iconPath="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
            link="/visa-and-documentation-support/"
          />

          <ServiceCard
            title="Scholarship Guidance"
            description="Find and apply for scholarships with personalized support to boost your application's approval."
            iconPath="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
            link="/scholarship-guidance/"
          />

          <ServiceCard
            title="Course & University Selection"
            description="Get expert guidance to choose the right course and university based on your goals and budget."
            iconPath="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
            link="/university-and-course-selection/"
          />

          <ServiceCard
            title="Post-Admission & Pre-Arrival Support"
            description="Assistance with offer acceptance, travel planning, and settling in the UK."
            iconPath="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            link="/post-admission-and-pre-arrival-support/"
          />
        </div>

        {/* Centered Button */}
        <div className="text-center mt-4">
          <a
            href="/services"
            className="btn btn-lg shadow btn-hover1"
            style={{
              backgroundColor: "#2F74AB",
              borderColor: "#1F4485",
              color: "#fff",
            }}
          >
            Learn More About Our Services
          </a>
        </div>
      </div>

     <style jsx>{`
  .service-card {
    background-color: #EFF6FF;
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  .service-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  .service-card svg {
    color: #2F74AB;
  }

  .btn-hover1:hover {
    background-color: #1F4485;
  }
`}</style>

    </section>
  );
}

function ServiceCard({ title, description, iconPath, link }) {
  return (
    <div className="col-md-6 col-lg-4">
      <a href={link} className="text-decoration-none">
        <div className="service-card rounded-3 p-4 border h-100 d-flex flex-column align-items-center text-center">
          <div
            className="mb-3 d-flex align-items-center justify-content-center rounded-circle bg-white"
            style={{ width: "60px", height: "60px" }}
          >
            <svg
              className="w-50 h-50"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={iconPath}
              ></path>
            </svg>
          </div>
          <h5 className="fw-bold text-dark mb-2">{title}</h5>
          <p className="text-secondary">{description}</p>
        </div>
      </a>
    </div>
  );
}
