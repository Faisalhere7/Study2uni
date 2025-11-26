import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Container,
  Card,
  Form,
  Button,
  InputGroup,
  Row,
  Col,
} from 'react-bootstrap';
import {
  FaArrowLeft,
  FaEye,
  FaEyeSlash,
  FaSpinner
} from 'react-icons/fa';

// 1. Import react-toastify components and CSS
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the primary color (Study2Uni blue) from the original CSS
const primaryColor = '#2F74AB';
const borderColor = 'hsl(214.3, 31.8%, 91.4%)';
const foregroundColor = 'hsl(222.2, 84%, 4.9%)';
const mutedColor = 'hsl(215.4, 16.3%, 46.9%)';
const destructiveColor = 'hsl(0, 84.2%, 60.2%)';

/**
 * Custom CSS for the Signup Form.
 * This styles the component to look like the original design while using Bootstrap's structure.
 * Note: Styles specific to the custom Notification component have been removed.
 */
const customStyles = `
  .signup-background {
    background-color: hsl(220, 14.3%, 95.9%);
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  /* Mimic the subtle animated background */
  .animated-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    background: linear-gradient(135deg,
        hsl(220, 14.3%, 95.9%) 0%,
        hsl(220, 14.3%, 97%) 25%,
        hsl(220, 14.3%, 98%) 50%,
        hsl(220, 14.3%, 96%) 75%,
        hsl(220, 14.3%, 95.9%) 100%);
    background-size: 400% 400%;
    animation: gradientShift 20s ease-in-out infinite;
  }

  @keyframes gradientShift {
    0%, 100% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
  }

  @media (prefers-reduced-motion: reduce) {
    .animated-bg { animation: none; background: hsl(220, 14.3%, 95.9%); }
  }

  /* Card styling */
  .custom-card {
    border-radius: 12px;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    border: none;
    max-width: 448px; /* max-w-md */
    width: 100%;
    margin: auto;
  }

  /* Input styling */
  .form-control:focus {
    border-color: ${primaryColor};
    box-shadow: 0 0 0 0.2rem rgba(47, 116, 171, 0.25); /* Primary color with transparency */
  }

  /* Primary Button styling */
  .btn-primary-custom {
    background-color: ${primaryColor};
    border-color: ${primaryColor};
    color: white;
    font-weight: 500;
    transition: all 0.2s ease;
  }

  .btn-primary-custom:hover:not(:disabled) {
    background-color: #1F4485; /* Darker shade on hover */
    border-color: #1F4485;
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.05);
  }

  .btn-primary-custom:focus {
    box-shadow: 0 0 0 0.25rem rgba(47, 116, 171, 0.5);
  }

  .btn-primary-custom:disabled {
    opacity: 0.5;
  }

  /* Error state styling */
  .is-invalid {
    border-color: ${destructiveColor} !important;
  }

  .invalid-feedback {
    color: ${destructiveColor};
  }

  /* Text colors */
  .text-primary-custom {
    color: ${primaryColor} !important;
  }
  .text-foreground {
    color: ${foregroundColor} !important;
  }
  .text-muted-custom {
    color: ${mutedColor} !important;
  }
  .link-custom {
    color: ${primaryColor};
    font-weight: 500;
  }
  .link-custom:hover {
    color: #1F4485;
  }

  /* Checkbox styling */
  .form-check-input:checked {
    background-color: ${primaryColor};
    border-color: ${primaryColor};
  }
  .form-check-input:focus {
    box-shadow: 0 0 0 0.25rem rgba(47, 116, 171, 0.25);
  }
  
  /* Style customization for react-toastify */
  .Toastify__toast--success {
    border-left: 4px solid ${primaryColor} !important;
  }
  .Toastify__toast--error {
    border-left: 4px solid #ef4444 !important;
  }
  .Toastify__toast--warning {
    border-left: 4px solid #f59e0b !important;
  }
  .Toastify__toast {
    border-radius: 8px !important;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1) !important;
    padding: 14px 18px !important;
    min-height: auto !important;
  }
`;

