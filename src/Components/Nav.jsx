import React, { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logo from "../assets/cropped-logo.png";

export function Nav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky-top bg-white shadow-sm border-bottom">
      <nav
        className="container d-flex align-items-center justify-content-between py-3 position-relative"
        style={{ height: "70px" }}
      >
        {/* Logo */}
        <a
          href="#"
          className="d-flex align-items-center"
          style={{ height: "70px", marginLeft: "-10px" }}
        >
          <img
            src={logo}
            alt="Study2Uni Logo"
            style={{ height: "55px", width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* Desktop Menu */}
        <div className="d-none d-md-flex align-items-center gap-3">
          <a
            href="#"
            className="nav-item text-dark text-decoration-none fw-bold px-3 py-1 hover-effect"
          >
            Home
          </a>

          {/* Programs Dropdown */}
          <div className="dropdown-desktop position-relative">
            <button className="btn btn-white text-dark fw-bold px-3 py-1 hover-effect d-flex align-items-center gap-1">
              Programs <ChevronDown size={16} />
            </button>
            <div className="dropdown-card shadow-lg rounded-xl position-absolute mt-2">
              <a href="#" className="dropdown-link">
                Undergraduate (Bachelor's Degree)
              </a>
              <a href="#" className="dropdown-link">
                Graduate (Master's Degree)
              </a>
              <a href="#" className="dropdown-link">
                PhD / Research
              </a>
              <a href="#" className="dropdown-link rounded-b-xl">
                Diploma / Certificate
              </a>
            </div>
          </div>

          <a
            href="#"
            className="nav-item text-dark text-decoration-none fw-bold px-3 py-1 hover-effect"
          >
            Universities
          </a>
          <a
            href="#"
            className="nav-item text-dark text-decoration-none fw-bold px-3 py-1 hover-effect"
          >
            About
          </a>
          <a
            href="#"
            className="nav-item text-dark text-decoration-none fw-bold px-3 py-1 hover-effect"
          >
            Contact
          </a>
        </div>

        {/* Desktop Buttons */}
        <div className="d-none d-md-flex gap-2">
          <button className="btn btn-outline-custom fw-bold">Sign In</button>
          <button className="btn btn-primary-custom fw-bold">Get Started</button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="d-md-none btn btn-light border"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Card */}
      {mobileMenuOpen && (
        <div className="d-md-none p-3">
          <div
            className="bg-white rounded-2xl shadow-lg p-5 d-flex flex-column gap-3 border"
            style={{ borderColor: "#1F306E" }}
          >
            {/* Medium logo */}
            <img
              src={logo}
              alt="Study2Uni Logo"
              style={{ height: "50px", width: "auto", objectFit: "contain" }}
              className="mx-auto mb-3"
            />

            {/* Menu Links */}
            <a
              href="#"
              className="text-dark text-decoration-none fw-semibold py-3 px-4 hover-card rounded-lg"
            >
              Home
            </a>

            {/* Mobile Programs Dropdown */}
            <div className="dropdown w-100">
              <button
                className="btn btn-white w-100 text-start fw-semibold py-3 px-4 hover-card rounded-lg d-flex justify-content-between"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#mobilePrograms"
                aria-expanded="false"
              >
                Programs <ChevronDown size={16} />
              </button>
              <div className="collapse" id="mobilePrograms">
                <a href="#" className="dropdown-link-mobile">
                  Undergraduate (Bachelor's Degree)
                </a>
                <a href="#" className="dropdown-link-mobile">
                  Graduate (Master's Degree)
                </a>
                <a href="#" className="dropdown-link-mobile">
                  PhD / Research
                </a>
                <a href="#" className="dropdown-link-mobile">
                  Diploma / Certificate
                </a>
              </div>
            </div>

            <a
              href="#"
              className="text-dark text-decoration-none fw-semibold py-3 px-4 hover-card rounded-lg"
            >
              Universities
            </a>
            <a
              href="#"
              className="text-dark text-decoration-none fw-semibold py-3 px-4 hover-card rounded-lg"
            >
              About
            </a>
            <a
              href="#"
              className="text-dark text-decoration-none fw-semibold py-3 px-4 hover-card rounded-lg"
            >
              Contact
            </a>

            {/* Buttons */}
            <div className="d-flex flex-column gap-3 mt-4">
              <button className="btn btn-outline-mobile fw-bold">Sign In</button>
              <button className="btn btn-primary-mobile fw-bold">Get Started</button>
            </div>
          </div>
        </div>
      )}

      {/* Styles */}
      <style jsx>{`
        .hover-effect:hover {
          color: #1f306e !important;
          transition: all 0.3s ease;
        }

        .hover-card:hover {
          background-color: rgba(31, 48, 110, 0.1);
          transition: all 0.3s ease;
        }

        /* Dropdown Desktop */
        .dropdown-desktop {
          position: relative;
        }
        .dropdown-desktop .dropdown-card {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          
          min-width: 250px;
          background: #ffffff;
          border-radius: 12px;
          flex-direction: column;
          z-index: 1000;
          padding: 0.5rem 0;
        }
        .dropdown-desktop:hover .dropdown-card {
          display: flex;
        }
        .dropdown-card .dropdown-link {
          padding: 0.75rem 1rem;
          font-weight: 500;
          color: #1f306e;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .dropdown-card .dropdown-link:hover {
          background-color: #f0f4ff;
          color: #0f1a3a;
          border-radius: 8px;
      
        }

        /* Desktop Sign In Button */
        .btn-outline-custom {
          color: #1f306e;
          border-radius: 12px;
          padding: 0.5rem 1.2rem;
          background-color: transparent;
          transition: all 0.3s ease;
        }
        .btn-outline-custom:hover {
          background-color: #1F4485;
          color: #ffffff;
        }
        .btn-outline-custom:active {
          background-color: #13224b;
          color: #ffffff;
        }

        .btn-primary-custom {
          background-color: #2f74ab;
          color: #ffffff;
          border-radius: 12px;
          padding: 0.5rem 1.2rem;
          transition: all 0.3s ease;
        }
        .btn-primary-custom:hover {
          background-color: #1F4485;
          color: #ffffff;
        }
        .btn-primary-custom:active {
          background-color: #13224bs;
          color: #ffffff;
        }

        /* Mobile Buttons */
        .btn-outline-mobile {
          border: 2px solid #1f306e;
          color: #1f306e;
          border-radius: 12px;
          padding: 0.7rem 0;
          width: 100%;
          background-color: transparent;
          transition: all 0.3s ease;
        }
        .btn-outline-mobile:hover {
          background-color: #1f306e;
          color: #ffffff;
        }
        .btn-outline-mobile:active {
          background-color: #13224b;
          color: #ffffff;
        }

        .btn-primary-mobile {
          background-color: #1f306e;
          color: #ffffff;
          border-radius: 12px;
          padding: 0.7rem 0;
          width: 100%;
          transition: all 0.3s ease;
        }
        .btn-primary-mobile:hover {
          background-color: #13224b;
        }
        .btn-primary-mobile:active {
          background-color: #0f1a3a;
        }

        /* Mobile dropdown links */
        .dropdown-link-mobile {
          display: block;
          padding: 0.75rem 1rem;
          font-weight: 500;
          color: #1f306e;
          text-decoration: none;
          transition: all 0.3s ease;
        }
        .dropdown-link-mobile:hover {
          background-color: #f0f4ff;
          color: #0f1a3a;
          border-radius: 8px;
        }
      `}</style>
    </header>
  );
}

export default Nav;
