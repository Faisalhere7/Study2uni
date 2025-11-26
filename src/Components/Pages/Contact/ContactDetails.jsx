import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VALIDATION FUNCTION
  const validate = () => {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(form.email)) return "Enter a valid email";

    if (!form.phone.trim()) return "Phone number is required";
    if (form.phone.length < 7) return "Phone number is too short";

    if (!form.subject.trim()) return "Subject is required";
    if (!form.message.trim()) return "Message is required";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const error = validate();
    if (error) {
      toast.error(error, { position: "top-right" });
      return;
    }

    try {
      setLoading(true);

      // 👉 CHANGE THIS API URL
      const response = await axios.post("https://your-api-url.com/contact", form);

      toast.success("Your message has been sent successfully!", {
        position: "top-right",
      });

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      toast.error("Something went wrong. Try again!", {
        position: "top-right",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-5" style={{ backgroundColor: "#F8FBFF" }}>
      {/* Toast Container */}
      <ToastContainer />

      <style>{`
        .contact-wrapper {
          max-width: 1200px;
          margin: 0 auto;
        }
        .contact-card {
          background: #EDF5FF;
          padding: 35px;
          border-radius: 12px;
          box-shadow: 0px 4px 15px rgba(0,0,0,0.08);
        }
        .form-label {
          font-weight: 600;
          color: #1F2A37;
          font-size: 14px;
        }
        .form-control {
          border-radius: 8px;
          padding: 12px;
          font-size: 15px;
          border: 1px solid #D1D9E6;
        }
        .form-control:focus {
          border-color: #3B82F6;
          box-shadow: 0 0 0 0.14rem rgba(59,130,246,0.25);
        }
        .submit-btn {
          background-color: #2E6CC5;
          color: #fff;
          font-weight: 600;
          padding: 12px;
          border-radius: 8px;
          font-size: 16px;
          border: none;
          width: 100%;
        }
        .submit-btn:hover {
          background-color: #2559A8;
        }
        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        .info-title {
          font-size: 20px;
          font-weight: 700;
          color: #1F2A37;
          margin-bottom: 6px;
        }
        .info-text {
          color: #4B5563;
          font-size: 15px;
          margin-bottom: 2px;
          line-height: 1.6;
        }
        .info-block { margin-bottom: 25px; }
        .icon-box {
          width: 45px;
          height: 45px;
          background-color: #E7F1FF;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          margin-right: 15px;
        }
        @media (max-width: 768px) {
          .contact-card { margin-bottom: 30px; }
        }
      `}</style>

      <div className="container contact-wrapper">
        <div className="row g-4">
          
          {/* LEFT FORM */}
          <div className="col-lg-7">
            <div className="contact-card">
              <h3 className="mb-2" style={{ fontWeight: 700, color: "#1F2A37" }}>
                Send Us a Message
              </h3>
              <p className="mb-4" style={{ color: "#4B5563", fontSize: "15px" }}>
                Fill out the form below and we'll get back to you within 24 hours.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="row g-3">

                  <div className="col-md-6">
                    <label className="form-label">Full Name</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="col-md-6">
                    <label className="form-label">Email</label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Phone Number</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Subject</label>
                    <input
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="form-control"
                      placeholder="Enter subject"
                    />
                  </div>

                  <div className="col-md-12">
                    <label className="form-label">Message</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      className="form-control"
                      rows="4"
                      placeholder="Tell us about your goals, questions, or how we can help you..."
                    ></textarea>
                  </div>
                </div>

                <button className="submit-btn mt-4" disabled={loading}>
                  {loading ? "Sending..." : "Send Message →"}
                </button>
              </form>
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="col-lg-5 ps-lg-4">
            <div className="info-block d-flex">
              <div className="icon-box">
                <MapPin size={22} color="#2E6CC5" />
              </div>
              <div>
                <h4 className="info-title">Visit Our Office</h4>
                <p className="info-text">32 Bellegrove Road</p>
                <p className="info-text">London DA16 3PY</p>
                <p className="info-text">United Kingdom</p>
              </div>
            </div>

            <div className="info-block d-flex">
              <div className="icon-box">
                <Phone size={22} color="#2E6CC5" />
              </div>
              <div>
                <h4 className="info-title">Call Us</h4>
                <p className="info-text">+442080732188</p>
                <p className="info-text">WhatsApp: +44 2080 732188</p>
              </div>
            </div>

            <div className="info-block d-flex">
              <div className="icon-box">
                <Mail size={22} color="#2E6CC5" />
              </div>
              <div>
                <h4 className="info-title">Email Us</h4>
                <p className="info-text">info@study2uni.com</p>
              </div>
            </div>

            <div className="info-block d-flex">
              <div className="icon-box">
                <Clock size={22} color="#2E6CC5" />
              </div>
              <div>
                <h4 className="info-title">Office Hours</h4>
                <p className="info-text">Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p className="info-text">Saturday: 10:00 AM - 4:00 PM</p>
                <p className="info-text">Sunday: Closed</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
