import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const fallbackImage = 'https://via.placeholder.com/400x200?text=No+Image';

const Universitiessec = () => {
  const [universities, setUniversities] = useState([]);

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('https://adminpanel.study2uni.com/api/universities');
        const data = await response.json();
        if (data.success) {
          setUniversities(data.data.slice(0, 4)); // first 4 universities
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchUniversities();
  }, []);

  if (!universities.length) return <div className="text-center py-5">Loading...</div>;

  return (
    <section className="container py-5">
      <div className="text-center mb-5">
        <h2 className="fw-bold">Top Universities</h2>
        <p className="text-secondary">Explore some of the best universities available.</p>
      </div>

      <div className="row g-4">
        {universities.map((uni) => {
          const thumbnail = uni.thumbnail
            ? `https://adminpanel.study2uni.com/storage/${uni.thumbnail}`
            : fallbackImage;
          const location = uni.main_branch
            ? `${uni.main_branch.city}, ${uni.main_branch.country}`
            : 'Location not available';

          return (
            <div key={uni.id} className="col-12 col-md-6 col-lg-3">
              <div className="university-card border rounded shadow-sm overflow-hidden h-100">
                <img
                  src={thumbnail}
                  alt={uni.name}
                  className="w-100"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="p-3 d-flex flex-column justify-content-between h-100">
                  <div>
                    <h5 className="mb-1">{uni.name}</h5>
                    <p className="text-secondary mb-2" style={{ fontSize: '0.9rem' }}>{location}</p>
                  </div>
                  <a href="/universities" className="btn btn-primary mt-2 w-100">
                    View All Universities
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <style jsx>{`
        .university-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.08);
          transition: 0.3s ease;
        }
      `}</style>
    </section>
  );
};

export default Universitiessec;
