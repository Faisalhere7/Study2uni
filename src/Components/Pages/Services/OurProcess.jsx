import React, { useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUniversity, FaFileAlt, FaMoneyCheckAlt, FaPassport, FaGraduationCap, FaHandsHelping } from 'react-icons/fa';

export default function OurProcess() {
  useEffect(() => {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.style.animationPlayState = 'running';
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.process-step, .why-choose-item, .fade-in-up');
    animatedElements.forEach(el => {
      el.style.animationPlayState = 'paused';
      observer.observe(el);
    });

    const headerElements = document.querySelectorAll('.header-title, .header-subtitle');
    headerElements.forEach(el => el.style.animationPlayState = 'running');
  }, []);

  const processSteps = [
    {
      title: "Choose Your University",
      description: "Choose your UK desired university within our proven network depending on your aspirations and interests.",
      icon: <FaUniversity size={28} color="#fff" />,
    },
    {
      title: "Pick Your Program",
      description: "Study a vast variety of courses, including IT and Business, Law and Engineering and choose the one that fits your profession.",
      icon: <FaFileAlt size={28} color="#fff" />,
    },
    {
      title: "Submit Application",
      description: "Apply easily using our platform with full instructions on how to fill out documents.",
      icon: <FaMoneyCheckAlt size={28} color="#fff" />,
    },
    {
      title: "Get Support",
      description: "Our team guides you through every step — from application review to UK visa assistance and offer acceptance.",
      icon: <FaPassport size={28} color="#fff" />,
    }
  ];

  const whyChoose = [
    {
      title: "Expert Guidance",
      description: "Our experienced counsellors help you choose the right course, university, and pathway for your goals.",
      icon: <FaGraduationCap size={32} color="#2F74AB" />
    },
    {
      title: "End-to-End Support",
      description: "From admission to visa and pre-departure, we assist you through every step of your UK study journey.",
      icon: <FaHandsHelping size={32} color="#2F74AB" />
    },
    {
      title: "Proven Success",
      description: "We’ve guided countless students to secure offers from top UK universities and achieve their academic dreams.",
      icon: <FaUniversity size={32} color="#2F74AB" />
    }
  ];

  return (
    <section className="py-5" style={{ backgroundColor: '#f0f0f0ff' }}>
      <style>{`
        .step-icon {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background-color: #2F74AB;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 0.5rem;
          animation: float 2s ease-in-out infinite;
        }

        .icon-circle {
          width: 80px;
          height: 80px;
          background-color: #ECF8FF;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 1rem auto;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          animation: bounceIn 0.8s ease-out forwards;
        }

        @keyframes float {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }

        @keyframes bounceIn {
          0% { opacity: 0; transform: scale(0.5); }
          60% { opacity: 1; transform: scale(1.1); }
          80% { transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .process-step {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }
        .process-step:nth-child(1) { animation-delay: 0.2s; }
        .process-step:nth-child(2) { animation-delay: 0.4s; }
        .process-step:nth-child(3) { animation-delay: 0.6s; }
        .process-step:nth-child(4) { animation-delay: 0.8s; }

        .why-choose-item {
          opacity: 0;
          animation: bounceIn 0.8s ease-out forwards;
        }
        .why-choose-item:nth-child(1) { animation-delay: 1s; }
        .why-choose-item:nth-child(2) { animation-delay: 1.2s; }
        .why-choose-item:nth-child(3) { animation-delay: 1.4s; }

        .fade-in-up {
          opacity: 0;
          animation: fadeInUp 0.8s ease-out forwards;
        }

        p, h6 {
          color: #4B5563;
        }
      `}</style>

      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h2 className="header-title display-5 fw-bold mb-3" style={{ color: '#1F4485' }}>Our Process</h2>
          <h6 className="header-subtitle mx-auto" style={{
            maxWidth: '90%',
            lineHeight: '1.7',
            textAlign: 'center'
          }}>
            A proven 4-step process that has helped thousands of students achieve their educational goals.
          </h6>
        </div>

        {/* Process Steps */}
        <div className="row g-4 mb-5">
          {processSteps.map((step, index) => (
            <div className="col-12 col-md-6 col-lg-3 process-step text-center" key={index}>
              <div className="step-icon mx-auto">{step.icon}</div>
              <h5 className="fw-semibold mb-2" style={{ color: '#1F4485' }}>{step.title}</h5>
              <p style={{ lineHeight: '1.6' }}>{step.description}</p>
            </div>
          ))}
        </div>

        {/* Why Choose */}
        <div className="text-center mb-4">
          <h2 className="fade-in-up display-5 fw-bold" style={{ color: '#1F4485', animationDelay: '1s' }}>Why Choose Our Services?</h2>
        </div>

        <div className="row g-4">
          {whyChoose.map((item, index) => (
            <div className="col-12 col-md-4 why-choose-item text-center" key={index}>
              <div className="icon-circle">{item.icon}</div>
              <h5 className="fw-semibold mb-2" style={{ color: '#1F4485' }}>{item.title}</h5>
              <p style={{ lineHeight: '1.6' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
