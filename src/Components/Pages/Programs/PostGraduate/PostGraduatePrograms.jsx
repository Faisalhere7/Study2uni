import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PostGraduatePrograms() {
  const [programs, setPrograms] = useState([]);
  const [filters, setFilters] = useState({
    universities: [],
    fields_of_study: [],
    durations: [],
  });

  const [search, setSearch] = useState("");
  const [uni, setUni] = useState("all");
  const [field, setField] = useState("all");
  const [duration, setDuration] = useState("all");

  const [page, setPage] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Load Filters
  const loadFilters = async () => {
    try {
      const res = await fetch(
        "https://adminpanel.study2uni.com/api/programs/filters"
      );
      const data = await res.json();

      if (data.success) {
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

  // Load Programs
  const loadPrograms = async (reset = false) => {
    if (loading || (!hasNextPage && !reset)) return;
    setLoading(true);
    setError("");

    try {
      const params = new URLSearchParams({
        perPage: 18,
        page: reset ? 1 : page,
      });

      if (search.trim() !== "") params.append("query", search);
      if (uni !== "all") params.append("university_id", uni);
      if (field !== "all") params.append("field_of_study_id", field);
      if (duration !== "all") params.append("duration_id", duration);

      params.append("program_level_id", 2); // Postgraduate

      const res = await fetch(
        `https://adminpanel.study2uni.com/api/programs?${params}`
      );
      const data = await res.json();

      if (data.success) {
        setPrograms((prev) => (reset ? data.data : [...prev, ...data.data]));
        setHasNextPage(data.next_page);
        setPage((p) => (reset ? 2 : p + 1));
      } else {
        setError("Failed to load programs.");
      }
    } catch (err) {
      setError("Error fetching programs.");
    }

    setLoading(false);
  };

  // Init on mount
  useEffect(() => {
    loadFilters();
    loadPrograms(true);
  }, []);

  // Fetch when filters update
  useEffect(() => {
    loadPrograms(true);
  }, [search, uni, field, duration]);

  const viewDetails = (slug) => {
    window.location.href = `/program-details/${slug}`;
  };

  return (
    <div className="container py-5">

      {/* Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold display-6">Postgraduate Programs</h1>
        <p className="text-muted">
          Explore top postgraduate programs for advanced studies.
        </p>
      </div>

      {/* Search + Filters */}
      <div className="bg-white p-4 rounded shadow-sm mb-4">
        <div className="row g-3">

          {/* Search */}
          <div className="col-lg-4 col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Search programs..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* University */}
          <div className="col-lg-2 col-md-6">
            <select
              className="form-select"
              value={uni}
              onChange={(e) => setUni(e.target.value)}
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
          <div className="col-lg-2 col-md-6">
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
          <div className="col-lg-2 col-md-6">
            <select
              className="form-select"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
            >
              <option value="all">All Durations</option>
              {filters.durations.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

        </div>
      </div>

      {/* Error */}
      {error && <p className="text-danger text-center">{error}</p>}

      {/* Program Cards */}
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
                  <span className="fw-semibold">Level:</span>{" "}
                  {p.program_level?.name || "Not specified"}
                </p>

                <p className="mb-1">
                  <span className="fw-semibold">Field:</span>{" "}
                  {p.field_of_study?.name || "Not specified"}
                </p>

                <p className="mb-3">
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

      {/* Loading */}
      {loading && (
        <div className="text-center mt-4">
          <div className="spinner-border"></div>
        </div>
      )}

      {/* Load More */}
      {!loading && hasNextPage && (
        <div className="text-center mt-4">
          <button
            className="btn px-4"
            style={{
              borderColor: "#2F74AB",
              color: "#2F74AB",
              fontWeight: "500",
            }}
            onClick={() => loadPrograms()}
          >
            Load More
          </button>
        </div>
      )}

      {/* Empty */}
      {!loading && programs.length === 0 && (
        <p className="text-center text-muted mt-4">
          No programs found.
        </p>
      )}

    </div>
  );
}
