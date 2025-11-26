import React, { useEffect, useState, useMemo } from "react";
import { useParams, useLocation, Link } from "react-router-dom"; 
import Nav from "../Nav";
import Footer from "../Footer";

// --- Config and Constants ---
const PRIMARY_COLOR = "#2F74AB";
const SECONDARY_COLOR = "#1F4485";
const FALLBACK_IMAGE = "https://via.placeholder.com/1200x500?text=University+Image+Unavailable";
const API_BASE_URL = "https://adminpanel.study2uni.com/api";

// --- Utility Components ---




/**
 * Helper component to safely render API content that might contain HTML/Rich Text.
 */
const renderRichText = (content) => {
    if (!content) {
        return <p className="text-muted fst-italic">Detailed information is not available for this section.</p>;
    }
    
    // Normalize content (e.g., replace HTML entities like &amp;)
    const htmlContent = String(content).replace(/&amp;/g, '&');

    return (
        <div 
            className="text-secondary rich-text-content"
            // WARNING: Use with caution as it renders raw HTML.
            dangerouslySetInnerHTML={{ __html: htmlContent }} 
        />
    );
};

// --- Dedicated Branch Details Component (Structured List) ---
const BranchDetails = ({ branches }) => {
    if (!branches || branches.length === 0) {
        return <p className="text-muted">Branch information not provided.</p>;
    }

    return (
        <div className="list-group shadow-sm">
            {branches.map((branch, index) => (
                <div key={index} className="list-group-item list-group-item-action">
                    <div className="d-flex w-100 justify-content-between align-items-center">
                        <h5 className="mb-1 fw-bold text-dark">{branch.name || "Campus"}</h5>
                        <small className="text-muted">
                            {branch.city}, {branch.country}
                        </small>
                    </div>
                    <p className="mb-1 text-secondary">
                        {branch.address}
                        {branch.is_main && <span className="badge bg-primary ms-2">Main</span>}
                    </p>
                </div>
            ))}
        </div>
    );
};

// --- Dedicated Programs Component (Structured Cards) ---
const ProgramDetails = ({ programs }) => {
    if (!programs || (Array.isArray(programs) && programs.length === 0)) {
        return <p className="text-muted">Program details not available.</p>;
    }

    const formatCurrency = (amount) => {
        const num = parseFloat(amount);
        return isNaN(num) ? 'N/A' : `£${new Intl.NumberFormat('en-GB').format(Math.floor(num))} GBP`;
    };

    if (Array.isArray(programs)) {
        return (
            <div className="row g-4">
                {programs.map((program, index) => (
                    <div key={index} className="col-12 col-md-6 col-lg-4">
                        <div className="card h-100 shadow-sm border-0">
                            <div className="card-body">
                                <h5 className="card-title fw-bold" style={{ color: PRIMARY_COLOR }}>{program.name || `Program ${index + 1}`}</h5>
                                
                                <div className="d-flex justify-content-between small text-secondary mb-1">
                                    <span className="fw-medium">Duration:</span>
                                    <span className="fw-bold">{program.course_duration || 'N/A'}</span>
                                </div>
                                
                                <div className="d-flex justify-content-between small text-secondary mb-3">
                                    <span className="fw-medium">First Year Fees:</span>
                                    <span className="fw-bold text-success">{formatCurrency(program.average_fees || '0')}</span>
                                </div>
                                
                                <button className="btn btn-sm w-100 mt-2"
                                    style={{ backgroundColor: PRIMARY_COLOR, color: '#fff' }}
                                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = SECONDARY_COLOR)}
                                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_COLOR)}
                                >
                                    View Program Details
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    }

    return renderRichText(programs);
};

/**
 * Custom hook to fetch the university data by slug.
 */
const useUniversityData = (slug, initialUni) => {
  const [uni, setUni] = useState(initialUni);
  const [loading, setLoading] = useState(!initialUni);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!uni && slug) {
      const fetchUni = async () => {
        setLoading(true);
        setError(null);
        try {
          const detailUrl = `${API_BASE_URL}/university/${slug}/detail`;
          const res = await fetch(detailUrl);
          
          let data;
          if (res.ok) {
            data = await res.json();
            setUni(data.data || null);
          } else {
             const fallbackRes = await fetch(`${API_BASE_URL}/universities?query=${slug}&perPage=1`);
             data = await fallbackRes.json();
             if (fallbackRes.ok && data.success && data.data.length > 0) {
                 setUni(data.data[0]);
             } else {
                 setUni(null);
                 setError("University not found.");
             }
          }
        } catch (err) {
          setError("Network error or invalid API response.");
          setUni(null);
        } finally {
          setLoading(false);
        }
      };
      fetchUni();
    }
  }, [slug, uni]);

  return { uni, loading, error };
};

