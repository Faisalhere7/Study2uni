import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUniversity, FaFileAlt, FaMoneyCheckAlt, FaPassport, FaGraduationCap, FaHandsHelping } from 'react-icons/fa';

const servicesData = [
  {
    title: "Choice of Course and University",
    description: "Unsure what or where to study? Based on your background, objectives, and cost, our professionals assist in getting your perfect match.",
    icon: <FaUniversity size={30} color="#fff" />,
    features: [
      "Expert counseling",
      "Compare in the UK",
      "Course recommendation: IT, Law, Economics, Architecture, etc."
    ]
  },
  {
    title: "University Admission Advice",
    description: "Ask to join leading UK universities. Applications, documents, and personal statements are the ones that we assist with to enable your profile to be one of the most outstanding in the UK.",
    icon: <FaFileAlt size={30} color="#fff" />,
    features: [
      "Application guidance",
      "Document preparation",
      "SOP and personal statement assessment"
    ]
  },
  {
    title: "Scholarship Guidance",
    description: "Find out about funding and scholarships for international students studying in the UK - US students to study in the UK scholarship.",
    icon: <FaMoneyCheckAlt size={30} color="#fff" />,
    features: [
      "Latest scholarship updates",
      "Application support",
      "Suggestions to increase approvals"
    ]
  },
  {
    title: "Visa & Documentation Support",
    description: "We give step-by-step guidance in your study abroad journey in the UK.",
    icon: <FaPassport size={30} color="#fff" />,
    features: [
      "Visa guidance",
      "Document checklist & review",
      "Interview preparation"
    ]
  },
  {
    title: "Career & Course Guidance",
    description: "Our career-related course and advice on UK job opportunities will help you plan for the future.",
    icon: <FaGraduationCap size={30} color="#fff" />,
    features: [
      "UK economics, law, and IT study advice",
      "Career counseling",
      "Post-study work visa advice"
    ]
  },
  {
    title: "Post-Admission and pre-arrival Support",
    description: "We also lend a hand even when you are already there in the UK after your admission.",
    icon: <FaHandsHelping size={30} color="#fff" />,
    features: [
      "Offer acceptance help",
      "Fee payment & travel guidance",
      "Pre-arrival checklist"
    ]
  }
];

export default function ServicesDetails() {
  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h2 className="display-5 fw-bold mb-3" style={{ color: '#1F4485' }}>Study2Uni Services</h2>
        <h6 className="mx-auto" style={{ maxWidth: "90%", color: '#4B5563', lineHeight: "1.7" }}>
          Study2Uni is an online resource to find the Best Universities in the UK. At Study2Uni, we bring your dream to come true and become a student in the United Kingdom. Our professional staff will provide all the guidance we can, assisting in the selection of the course and university, admission arrangements, and visa services. Despite the type of course you want to apply to and be it undergraduate, postgraduate, or foundation courses, we advise you on the best university in the UK that can support your objectives. We also provide the information about the best 10 IT universities in UK, ranking schools in UK, and top schools in London UK to make a great choice.
        </h6>
      </div>

      {/* Services Grid */}
      <div className="row g-4">
        {servicesData.map((service, index) => (
          <div className="col-12 col-md-6 col-lg-4" key={index}>
            <div className="card h-100 p-4 rounded-4 border-0 shadow-sm"
              style={{
                backgroundColor: '#ECF8FF',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                cursor: 'pointer',
                position: 'relative'
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-8px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              {/* Top-left Icon */}
              <div style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                backgroundColor: '#2F74AB',
                padding: '12px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {service.icon}
              </div>

              <div style={{ marginTop: '60px' }}>
                {/* Title */}
                <h5 className="fw-semibold mb-3" style={{ color: '#1F4485' }}>{service.title}</h5>

                {/* Description */}
                <h6 style={{ color: '#4B5563', lineHeight: "1.6" }}>{service.description}</h6>

                {/* Features */}
                <ul className="list-unstyled mt-3">
                  {service.features.map((feature, fIndex) => (
                    <li key={fIndex} className="d-flex align-items-start mb-2">
                      <svg className="flex-shrink-0 me-2" width="16" height="16" fill="#1F4485" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                        <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L6.5 10.793l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                      </svg>
                      <span style={{ color: '#4B5563' }}>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
