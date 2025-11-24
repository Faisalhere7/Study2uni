import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const testimonials = [
  {
    id: 1,
    name: "Sarah Chen",
    university: "University of London",
    rating: 5,
    quote:
      "Study2Uni's personalized guidance was transformative. They helped me refine my research proposal, optimize my CV, and craft a compelling statement of purpose. Every step of the application process was explained clearly, from document preparation to interview strategy. Their mentorship gave me the confidence and tools I needed to pursue my dream PhD at the University of London. I always felt supported and guided by experts who truly understood my goals.",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    university: "Oxford University",
    rating: 5,
    quote:
      "What sets Study2Uni apart is their deep understanding of each university’s unique application requirements. They helped me highlight my academic achievements, tailor my essays, and prepare thoroughly for interviews. Their insights on scholarships and networking opportunities were invaluable. Thanks to their strategic approach and encouragement, Oxford was always a dream, and now it has become my reality. I am grateful for their constant support and professionalism.",
  },
  {
    id: 3,
    name: "Priya Sharma",
    university: "London Metropolitan University",
    rating: 5,
    quote:
      "Study2Uni's strategic guidance completely changed my application experience. They helped me identify my strengths, craft a persuasive narrative, and avoid common pitfalls in the admission process. Beyond paperwork, they offered advice on research opportunities, faculty networking, and scholarship applications. The result? Acceptance to my top-choice program with a research assistantship. Their guidance was thorough, practical, and incredibly motivating.",
  },
  {
    id: 4,
    name: "David Kim",
    university: "Cambridge University",
    rating: 5,
    quote:
      "From the first consultation to the visa process, Study2Uni’s support was exceptional. They provided step-by-step guidance, reviewed all documents meticulously, and prepared me for interviews. Their knowledge of Cambridge’s selection process, combined with personalized advice, made an overwhelming journey feel achievable. Today, I’m enrolled at Cambridge University, confident in my academic path, and extremely grateful for their expert mentorship and encouragement every step of the way.",
  },
];



export default function Stories() {
const [currentIndex, setCurrentIndex] = useState(0);

useEffect(() => {
const interval = setInterval(() => {
setCurrentIndex((prev) => (prev + 1) % testimonials.length);
}, 5000);
return () => clearInterval(interval);
}, []);

const handleIndicatorClick = (index) => setCurrentIndex(index);
const current = testimonials[currentIndex];

return ( <section className="success-stories-section py-5 position-relative overflow-hidden"> <div className="container">
{/* Section Header */} <div className="text-center mb-5"> <h2 className="display-5 fw-bold">Success Stories</h2> <p className="text-primary fw-semibold mb-2">From our students worldwide</p>
<p className="text-secondary lead mx-auto" style={{ maxWidth: '700px' }}>
Join thousands of students who've achieved their academic dreams with our expert guidance and personalized support. </p> </div>


    <div className="row g-4 align-items-stretch">
      {/* Left: Testimonial Card */}
      <div className="col-lg-8">
        <div className="card shadow-lg border-0 p-4 testimonial-card h-100 position-relative">
          <div className="d-flex justify-content-between mb-3 flex-wrap">
            <div>
              <h4 className="fw-bold">{current.name}</h4>
              <p className="text-primary fw-semibold">{current.university}</p>
            </div>
            <div className="text-end mt-2 mt-lg-0">
              <div>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`star fs-5 ${i < current.rating ? 'text-warning' : 'text-muted'}`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>
          <blockquote className="fst-italic text-secondary mb-4">
            "{current.quote}"
          </blockquote>

          {/* Indicators */}
          <div className="d-flex justify-content-center gap-2 mt-3">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`indicator rounded-circle ${i === currentIndex ? 'active bg-primary' : 'bg-secondary'}`}
                style={{ width: i === currentIndex ? '32px' : '12px', height: '12px', border: 'none', transition: '0.3s' }}
                onClick={() => handleIndicatorClick(i)}
              ></button>
            ))}
          </div>
        </div>
      </div>

      {/* Right: CTA Card */}
      <div className="col-lg-4">
        <div className="card text-white shadow-lg p-4 bg-gradient-primary rounded-3 h-100 position-relative">
          <h3 className="text-center mb-3">Start Your Journey Today</h3>
          <p className="text-white-75 mb-4 text-center">
            Join our community of successful students and take the first step toward your dream university.
          </p>
          <div className="d-grid gap-3 mb-3">
            <a
              href="https://wa.me/+442080732188"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light btn-lg fw-bold"
            >
              Talk to a Consultant
            </a>
            <a href="/contact" className="btn btn-outline-light btn-lg fw-bold">
              Book Free Consultation
            </a>
          </div>
          <ul className="list-unstyled small">
            <li>✅ Free 30-minute consultation</li>
            <li>✅ Personalized university matching</li>
            <li>✅ Application strategy session</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  {/* Custom CSS */}
  <style jsx>{`
    .success-stories-section {
      background: linear-gradient(135deg, #e0f2ff 0%, #f8fafc 100%);
    }
    .testimonial-card {
      border-radius: 2rem;
      transition: transform 0.5s ease, box-shadow 0.5s ease;
    }
    .testimonial-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 15px 25px rgba(0,0,0,0.12);
    }
    .indicator {
      cursor: pointer;
    }
    .indicator.active {
      width: 32px !important;
      border-radius: 6px;
    }
    .bg-gradient-primary {
      background: linear-gradient(135deg, #2f74ab, #1f4485);
      transition: transform 0.3s ease;
    }
    .bg-gradient-primary:hover {
      transform: translateY(-3px);
      box-shadow: 0 10px 20px rgba(0,0,0,0.2);
    }
  `}</style>
</section>


);
}
