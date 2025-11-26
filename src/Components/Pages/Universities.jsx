import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer";
import Nav from "../Nav";

const fallbackImage = "https://via.placeholder.com/400x200?text=No+Image";

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [search, setSearch] = useState("");

  const fetchUniversities = async (pageNum = 1, searchQuery = "", append = false) => {
    if (!hasNextPage && append) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        perPage: 12,
        page: pageNum,
      });
      if (searchQuery.trim()) params.append("query", searchQuery.trim());

      const res = await fetch(
        `https://adminpanel.study2uni.com/api/universities?${params.toString()}`
      );
      const result = await res.json();

      if (result.success) {
        if (append) {
          setUniversities((prev) => [...prev, ...result.data]);
        } else {
          setUniversities(result.data);
        }
        setHasNextPage(result.next_page);
      } else {
        setError("Failed to load universities.");
      }
    } catch (err) {
      setError("Error fetching data.");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchUniversities(1, search, false);
    setPage(1);
    setHasNextPage(true);
  }, []);

  const handleSearch = () => {
    setPage(1);
    setHasNextPage(true);
    fetchUniversities(1, search, false);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchUniversities(nextPage, search, true);
    setPage(nextPage);
  };

  return (
    <>
      <Nav />
      <div className="uni-wrapper">

        {/* TOP HEADER SECTION */}
        <section className="directory-header text-center">
          <h2 className="header-title">University Directory</h2>
          <p className="header-subtitle">
            Explore top universities worldwide and find your perfect match.
          </p>
        </section>

        {/* SEARCH BAR BELOW SECTION */}
        <div className="container">
          <div className="search-bar mt-n4 mx-auto">
            <div className="input-group">
              <input
                type="text"
                placeholder="Search universities..."
                className="form-control search-input"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="btn search-btn" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>

        <div className="container py-5">
          {error && <p className="text-danger text-center">{error}</p>}
          {loading && universities.length === 0 && (
            <div className="text-center py-4">
              <div className="spinner-border text-primary"></div>
            </div>
          )}
          {!loading && universities.length === 0 && (
            <p className="text-center text-secondary fs-5">No universities found.</p>
          )}

          {/* UNIVERSITY CARDS */}
          <div className="row g-4">
            {universities.map((uni) => {
              const thumbnail = uni.thumbnail
                ? `https://adminpanel.study2uni.com/storage/${uni.thumbnail}`
                : fallbackImage;

              const location = uni.main_branch
                ? `${uni.main_branch.city}, ${uni.main_branch.country}`
                : "Location unavailable";

              return (
                <div className="col-12 col-md-6 col-lg-4" key={uni.id}>
                  <div className="uni-card">
                    <img
                      src={thumbnail}
                      className="uni-image"
                      alt={uni.name}
                      onError={(e) => (e.target.src = fallbackImage)}
                    />
                    <div className="uni-content">
                      <h5 className="uni-title">{uni.name}</h5>
                      <p className="uni-location">
                        <i className="bi bi-geo-alt-fill"></i> {location}
                      </p>
                      <p className="uni-about line-clamp">{uni.about}</p>
                      <a href={`/universities/${uni.slug}`} className="btn details-btn">
                        View Details
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* LOAD MORE */}
          {hasNextPage && universities.length > 0 && (
            <div className="text-center mt-4">
              <button
                className="btn load-more-btn"
                onClick={handleLoadMore}
                disabled={loading}
              >
                {loading ? "Loading..." : "Load More"}
              </button>
            </div>
          )}
        </div>

        {/* STYLES */}
        <style>{`
          .uni-wrapper { background: #f8fafc; padding-bottom: 40px; }
          .directory-header { background: #DCF1FF; padding: 70px 20px 110px; border-radius: 0 0 40px 40px; color: #1d3557; }
          .header-title { font-size: 42px; font-weight: 800; }
          .header-subtitle { font-size: 18px; opacity: 0.8; margin-top: 10px; }
          .search-bar { background: white; padding: 15px; border-radius: 12px; box-shadow: 0 4px 20px rgba(0,0,0,0.08); width: 100%; max-width: 550px; margin-bottom: 40px; transform: translateY(-40px); }
          .search-input { height: 46px; font-size: 16px; }
          .search-btn { background: #2F74AB; border: none; padding: 0 25px; font-weight: 600; color: #fff; }
          .search-btn:hover { background: #266290; color: #fff; }
          .uni-card { background: #fff; border-radius: 16px; overflow: hidden; border: 1px solid #e5e7eb; transition: 0.3s ease; display: flex; flex-direction: column; height: 100%; }
          .uni-card:hover { transform: translateY(-5px); box-shadow: 0 12px 25px rgba(0,0,0,0.15); }
          .uni-image { width: 100%; height: 220px; object-fit: cover; }
          .uni-content { padding: 18px; display: flex; flex-direction: column; flex: 1; }
          .uni-title { font-weight: 700; font-size: 20px; margin-bottom: 6px; }
          .uni-location { color: #2F74AB; font-size: 14px; margin-bottom: 10px; }
          .line-clamp { display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; color: #6b7280; font-size: 14px; }
          .details-btn { background: #2F74AB; color: white; font-weight: 600; margin-top: auto; border-radius: 8px; padding: 10px; width: 100%; text-align:center; text-decoration:none; }
          .details-btn:hover { background: #266290; color: #fff; }
          .load-more-btn { border: 2px solid #2F74AB; color: #2F74AB; font-weight: 600; padding: 10px 26px; border-radius: 8px; }
          .load-more-btn:hover { background: #2F74AB; color: white; }
        `}</style>
      </div>
      <Footer />
    </>
  );
}
