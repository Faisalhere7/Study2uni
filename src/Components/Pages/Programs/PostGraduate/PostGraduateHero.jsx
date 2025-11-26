import React from "react";

export default function PostGraduateHero() {

  return (
    <section
      className="py-5 hero-section position-relative"
      style={{
        // Main Background Gradient: light blue/white
        background: "linear-gradient(135deg, #E7F6FF 0%, #E7F6FF 100%)",
        overflow: "hidden",
        // Ensure the section has a visible height and alignment for content
        minHeight: "600px", 
        display: 'flex',
        alignItems: 'center', // Vertically center the content
        justifyContent: 'center',
      }}
    >
      {/* Background Layer: Decorative SVG and lines */}
      <div
        className="lines-background position-absolute w-100 h-100"
        style={{ top: 0, left: 0, pointerEvents: "none" }}
      >
        {/* Background SVG Image */}
        <img 
          src="/src/assets/image-background.svg" 
          alt="Decorative Background Pattern" 
          className="rotating-bg"
          style={{
            position: 'absolute', 
            top: '0', 
            right: '0', 
            width: '90%', 
            height: '80%',
            opacity: '0.5',
            zIndex: 0, 
          }}
        />
        
        {/* Static decorative lines and circle */}
        <div className="line line1"></div>
        <div className="line line2"></div>
        <div className="line line3"></div>
        <div className="decor-circle circle2"></div>
      </div>

      {/* Content Layer: Text (Focused on the Left Side) */}
      <div className="container position-relative" style={{ zIndex: 10 }}>
        <div className="row">
          
          {/* LEFT SIDE Content */}
          <div className="col-lg-7 text-center text-lg-start">
            
            {/* Secondary Text: Small and Black */}
            <p className="fw-bold mb-2 text-dark text-uppercase small" style={{ letterSpacing: '2px' }}>
              Postgraduate Programs
            </p>
            
            {/* Main Tagline: Large, Colorful, and Bold */}
            <h1 className="display-2 fw-bolder mb-3" style={{ color: '#2F74AB' }}>
              We make studying abroad <span style={{ color: '#1B5480' }}>simple and achievable.</span>
            </h1>
            
          </div>
          
          {/* Right side is intentionally empty for visual space/balance */}
          <div className="col-lg-5">
            {/* Optional: Placeholder for an image or animation if needed later */}
          </div>

        </div>
      </div>

      {/* CSS Styles (Kept for background elements) */}
      <style jsx>{`
        /* Decorative circle */
        .decor-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(30px);
          z-index: 0;
        }
        .circle2 {
          width: 160px;
          height: 160px;
          background: rgba(47, 116, 171, 0.15);
          bottom: -20px;
          left: -20px;
        }

        /* Background lines top-right */
        .lines-background .line {
          position: absolute;
          border-radius: 2px;
          opacity: 0.15;
          transform: rotate(45deg);
        }
        .line1 {
          width: 250px;
          height: 2px;
          top: 10px;
          right: 50px;
          background: #2F74AB;
        }
        .line2 {
          width: 180px;
          height: 2px;
          top: 40px;
          right: 80px;
          background: #7FB6DB;
        }
        .line3 {
          width: 120px;
          height: 2px;
          top: 70px;
          right: 20px;
          background: #2F74AB;
        }
      `}</style>
    </section>
  );
}