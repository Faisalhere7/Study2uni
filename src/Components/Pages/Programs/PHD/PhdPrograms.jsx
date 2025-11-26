import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PhDPrograms() {
  const [programs, setPrograms] = useState([]);
  const [filters, setFilters] = useState({
    universities: [],
    fields_of_study: [],
    durations: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);

  const [search, setSearch] = useState("");
  const [university, setUniversity] = useState("all");
  const [field, setField] = useState("all");
  const [duration, setDuration] = useState("all");

  // Fetch Filters
  useEffect(() => {
    fetchFilters();
  }, []);

  const fetchFilters = async () => {
    try {
      const res = await fetch(
        `https://adminpanel.study2uni.com/api/programs/filters`
      );
      const data = await res.json();
      if (data.success && data.data) {
        setFilters({
          universities: data.data.universities,
          fields_of_study: data.data.fields_of_study,
          durations: data.data.durations,
        });
      }
    } catch (err) {
      setError("Failed to load filters.");
    }
  };

  // Fetch Programs (PhD)
  useEffect(() => {
    loadPrograms(1, true);
  }, [search, university, field, duration]);

  const loadPrograms = async (pageNumber = 1, reset = false) => {
    if (loading) return;

    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        perPage: 18,
        page: pageNumber,
        program_level_id: 3 // <-- ensure this is PhD / Research level
      });

      if (search.trim()) params.append("query", search.trim());
      if (university !== "all") params.append("university_id", university);
      if (field !== "all") params.append("field_of_study_id", field);
      if (duration !== "all") params.append("duration_id", duration);

      const res = await fetch(
        `https://adminpanel.study2uni.com/api/programs?${params.toString()}`
      );
      const data = await res.json();

      if (data.success) {
        setPrograms(reset ? data.data : [...programs, ...data.data]);
        setHasNextPage(data.next_page);
        setPage(pageNumber + 1);
      } else {
        setError("Failed to load programs.");
      }
    } catch (err) {
      setError("Error fetching programs.");
    }

    setLoading(false);
  };

  // View Details
  const viewDetails = (slug) => {
    sessionStorage.setItem("selectedProgramSlug", slug);
    window.location.href = "/program-details";
  };

  return (
    <div className="container py-5">
      {/* HEADER */}
      <div className="text-center mb-4">
        <h1 className="fw-bold display-6">PhD / Research Programs</h1>
        <p className="text-muted">
          Explore advanced research & PhD programs.
        </p>
      </div>

      {/* SEARCH + FILTERS */}
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <div className="row g-3">
          {/* Search */}
          <div className="col-md-4">
            <input
              type="text"
              className="form-control"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* University */}
          <div className="col-md-2">
            <select
              className="form-select"
              value={university}
              onChange={(e) => setUniversity(e.target.value)}
            >
              <option value="all">All Universities</option>
              {filters.universities.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name}
                </option>
              ))}
            </select>
          </div>

          {/* Field */}
          <div className="col-md-2">
            <select
              className="form-select"
              value={field}
              onChange={(e) => setField(e.target.value)}
            >
              <option value="all">All Fields</option>
              {filters.fields_of_study.map((f) => (
                <option key={f.id} value={f.id}>
                  {f.name}
                </option>
              ))}
            </select>
          </div>

          {/* Duration */}
          <div className="col-md-2">
            <select
              className="form-select"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="all">All Durations</option>
              {filters.durations?.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* ERROR */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* PROGRAM GRID */}
      <div className="row g-4">
        {programs.map((p) => (
          <div className="col-md-4" key={p.slug}>
            <div
              className="card h-100 border-0 rounded-4 p-3"
              style={{
                backgroundColor: "#EFF6FF",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onClick={() => viewDetails(p.slug)}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-4px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <div className="card-body d-flex flex-column">

                <h5 className="fw-bold text-dark" style={{ minHeight: "48px" }}>
                  {p.name}
                </h5>

                <p className="text-muted small mb-2">{p.university?.name}</p>

                <p className="mb-1">
                  <span className="fw-semibold">Duration:</span>{" "}
                  {p.duration?.name}
                </p>

                <p className="mb-1">
                  <span className="fw-semibold">Field:</span>{" "}
                  {p.field_of_study?.name}
                </p>

                <p className="mb-1">
                  <span className="fw-semibold">Language:</span>{" "}
                  {p.language || "Not specified"}
                </p>

                <div className="mt-auto">
                  <button
                    className="btn w-100"
                    style={{
                      backgroundColor: "#2F74AB",
                      color: "white",
                      fontWeight: "500",
                      borderRadius: "10px",
                    }}
                  >
                    Learn More
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* LOADING */}
      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border"></div>
        </div>
      )}

      {/* LOAD MORE */}
      {!loading && hasNextPage && (
        <div className="text-center mt-4">
          <button
            className="btn px-4"
            style={{
              borderColor: "#2F74AB",
              color: "#2F74AB",
              fontWeight: "500",
            }}
            onClick={() => loadPrograms(page)}
          >
            Load More
          </button>
        </div>
      )}

      {/* EMPTY */}
      {!loading && programs.length === 0 && (
        <p className="text-center text-muted mt-4">No programs found.</p>
      )}
    </div>
  );
}
