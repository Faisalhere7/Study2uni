import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/cropped-logo.png";

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false);

  return (
    <header className="sticky-top bg-white shadow-sm border-bottom">
      <nav className="container d-flex align-items-center justify-content-between py-3 position-relative" style={{ height: "70px" }}>
        {/* Logo */}
        <a href="/" className="d-flex align-items-center" style={{ height: "70px", marginLeft: "-10px" }}>
          <img src={logo} alt="Study2Uni Logo" style={{ height: "55px", width: "auto", objectFit: "contain" }} />
        </a>

        {/* Desktop Menu */}
        <div className="d-none d-md-flex align-items-center gap-3">
          <a href="/" className="nav-item text-dark text-decoration-none fw-bold px-3 py-1 hover-effect">Home</a>

          {/* Programs Dropdown */}
          <div className="dropdown-desktop position-relative">
            <button className="btn btn-white text-dark fw-bold px-3 py-1 hover-effect d-flex align-items-center gap-1">
              Programs <ChevronDown size={16} />
            </button>
            <div className="dropdown-card shadow-lg rounded-xl position-absolute">
              <a href="/undergraduate-bachelors-degree" className="dropdown-link">Undergraduate (Bachelor's Degree)</a>
              <a href="/postgraduate-masters-degree" className="dropdown-link">Graduate (Master's Degree)</a>
              <a href="/phd-research" className="dropdown-link">PhD / Research</a>
              <a href="/diploma-certificate-courses" className="dropdown-link rounded-b-xl">Diploma / Certificate</a>
            </div>
          </div>

          <a href="/universities" className="nav-item text-dark text-decoration-none fw-bold px-3 py-1 hover-effect">Universities</a>
          <a href="/about" className="nav-item text-dark text-decoration-none fw-bold px-3 py-1 hover-effect">About</a>
          <a href="/services" className="nav-item text-dark text-decoration-none fw-bold px-3 py-1 hover-effect">Services</a>
          <a href="/contact" className="nav-item text-dark text-decoration-none fw-bold px-3 py-1 hover-effect">Contact</a>
        </div>

        {/* Desktop Buttons */}
        <div className="d-none d-md-flex gap-2">
          <a href="/sign-in" className="btn btn-outline-custom fw-bold">Sign In</a>
          <a href="/sign-up" className="btn btn-primary-custom fw-bold">Get Started</a>
        </div>

        {/* Mobile Toggle */}
        <button className="d-md-none btn btn-light border" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="d-md-none p-3">
          <div className="bg-white rounded-2xl shadow-lg p-5 d-flex flex-column gap-3 border" style={{ borderColor: "#1F306E" }}>
            <img src={logo} alt="Study2Uni Logo" style={{ height: "50px" }} className="mx-auto mb-3" />

            <a href="/" className="text-dark fw-semibold py-3 px-4 hover-card rounded-lg">Home</a>

            {/* Mobile Programs Dropdown */}
            <div className="w-100">
              <button
                className="btn btn-white w-100 text-start fw-semibold py-3 px-4 hover-card rounded-lg d-flex justify-content-between"
                onClick={() => setMobileProgramsOpen(!mobileProgramsOpen)}
              >
                Programs <ChevronDown size={16} />
              </button>

              {mobileProgramsOpen && (
                <div className="mt-2">
                  <a href="/undergraduate-bachelors-degree" className="dropdown-link-mobile" onClick={() => setMobileProgramsOpen(false)}>Undergraduate (Bachelor's Degree)</a>
                  <a href="#" className="dropdown-link-mobile" onClick={() => setMobileProgramsOpen(false)}>Graduate (Master's Degree)</a>
                  <a href="#" className="dropdown-link-mobile" onClick={() => setMobileProgramsOpen(false)}>PhD / Research</a>
                  <a href="#" className="dropdown-link-mobile" onClick={() => setMobileProgramsOpen(false)}>Diploma / Certificate</a>
                </div>
              )}
            </div>

            <a href="/universities" className="text-dark fw-semibold py-3 px-4 hover-card rounded-lg">Universities</a>
            <a href="/contact" className="text-dark fw-semibold py-3 px-4 hover-card rounded-lg">About</a>
            <a href="/about" className="text-dark fw-semibold py-3 px-4 hover-card rounded-lg">Contact</a>

            <div className="d-flex flex-column gap-3 mt-4">
<a href="/sign-in" className="btn btn-outline-mobile fw-bold">Sign In</a>
              <button className="btn btn-primary-mobile fw-bold getbtn">Get Started</button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .hover-effect:hover { color: #1f306e !important; transition: 0.3s ease; }
        .hover-card:hover { background-color: rgba(31, 48, 110, 0.1); transition: 0.3s ease; }

        /* Desktop Dropdown Fix */
        .dropdown-desktop { position: relative; }
        .dropdown-desktop:hover .dropdown-card { display: flex; flex-direction: column; }
        .dropdown-card {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          min-width: 250px;
          background: #fff;
          border-radius: 12px;
          z-index: 1000;
          padding: 12px 0;
        }
        .dropdown-link { padding: 0.75rem 1rem; color: #1f306e; text-decoration: none; font-weight: 500; transition: 0.3s; }
        .dropdown-link:hover { background: #f0f4ff; border-radius: 8px; }

        /* Buttons */
        .btn-outline-custom { color: #0f1a3a; border-radius: 12px; padding: 0.5rem 1.2rem; }
        .btn-primary-custom { background: #2f74ab; color: #fff; border-radius: 12px; padding: 0.5rem 1.2rem; }

        /* Mobile Dropdown */
        .dropdown-link-mobile { display: block; padding: 0.75rem 1rem; color: #1f306e; font-weight: 500; transition: 0.3s; text-decoration: none; }
        .dropdown-link-mobile:hover { background: #f0f4ff; border-radius: 8px; }
      `}</style>
    </header>
  );
}

export default Nav;