// --- Main Component ---

export default function UniversityDetails() {
  const { slug } = useParams();
  const { state } = useLocation() || {};

  const { uni, loading, error } = useUniversityData(slug, state?.uni);
  const [activeTab, setActiveTab] = useState("overview");

  // Custom Styles using the defined color scheme
  const customStyles = useMemo(() => ({
    tabLinkActive: {
      borderBottom: `3px solid ${PRIMARY_COLOR}`,
      color: PRIMARY_COLOR,
      fontWeight: '600',
    },
    tabLinkInactive: {
      borderBottom: "3px solid transparent",
      color: "#555",
      fontWeight: '500',
    },
    primaryButton: {
      backgroundColor: PRIMARY_COLOR,
      color: "#fff",
      borderColor: PRIMARY_COLOR,
      transition: "background-color 0.3s, border-color 0.3s",
    },
    secondaryButton: {
      borderColor: PRIMARY_COLOR,
      color: PRIMARY_COLOR,
      transition: "background-color 0.3s, color 0.3s",
    },
  }), []);


  // Helper to format text for display
  const formatTabName = (name) => {
    return name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  const location = uni?.main_branch
    ? `${uni.main_branch.city}, ${uni.main_branch.country}`
    : "Location unavailable";

  // --- CONTENT MAPPING ---
  const tabContents = {
    overview: (
        <>
            <h5 className="fw-bold mb-3 text-dark">Institution Details</h5>
            <div className="row g-3 mb-4">
                <div className="col-md-6">
                    <p className="mb-1 fw-medium text-secondary">Institution Type:</p>
                    <p className="fw-bold text-dark">{uni?.institution_type || "N/A"}</p>
                </div>
                <div className="col-md-6">
                    <p className="mb-1 fw-medium text-secondary">Founded:</p>
                    <p className="fw-bold text-dark">{uni?.founded || "N/A"}</p>
                </div>
            </div>
            
            <h5 className="fw-bold mb-3 mt-4 text-dark">Academic Excellence</h5>
            <div className="row text-center g-2">
                {['Full-Time', 'Part-Time', 'Undergraduate', 'Postgraduate'].map(label => {
                    const dataKey = label.toLowerCase().replace('-', '_'); 
                    const value = uni?.[dataKey] !== undefined ? `${uni[dataKey]}%` : '0%';
                    return (
                        <div key={label} className="col-6 col-md-3">
                            <div className="border p-3 rounded bg-white">
                                <h4 className="fw-bold mb-0" style={{color: PRIMARY_COLOR}}>{value}</h4>
                                <small className="text-muted">{label}</small>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    ),

    programs: <ProgramDetails programs={uni?.programs} />,
    
    student_life: (
        <>
            <h5 className="fw-bold mb-3 text-dark">Student Life</h5>
            {renderRichText(uni?.studentLife)}
        </>
    ),
    
    international_students: (
        <>
            <h5 className="fw-bold mb-3 text-dark">International Students</h5>
            {renderRichText(uni?.internationalStudents)}
        </>
    ),
    
    branches: (
        <>
            <h5 className="fw-bold mb-3 text-dark">Branches</h5>
            <BranchDetails branches={uni?.branches} />
        </>
    ), 
  };
  // --------------------------------------------------------------------------

  // --- Loading and Error States ---
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border" role="status" style={{ color: PRIMARY_COLOR }}>
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3 text-secondary">Loading university details...</p>
      </div>
    );
  }

  if (error || !uni) {
    return (
      <div className="text-center py-5">
        <p className="text-danger mb-4">
          {error || "No university found."}
        </p>
        <Link
          to="/universities"
          className="btn btn-outline-primary"
          style={{ borderColor: PRIMARY_COLOR, color: PRIMARY_COLOR }}
        >
          ← Back to Universities
        </Link>
      </div>
    );
  }

  // --- Render Component ---
  return (
    <>
     <Nav/>
      <div className="container my-5">
        {/* Back Link */}
        <div className="mb-4">
          <Link
            to="/universities"
            className="text-decoration-none"
            style={{ color: PRIMARY_COLOR }}
          >
            ← Back to Universities
          </Link>
        </div>

        <div className="row g-4">
          {/* Main Content Column */}
          <div className="col-lg-8">
            {/* University Header (Up-side of tab content) */}
            <h1 className="fw-bold mb-1">{uni.name}</h1>
            <p className="text-muted mb-1">
              <i className="bi bi-geo-alt-fill me-2"></i>
              {location}
            </p>
            <p className="text-muted mb-3">Founded: {uni.founded || "N/A"}</p>
            
            {/* Main Image */}
            <img
              src={uni.thumbnail ? `${API_BASE_URL.replace('/api', '/storage')}/${uni.thumbnail}` : FALLBACK_IMAGE}
              alt={uni.name}
              className="img-fluid rounded shadow-sm mb-4"
              style={{ width: "100%", height: "450px", objectFit: "cover" }}
            />

            {/* About Section (Moved back above tabs) */}
            <section className="mb-5">
                <h3 className="mb-3 border-bottom pb-2">About the University</h3>
                {renderRichText(uni.about)}
            </section>

            {/* Tabs Navigation */}
            <ul className="nav nav-tabs border-bottom mb-3 flex-nowrap overflow-auto" role="tablist">
              {[
                "overview",
                "programs",
                "student_life",
                "international_students",
                "branches",
              ].map((tab) => (
                <li className="nav-item flex-shrink-0" key={tab}>
                  <button
                    className={`nav-link text-center px-3 ${activeTab === tab ? "active" : ""}`}
                    onClick={() => setActiveTab(tab)}
                    style={activeTab === tab ? customStyles.tabLinkActive : customStyles.tabLinkInactive}
                  >
                    {formatTabName(tab)}
                  </button>
                </li>
              ))}
            </ul>

            {/* Tab Content */}
            <div className="tab-content border p-4 rounded-3 bg-light">
              {tabContents[activeTab]} 
            </div>
          </div>

          {/* Sidebar (Quick Info Card) */}
          <div className="col-lg-4">
            <div className="card shadow-lg border-0 sticky-top" style={{ top: '20px' }}>
              <div className="card-body p-4">
                <h4 className="card-title fw-bold mb-4" style={{ color: PRIMARY_COLOR }}>
                  Quick Admission Info
                </h4>
                
                {/* Info List */}
                <ul className="list-unstyled mb-4 small">
                    <li className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <span className="fw-medium text-secondary">Global Rank:</span>
                        <span className="fw-bold text-dark">{uni.global_ranking || "N/A"}</span>
                    </li>
                    <li className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <span className="fw-medium text-secondary">Founded:</span>
                        <span className="fw-bold text-dark">{uni.founded || "N/A"}</span>
                    </li>
                    <li className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <span className="fw-medium text-secondary">Total Students:</span>
                        <span className="fw-bold text-dark">{uni.total_students || "N/A"}</span>
                    </li>
                    <li className="d-flex justify-content-between mb-2 pb-2 border-bottom">
                        <span className="fw-medium text-secondary">Website:</span>
                        {uni.website ? (
                            <a 
                                href={uni.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-primary fw-bold text-decoration-none" 
                                style={{color: PRIMARY_COLOR}}
                            >
                                Visit Site
                            </a>
                        ) : (
                            <span className="fw-bold text-dark">N/A</span>
                        )}
                    </li>
                </ul>

                <h6 className="mt-4 mb-2">Get Expert Guidance</h6>
                <p className="text-muted small">
                  Speak with our consultants about admission requirements and application process.
                </p>

                {/* Buttons with custom hover styles */}
                <div className="d-grid gap-2 mt-3">
                  <button
                    className="btn btn-lg"
                    style={customStyles.primaryButton}
                    onMouseOver={(e) => (e.currentTarget.style.backgroundColor = SECONDARY_COLOR)}
                    onMouseOut={(e) => (e.currentTarget.style.backgroundColor = PRIMARY_COLOR)}
                  >
                    Book Free Consultation
                  </button>
                  <button
                    className="btn btn-lg btn-outline-primary"
                    style={customStyles.secondaryButton}
                    onMouseOver={(e) => { e.currentTarget.style.backgroundColor = PRIMARY_COLOR; e.currentTarget.style.color = "#fff"; }}
                    onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = PRIMARY_COLOR; }}
                  >
                    Call Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer/>
    </>
  );
}