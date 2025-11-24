import React from "react";
import Logo from "../assets/cropped-logo.png";

export default function Footer() {
return ( <footer className="footer"> <div className="footer-top">
{/* Logo & About */} <div className="footer-column"> <img src={Logo} alt="Study2Uni Logo" className="footer-logo" /> <p>
Study2Uni helps students worldwide get accepted into top UK universities. Our professional yet friendly approach ensures a smooth and satisfying academic journey. </p> </div>


    {/* Quick Links */}
    <div className="footer-column">
      <h4>Quick Links</h4>
      <ul>
        <li><a href="/">Home</a></li>
        <li><a href="/programs">Programs</a></li>
        <li><a href="/universities">Universities</a></li>
        <li><a href="/about">About</a></li>
        <li><a href="/services">Services</a></li>
        <li><a href="/contact">Contact</a></li>
      </ul>
    </div>

    {/* Services */}
    <div className="footer-column">
      <h4>Services</h4>
      <ul>
        <li><a href="/scholarship-guidance">Scholarship Guidance</a></li>
        <li><a href="/career-and-course-guidance">Career & Course Guidance</a></li>
        <li><a href="/visa-and-documentation-support">Visa & Documentation Support</a></li>
        <li><a href="/university-and-course-selection">University & Course Selection</a></li>
        <li><a href="/university-admission-advice">University Admission Advice</a></li>
        <li><a href="/post-admission-and-pre-arrival-support">Post Admission & Pre Arrival Support</a></li>
      </ul>
    </div>

    {/* Contact */}
    <div className="footer-column">
      <h4>Contact</h4>
      <p>32 Bellegrove Road, London, DA16 3PY, United Kingdom</p>
      <p>+44 208 0732188</p>
      <p>info@study2uni.com</p>
    </div>
  </div>

  <div className="footer-bottom">
    © 2025 Study2Uni. Powered by SYB.
  </div>

  <style jsx>{`
    .footer {
      background-color: #DCF1FF;
      color: #1F4485;
      padding: 60px 20px 20px 20px;
      font-family: 'Arial', sans-serif;
    }
    .footer-top {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      gap: 40px;
      max-width: 1200px;
      margin: 0 auto 40px auto;
    }
    .footer-column {
      flex: 1 1 200px;
      min-width: 200px;
    }
    .footer-logo {
      width: 220px;
      margin-bottom: 20px;
      display: block;
    }
    .footer-column h4 {
      font-size: 18px;
      margin-bottom: 15px;
      color: #1F4485;
      font-weight: bold;
    }
    .footer-column p {
      color: #2F3A5F;
      font-size: 14px;
      line-height: 1.6;
    }
    .footer-column ul {
      list-style: none;
      padding: 0;
    }
    .footer-column ul li {
      margin-bottom: 10px;
    }
    .footer-column ul li a {
      color: #2F3A5F;
      text-decoration: none;
      transition: color 0.3s ease, transform 0.2s ease;
    }
    .footer-column ul li a:hover {
      color: #1F4485;
      transform: translateX(5px);
    }
    .footer-bottom {
      text-align: center;
      border-top: 1px solid rgba(31, 68, 133, 0.2);
      padding-top: 15px;
      font-size: 14px;
      color: #4a5a7a;
    }

    @media (max-width: 768px) {
      .footer-top {
        flex-direction: column;
        align-items: flex-start;
      }
      .footer-column {
        width: 100%;
      }
      .footer-logo {
        margin-bottom: 15px;
      }
    }
  `}</style>
</footer>


);
}