/**
 * Main Signup Form Component
 */
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [overlayText, setOverlayText] = useState('');

  const API_URL = 'https://adminpanel.study2uni.com/api/student/register';

  // **The showNotification utility remains correct for toast triggering**
  const showNotification = (message, type = 'success') => {
    const options = {
      position: "top-right",
      autoClose: 2000, // Set to 2 seconds as requested
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    };

    switch (type) {
      case 'success':
        toast.success(message, options);
        break;
      case 'danger':
      case 'error': // Use 'error' for toastify
        toast.error(message, options);
        break;
      case 'warning':
        toast.warn(message, options);
        break;
      default:
        toast.info(message, options);
    }
  };

  /**
    * Utility to display/hide the full-screen loading overlay.
    */
  const showLoadingOverlay = (show, message = "Loading...") => {
    setOverlayText(message);
    setShowOverlay(show);
  };

  /**
    * Handles input changes and updates form data state.
    */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    // Clear error for the field being edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  /**
    * Client-side form validation.
    */
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.fullName.trim()) {
      formErrors.fullName = 'Please enter your full name';
      isValid = false;
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      formErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.password.trim() || formData.password.length < 8) {
      formErrors.password = 'Password must be at least 8 characters';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    if (!formData.terms) {
      formErrors.terms = 'Please accept the terms and conditions';
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  /**
    * Handles form submission. (UPDATED)
    */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isProcessing) return;

    if (!validateForm()) {
      // 🐛 Show a toast for client-side validation failure
      showNotification('Please correct the errors below and try again.', 'error');
      return;
    }

    setIsProcessing(true);

    try {
      const response = await axios.post(API_URL, {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
        password_confirmation: formData.confirmPassword,
      });

      // API success handling
      if (response.status === 200 && response.data.status === 'success') {
        // ✅ Show SUCCESS toast
        showNotification(
          response.data.message || 'Account created successfully! Redirecting to sign in.',
          'success'
        );

        // Clear form
        setFormData({ fullName: '', email: '', password: '', confirmPassword: '', terms: false });

        // 🚀 Redirect flow: Wait for the toast (2000ms) then show overlay and redirect
        setTimeout(() => {
          showLoadingOverlay(true, 'Redirecting to sign in...');
          setTimeout(() => {
            // **Redirect to /sign-in/ as requested**
            window.location.href = '/sign-in/'; 
          }, 1000); // Overlay visible for 1 second before redirect
        }, 2000); // Matches the autoClose duration of the toast

      } else {
        // ❌ Fallback for non-200 but controlled API response
        showNotification(response.data.message || 'Registration failed. Please try again.', 'error');
      }

    } catch (error) {
      // Axios error handling
      if (error.response && error.response.data) {
        if (error.response.data.errors) {
          // ❌ API Validation Errors (e.g., email already taken)
          const apiErrors = error.response.data.errors;
          let formErrors = {};
          let generalErrorMessage = 'Please correct the highlighted errors.';

          // Map API field names to form field names
          if (apiErrors.name) formErrors.fullName = apiErrors.name[0];
          if (apiErrors.email) formErrors.email = apiErrors.email[0];
          if (apiErrors.password) formErrors.password = apiErrors.password[0];

          setErrors(prev => ({ ...prev, ...formErrors }));
          showNotification(generalErrorMessage, 'error');
        } else if (error.response.data.message) {
          // ❌ API General Error message (e.g., Laravel's generic error)
          showNotification(error.response.data.message, 'error');
        } else {
          // ❌ API Unknown Error
          showNotification('An unexpected server error occurred.', 'error');
        }
      } else {
        // ❌ General error (network, server issues)
        console.error('Registration error:', error);
        showNotification('Network error. Please check your connection and try again.', 'error');
      }
    } finally {
      setIsProcessing(false);
      // Only hide overlay if it wasn't specifically shown for the redirect step
      if (!showOverlay) {
        showLoadingOverlay(false);
      }
    }
  };

  // The custom styles need to be injected into the DOM
  useEffect(() => {
    const styleTag = document.createElement('style');
    styleTag.innerHTML = customStyles;
    document.head.appendChild(styleTag);
    return () => {
      document.head.removeChild(styleTag);
    };
  }, []);

  return (
    <div className="signup-background">
      <div className="animated-bg"></div>
      
      {/* Back to Home Button */}
      <div className="position-fixed top-0 start-0 m-4 z-1">
        <a href="/"
          className="d-flex align-items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-lg border hover-shadow-xl transition-all duration-200 text-sm fw-medium text-muted-custom text-decoration-none"
          style={{ borderColor: borderColor }}>
          <FaArrowLeft className="text-primary-custom" />
          <span>Back to Home</span>
        </a>
      </div>

      {/* Loading Overlay */}
      {showOverlay && (
        <div className="loading-overlay" id="loadingOverlay" style={{
          position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 2000, flexDirection: 'column'
        }}>
          <FaSpinner className="loading-spinner text-primary-custom" style={{
            width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: `4px solid ${primaryColor}`,
            borderRadius: '50%', animation: 'spin 1s linear infinite', marginBottom: '16px'
          }} />
          <div className="loading-text fw-medium text-foreground">{overlayText}</div>
        </div>
      )}

      {/* 2. Toast Container - Placement for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={2000} // This is a fallback but explicitly set in showNotification
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Container className="d-flex justify-content-center align-items-center">
        <Card className="custom-card">
          <Card.Body className="p-0">
            {/* Header Section */}
            <div className="text-center pt-5 pb-4 px-4">
              {/* Note: The logo path is relative, ensure it exists or replace it. */}
              <span className="text-2xl fw-semibold text-foreground"><img src='/src/assets/cropped-logo.png' alt='Logo' style={{width:"50%", height:"50%"}}/></span>
              <p className="mt-2 text-sm text-muted-custom">
                Create your account to access educational resources
              </p>
            </div>

            {/* Form Content */}
            <div className="px-5 pb-5">
              <Form onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <Form.Group className="mb-3" controlId="fullName">
                  <Form.Label className="text-sm fw-medium text-foreground">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    placeholder="Enter your full name"
                    value={formData.fullName}
                    onChange={handleChange}
                    isInvalid={!!errors.fullName}
                    className="py-3 border"
                    style={{ borderColor: borderColor }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.fullName}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Email Field */}
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label className="text-sm fw-medium text-foreground">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    className="py-3 border"
                    style={{ borderColor: borderColor }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                {/* Password Field */}
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label className="text-sm fw-medium text-foreground">Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      placeholder="Create a strong password"
                      value={formData.password}
                      onChange={handleChange}
                      isInvalid={!!errors.password}
                      className="py-3 border"
                      style={{ borderColor: borderColor }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowPassword(prev => !prev)}
                      className="border-start-0"
                      style={{ borderLeft: 'none', borderColor: borderColor, color: mutedColor }}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                    <Form.Control.Feedback type="invalid" className="d-block w-100">
                      {errors.password}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Confirm Password Field */}
                <Form.Group className="mb-3" controlId="confirmPassword">
                  <Form.Label className="text-sm fw-medium text-foreground">Confirm Password</Form.Label>
                  <InputGroup>
                    <Form.Control
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      isInvalid={!!errors.confirmPassword}
                      className="py-3 border"
                      style={{ borderColor: borderColor }}
                    />
                    <Button
                      variant="outline-secondary"
                      onClick={() => setShowConfirmPassword(prev => !prev)}
                      className="border-start-0"
                      style={{ borderLeft: 'none', borderColor: borderColor, color: mutedColor }}
                    >
                      {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                    </Button>
                    <Form.Control.Feedback type="invalid" className="d-block w-100">
                      {errors.confirmPassword}
                    </Form.Control.Feedback>
                  </InputGroup>
                </Form.Group>

                {/* Terms and Conditions */}
                <Form.Group className="mb-3 pt-2" controlId="terms">
                  <Form.Check
                    type="checkbox"
                    label={
                      <span className="text-sm text-muted-custom">
                        I agree to the
                        <a href="/terms-and-conditions/" target="_blank" className="link-custom ms-1 me-1 text-decoration-none">
                          Terms and Conditions
                        </a>
                        and
                        <a href="/privacy-policy/" target="_blank" className="link-custom ms-1 text-decoration-none">
                          Privacy Policy
                        </a>
                      </span>
                    }
                    name="terms"
                    checked={formData.terms}
                    onChange={handleChange}
                    isInvalid={!!errors.terms}
                  />
                  <div className="invalid-feedback d-block" style={{ display: errors.terms ? 'block' : 'none' }}>
                    {errors.terms}
                  </div>
                </Form.Group>

                {/* Submit Button */}
                <div className="pt-3">
                  <Button
                    type="submit"
                    className="w-100 py-2 btn-primary-custom d-flex justify-content-center align-items-center"
                    disabled={isProcessing}
                  >
                    {isProcessing && (
                      <FaSpinner className="me-2" style={{ animation: 'spin 1s linear infinite' }} />
                    )}
                    {isProcessing ? 'Creating Account...' : 'Sign Up'}
                  </Button>
                </div>
              </Form>

              {/* Sign In Link */}
              <div className="text-center pt-4 mt-4 border-top" style={{ borderColor: borderColor }}>
                <p className="text-sm text-muted-custom">
                  Already have an account?
                  <a href="/sign-in/" className="link-custom ms-1 text-decoration-none">Sign in</a>
                </p>
              </div>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;