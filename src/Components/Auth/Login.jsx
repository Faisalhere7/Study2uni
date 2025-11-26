import React, { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
// Assuming Font Awesome 6 is available globally or imported separately

// --- Configuration ---
const BASE_URL = 'https://api.example.com/v1/auth/'; // Replace with your actual base URL
const SIGNIN_ENDPOINT = `${BASE_URL}login`;
const FORGOT_EMAIL_ENDPOINT = `${BASE_URL}forgot-password-email`; // API to send code
const VERIFY_CODE_ENDPOINT = `${BASE_URL}verify-password-code`; // API to verify code
const RESET_PASSWORD_ENDPOINT = `${BASE_URL}reset-password`; // API to reset password

// Global variable to temporarily store the verification code for the reset step
let verificationCode = '';

const Notification = ({ message, type, title, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const typeMap = {
    success: { icon: 'fa-check-circle', color: '#2F74AB' },
    error: { icon: 'fa-exclamation-circle', color: '#ef4444' },
    warning: { icon: 'fa-exclamation-triangle', color: '#f59e0b' },
  };

  const { icon, color } = typeMap[type] || typeMap.success;

  return (
    <div className={`notification show ${type}`} style={{ borderLeftColor: color }} onClick={onClose}>
      <i className={`fas ${icon} notification-icon`} style={{ color }}></i>
      <div className="notification-content">
        <div className="notification-title">{title}</div>
        <div className="notification-message">{message}</div>
        <div className="notification-message text-xs mt-1" style={{color: '#94a3b8'}}>Click to dismiss</div>
      </div>
      <button type="button" className="notification-close" onClick={onClose}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

// --- Main Component ---
const Login = () => {
  // --- Sign In State ---
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingSignIn, setIsProcessingSignIn] = useState(false);
  const [errors, setErrors] = useState({});
  const [notifications, setNotifications] = useState([]);

  // --- Forgot Password State (Modal) ---
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [resetStep, setResetStep] = useState(1); // 1: Email, 2: PIN, 3: New Password
  const [resetEmail, setResetEmail] = useState('');
  const [pinCode, setPinCode] = useState(['', '', '', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const pinRefs = useRef([]);

  // --- Helpers ---

  const showToast = useCallback((title, message, type = 'success') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, title, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  }, []);

  const validateForm = (isLogin = true, currentEmail = email, currentPassword = password) => {
    const newErrors = {};
    if (!currentEmail || !/\S+@\S+\.\S+/.test(currentEmail)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (isLogin && (!currentPassword || currentPassword.length < 6)) {
      newErrors.password = 'Password must be at least 6 characters.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearAuthStorage = () => {
    const keysToClear = ['auth_token', 'token_type', 'user_data', 'recentSignIn'];
    [localStorage, sessionStorage].forEach(storage => {
      keysToClear.forEach(key => storage.removeItem(key));
    });
  };

  // --- Handlers ---

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (isProcessingSignIn) return;

    if (!validateForm(true)) return;

    setIsProcessingSignIn(true);
    setIsLoading(true);

    try {
      // Simulate API call to sign in
      const response = await axios.post(SIGNIN_ENDPOINT, {
        email,
        password,
      });

      const { token, token_type, user } = response.data.data;
      const storage = rememberMe ? localStorage : sessionStorage;

      // Store tokens and user data
      storage.setItem('auth_token', token);
      storage.setItem('token_type', token_type);
      storage.setItem('user_data', JSON.stringify(user));
      storage.setItem('recentSignIn', Date.now());

      showToast('Sign In Successful', 'You have been successfully logged in!', 'success');
      
      // Navigate to dashboard-home as requested
      setTimeout(() => {
        window.location.href = '/dashboard-home'; 
      }, 1000);

    } catch (error) {
      clearAuthStorage();
      const message = error.response?.data?.message || 'An unexpected error occurred during sign-in.';
      showToast('Sign In Failed', message, 'error');
    } finally {
      setIsProcessingSignIn(false);
      setIsLoading(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    // Reset modal state when opening
    setResetStep(1);
    setResetEmail('');
    setPinCode(['', '', '', '', '', '']);
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    verificationCode = ''; // Reset the global code
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePinChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    const newPin = [...pinCode];
    newPin[index] = value.slice(0, 1);
    setPinCode(newPin);

    // Auto-focus logic
    if (value && index < pinRefs.current.length - 1) {
      pinRefs.current[index + 1]?.focus();
    } else if (!value && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handleSendCode = async (e) => {
    e.preventDefault();
    if (modalLoading) return;

    const emailIsValid = /\S+@\S+\.\S+/.test(resetEmail);
    if (!emailIsValid) {
        showToast('Invalid Input', 'Please enter a valid email address.', 'warning');
        return;
    }

    setModalLoading(true);
    try {
      // API call to send verification code
      await axios.post(FORGOT_EMAIL_ENDPOINT, { email: resetEmail });
      
      setResetStep(2); // Move to PIN step
      showToast('Code Sent', `A verification code has been sent to ${resetEmail}.`, 'success');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to send code. Please try again.';
      showToast('Error', message, 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    if (modalLoading) return;
    
    const code = pinCode.join('');
    if (code.length !== 6) {
        showToast('Invalid Code', 'Please enter the complete 6-digit code.', 'warning');
        return;
    }

    setModalLoading(true);
    try {
      // API call to verify the code
      const response = await axios.post(VERIFY_CODE_ENDPOINT, { 
          email: resetEmail, 
          code 
      });

      // Assuming success means the code is valid
      verificationCode = code; // Store code globally for final reset
      setResetStep(3); // Move to New Password step
      showToast('Code Verified', 'Verification successful. You can now reset your password.', 'success');
    } catch (error) {
      const message = error.response?.data?.message || 'Invalid verification code or expired.';
      showToast('Verification Failed', message, 'error');
    } finally {
      setModalLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (modalLoading) return;

    if (newPassword.length < 8) {
        showToast('Password Error', 'New password must be at least 8 characters.', 'warning');
        return;
    }
    if (newPassword !== confirmPassword) {
        showToast('Password Error', 'New password and confirmation do not match.', 'warning');
        return;
    }
    if (!verificationCode) {
        showToast('Error', 'Verification code missing. Please restart the process.', 'error');
        return;
    }

    setModalLoading(true);
    try {
      // API call to reset the password
      await axios.post(RESET_PASSWORD_ENDPOINT, {
        email: resetEmail,
        code: verificationCode, // Use the stored verification code
        new_password: newPassword,
        confirm_password: confirmPassword,
      });

      showToast('Password Reset', 'Your password has been successfully reset. Please sign in.', 'success');
      closeModal();
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to reset password. Please try again.';
      showToast('Reset Failed', message, 'error');
    } finally {
      setModalLoading(false);
    }
  };


  // --- Render Functions ---

  const renderEmailStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(47, 116, 171, 0.1)' }}>
          <i className="fas fa-envelope fa-2x" style={{ color: '#2F74AB' }}></i>
        </div>
        <h4 className="h5 fw-medium mb-2" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>Enter Your Email</h4>
        <p className="text-sm text-muted">We'll send a 6-digit verification code to your email address</p>
      </div>

      <form onSubmit={handleSendCode} className="space-y-4">
        <div className="form-group space-y-2">
          <label htmlFor="resetEmail" className="form-label text-sm fw-medium" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>Email Address</label>
          <input
            type="email"
            id="resetEmail"
            placeholder="student@example.com"
            className="form-control form-control-lg custom-input-style"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            required
            disabled={modalLoading}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 btn-lg custom-btn-style d-flex align-items-center justify-content-center"
          disabled={modalLoading}
        >
          {modalLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          Send Verification Code
        </button>
      </form>
    </div>
  );

  const renderPinStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(47, 116, 171, 0.1)' }}>
          <i className="fas fa-shield-alt fa-2x" style={{ color: '#2F74AB' }}></i>
        </div>
        <h4 className="h5 fw-medium mb-2" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>Enter Verification Code</h4>
        <p className="text-sm text-muted">
          We've sent a 6-digit code to <span className="fw-medium">{resetEmail}</span>
        </p>
      </div>

      <form onSubmit={handleVerifyCode} className="space-y-4">
        <div className="form-group space-y-2">
          <label className="form-label text-sm fw-medium text-center w-100" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>Verification Code</label>
          <div className="d-flex justify-content-center gap-2">
            {pinCode.map((digit, index) => (
              <input
                key={index}
                ref={(el) => pinRefs.current[index] = el}
                type="text"
                className={`form-control pin-input ${digit ? 'filled' : ''}`}
                maxLength="1"
                value={digit}
                onChange={(e) => handlePinChange(e, index)}
                onKeyDown={(e) => {
                    // Backspace/Delete logic
                    if (e.key === 'Backspace' && !e.target.value && index > 0) {
                        pinRefs.current[index - 1]?.focus();
                    }
                }}
                required
                disabled={modalLoading}
                style={{ width: '45px', height: '45px', textAlign: 'center' }}
              />
            ))}
          </div>
        </div>

        <div className="text-center">
            <button type="button" onClick={handleSendCode} className="btn btn-link text-sm fw-medium p-0" style={{ color: '#2F74AB' }} disabled={modalLoading}>
                Didn't receive the code? Resend
            </button>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 btn-lg custom-btn-style d-flex align-items-center justify-content-center"
          disabled={modalLoading}
        >
          {modalLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          Verify Code
        </button>

        <div className="text-center">
          <button type="button" onClick={() => setResetStep(1)} className="btn btn-link text-sm fw-medium p-0 text-muted-foreground" disabled={modalLoading}>
            ← Back to email
          </button>
        </div>
      </form>
    </div>
  );

  const renderPasswordStep = () => (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <div className="d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '64px', height: '64px', borderRadius: '50%', backgroundColor: 'rgba(47, 116, 171, 0.1)' }}>
          <i className="fas fa-lock fa-2x" style={{ color: '#2F74AB' }}></i>
        </div>
        <h4 className="h5 fw-medium mb-2" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>Create New Password</h4>
        <p className="text-sm text-muted">Please enter your new password below</p>
        <p className="text-sm text-muted">Verification Code: <span className="fw-bold">{verificationCode}</span></p>
      </div>

      <form onSubmit={handleResetPassword} className="space-y-4">
        {/* New Password Field */}
        <div className="form-group space-y-2">
          <label htmlFor="newPassword" className="form-label text-sm fw-medium" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>New Password</label>
          <div className="input-group">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              placeholder="Enter new password (min 8 chars)"
              className="form-control form-control-lg custom-input-style"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              disabled={modalLoading}
            />
            <button
              type="button"
              className="btn input-group-text toggle-password-btn"
              onClick={() => setShowNewPassword(!showNewPassword)}
              style={{ backgroundColor: 'white', borderLeft: 'none' }}
              disabled={modalLoading}
            >
              <i className={`fas ${showNewPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: 'hsl(215.4, 16.3%, 46.9%)' }}></i>
            </button>
          </div>
        </div>

        {/* Confirm Password Field */}
        <div className="form-group space-y-2">
          <label htmlFor="confirmPassword" className="form-label text-sm fw-medium" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>Confirm New Password</label>
          <div className="input-group">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              placeholder="Confirm new password"
              className="form-control form-control-lg custom-input-style"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={modalLoading}
            />
            <button
              type="button"
              className="btn input-group-text toggle-password-btn"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              style={{ backgroundColor: 'white', borderLeft: 'none' }}
              disabled={modalLoading}
            >
              <i className={`fas ${showConfirmPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: 'hsl(215.4, 16.3%, 46.9%)' }}></i>
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100 btn-lg custom-btn-style d-flex align-items-center justify-content-center"
          disabled={modalLoading}
        >
          {modalLoading && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
          Reset Password
        </button>

        <div className="text-center">
          <button type="button" onClick={() => setResetStep(2)} className="btn btn-link text-sm fw-medium p-0 text-muted-foreground" disabled={modalLoading}>
            ← Back to verification
          </button>
        </div>
      </form>
    </div>
  );


  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center p-4 signIn-container">
      {/* Animated Background and Shapes (CSS defined below) */}
      <div className="animated-background"></div>
      <div className="floating-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
        <div className="shape shape-5"></div>
      </div>

      {/* Loading Overlay */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Processing...</div>
        </div>
      )}

      {/* Notification Container */}
      <div className="notification-container">
        {notifications.map(n => (
          <Notification
            key={n.id}
            title={n.title}
            message={n.message}
            type={n.type}
            onClose={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
          />
        ))}
      </div>

      {/* Back to Home Button */}
      <div className="position-fixed top-0 start-0 p-4" style={{ zIndex: 50 }}>
        <a href="/" className="btn btn-light d-flex align-items-center gap-2 p-2 shadow-sm back-home-btn" style={{ borderColor: 'hsl(214.3, 31.8%, 91.4%)' }}>
          <i className="fas fa-arrow-left text-sm" style={{ color: '#2F74AB' }}></i>
          <span className="d-none d-sm-inline">Back to Home</span>
        </a>
      </div>

      <div className="w-100" style={{ maxWidth: '450px' }}>
        {/* Main Form Container */}
        <div className="card shadow-lg border-0 rounded-xl overflow-hidden">
          {/* Header Section */}
          <div className="text-center pt-5 px-4 pb-4">
            <div className="mb-3">
              {/* --- Company Logo Placeholder --- */}
              <div className="logo-placeholder mx-auto mb-3">
                <span className="text-primary fw-bold">
                    {/* Placeholder image path adjusted for generic use */}
                    <img src='/logo-placeholder.png' alt='Company Logo' style={{width:"50%",height:"50%"}}/>
                </span>
              </div>
              {/* ---------------------------------- */}
              <p className="mt-2 text-sm text-muted-foreground">Sign in to access your educational resources</p>
            </div>
          </div>

          {/* Form Content */}
          <div className="px-4 pb-5 pt-1 space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              {/* Email Field */}
              <div className="form-group space-y-2">
                <label htmlFor="email" className="form-label text-sm fw-medium" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>Email Address</label>
                <input
                  type="email"
                  id="email"
                  placeholder="student@example.com"
                  className={`form-control form-control-lg custom-input-style ${errors.email ? 'is-invalid' : ''}`}
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setErrors(prev => ({ ...prev, email: null })); }}
                  disabled={isProcessingSignIn}
                  required
                />
                {errors.email && <div className="invalid-feedback text-xs mt-1">{errors.email}</div>}
              </div>

              {/* Password Field */}
              <div className="form-group space-y-2">
                <label htmlFor="password" className="form-label text-sm fw-medium" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>Password</label>
                <div className="input-group">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    placeholder="Enter your password"
                    className={`form-control form-control-lg custom-input-style ${errors.password ? 'is-invalid' : ''}`}
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setErrors(prev => ({ ...prev, password: null })); }}
                    disabled={isProcessingSignIn}
                    required
                  />
                  <button
                    type="button"
                    className="btn input-group-text toggle-password-btn"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ backgroundColor: 'white', borderLeft: 'none' }}
                    disabled={isProcessingSignIn}
                  >
                    <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`} style={{ color: 'hsl(215.4, 16.3%, 46.9%)' }}></i>
                  </button>
                </div>
                {errors.password && <div className="invalid-feedback text-xs mt-1">{errors.password}</div>}
              </div>

              {/* Remember Me and Forgot Password */}
              <div className="d-flex align-items-center justify-content-between pt-2">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ borderColor: 'hsl(214.3, 31.8%, 91.4%)' }}
                    disabled={isProcessingSignIn}
                  />
                  <label className="form-check-label text-sm text-muted-foreground" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="btn btn-link text-sm fw-medium p-0"
                  onClick={openModal}
                  style={{ color: '#2F74AB' }}
                  disabled={isProcessingSignIn}
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-primary w-100 btn-lg custom-btn-style d-flex align-items-center justify-content-center"
                  disabled={isProcessingSignIn}
                >
                  {isProcessingSignIn && <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>}
                  Sign In
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center pt-4 border-top" style={{ borderColor: 'hsl(214.3, 31.8%, 91.4%)' }}>
              <p className="text-sm text-muted-foreground">
                Don't have an account?
                <a href="/sign-up/" className="fw-medium hover-underline ms-1" style={{ color: '#2F74AB' }}>Sign up</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'show' : ''}`} onClick={(e) => e.target.classList.contains('modal-overlay') && closeModal()}>
        <div className="modal-content">
          <div className="d-flex align-items-center justify-content-between p-4 border-bottom" style={{ borderColor: 'hsl(214.3, 31.8%, 91.4%)' }}>
            <h5 className="h5 fw-semibold" style={{ color: 'hsl(222.2, 84%, 4.9%)' }}>Reset Password</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
          </div>
          <div className="p-4">
            {resetStep === 1 && renderEmailStep()}
            {resetStep === 2 && renderPinStep()}
            {resetStep === 3 && renderPasswordStep()}
          </div>
        </div>
      </div>

      <style jsx>{`
        /* Custom Colors (based on your Tailwind config) */
        :root {
          --color-primary: #2F74AB;
          --color-background: hsl(220, 14.3%, 95.9%);
          --color-foreground: hsl(222.2, 84%, 4.9%);
          --color-border: hsl(214.3, 31.8%, 91.4%);
          --color-muted-foreground: hsl(215.4, 16.3%, 46.9%);
          --color-destructive: hsl(0, 84.2%, 60.2%);
          --color-ring: #2F74AB;
        }

        /* General Styles */
        .signIn-container {
          background-color: var(--color-background);
        }

        .text-muted-foreground {
            color: var(--color-muted-foreground);
        }
        
        .hover-underline:hover {
            text-decoration: underline !important;
        }

        /* Input Custom Styling */
        .custom-input-style {
            border-color: var(--color-border) !important;
            background-color: white !important;
            color: var(--color-foreground) !important;
            border-radius: 0.5rem; /* 8px */
            padding: 0.75rem 1rem; /* py-3 px-4 */
            transition: all 0.2s ease;
        }
        .custom-input-style:focus {
            border-color: var(--color-primary) !important;
            box-shadow: 0 0 0 2px rgba(47, 116, 171, 0.125) !important; /* light ring */
        }
        .custom-input-style.is-invalid {
            border-color: var(--color-destructive) !important;
        }
        .invalid-feedback {
            display: block;
            color: var(--color-destructive);
        }
        
        /* PIN Input Specific Styles */
        .pin-input {
            font-size: 1.25rem;
            font-weight: 700;
            text-align: center;
            border: 1px solid var(--color-border) !important;
            border-radius: 0.5rem;
            transition: all 0.2s ease;
            caret-color: var(--color-primary); /* Show cursor */
        }
        .pin-input:focus {
            border-color: var(--color-primary) !important;
            box-shadow: 0 0 0 2px rgba(47, 116, 171, 0.125) !important;
        }
        .pin-input.filled {
            background-color: hsl(220, 14.3%, 97%) !important; /* Slight background change when filled */
        }

        /* Button Custom Styling */
        .custom-btn-style {
            background-color: var(--color-primary);
            color: white;
            border-color: var(--color-primary);
            border-radius: 0.5rem; /* 8px */
            box-shadow: 0 4px 6px rgba(47, 116, 171, 0.2);
            transition: all 0.2s ease;
            height: 44px; /* h-11 */
        }
        .custom-btn-style:hover:not(:disabled) {
            background-color: #1F4485; /* Darker shade */
            border-color: #1F4485;
            box-shadow: 0 6px 12px rgba(47, 116, 171, 0.3);
            transform: translateY(-1px);
        }
        .custom-btn-style:disabled {
            opacity: 0.6;
            cursor: not-allowed;
            box-shadow: none;
        }

        .toggle-password-btn {
            border-color: var(--color-border) !important;
            border-left: none !important;
        }
        .input-group > .form-control:not(:last-child) {
            border-right: none;
        }
        .input-group > .form-control:not(:last-child):focus {
            border-right-color: var(--color-primary) !important;
        }


        /* Logo Placeholder */
        .logo-placeholder {
            height: 40px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        /* Background Animations */
        .animated-background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: linear-gradient(135deg, var(--color-background) 0%, hsl(220, 14.3%, 97%) 25%, hsl(220, 14.3%, 98%) 50%, hsl(220, 14.3%, 96%) 75%, var(--color-background) 100%);
            background-size: 400% 400%;
            animation: gradientShift 20s ease-in-out infinite;
        }
        @keyframes gradientShift {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }

        .floating-shapes {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            overflow: hidden;
            pointer-events: none;
        }
        .shape {
            position: absolute;
            border-radius: 50%;
            background: linear-gradient(45deg, hsla(205, 61%, 42%, 0.03), hsla(205, 61%, 42%, 0.01));
            animation: float 25s infinite linear;
        }
        .shape-1 { width: 120px; height: 120px; top: 20%; left: 10%; animation-delay: 0s; animation-duration: 30s; }
        .shape-2 { width: 80px; height: 80px; top: 60%; right: 15%; animation-delay: -8s; animation-duration: 25s; }
        .shape-3 { width: 60px; height: 60px; top: 80%; left: 20%; animation-delay: -15s; animation-duration: 35s; }
        .shape-4 { width: 100px; height: 100px; top: 10%; right: 25%; animation-delay: -20s; animation-duration: 28s; }
        .shape-5 { width: 40px; height: 40px; top: 40%; left: 5%; animation-delay: -12s; animation-duration: 22s; }
        @keyframes float {
            0% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
            50% { opacity: 0.8; }
            100% { transform: translate(10px, -20px) rotate(360deg); opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
            .animated-background, .shape { animation: none !important; }
            .animated-background { background: var(--color-background) !important; }
        }

        /* Loading Overlay (Global) */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.8);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 2000;
            flex-direction: column;
        }
        .loading-spinner {
            width: 40px;
            height: 40px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--color-primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 16px;
        }
        .loading-text { color: var(--color-foreground); font-weight: 500; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        /* Notification Styles (Toasts) */
        .notification-container {
            position: fixed;
            top: 24px;
            right: 24px;
            z-index: 1000;
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 320px;
            width: 100%;
        }
        .notification {
            padding: 14px 18px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            display: flex;
            align-items: flex-start;
            gap: 12px;
            transform: translateX(400px);
            transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), opacity 0.3s ease;
            opacity: 0;
            background: white;
            border-left: 4px solid #3b82f6; /* Default */
            cursor: pointer;
        }
        .notification.show { transform: translateX(0); opacity: 1; }
        .notification.success { border-left-color: var(--color-primary); }
        .notification.error { border-left-color: #ef4444; }
        .notification.warning { border-left-color: #f59e0b; }
        .notification-icon { flex-shrink: 0; font-size: 18px; margin-top: 2px; }
        .notification-title { font-weight: 600; font-size: 14px; color: #1e293b; margin-bottom: 4px; }
        .notification-message { font-size: 13px; color: #64748b; line-height: 1.4; }
        .notification-close { background: none; border: none; color: #94a3b8; cursor: pointer; padding: 2px; font-size: 14px; transition: color 0.2s ease; flex-shrink: 0; margin-left: auto; }
        .notification-close:hover { color: #64748b; }

        /* Modal Styles (Forgot Password) */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1050;
            opacity: 0;
            visibility: hidden;
            transition: opacity 0.3s ease;
        }
        .modal-overlay.show {
            opacity: 1;
            visibility: visible;
        }
        .modal-content {
            background: white;
            border-radius: 12px;
            width: 90%;
            max-width: 400px;
            transform: scale(0.9);
            transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .modal-overlay.show .modal-content {
            transform: scale(1);
        }

        /* Back Home Button */
        .back-home-btn {
            background-color: white;
            border: 1px solid var(--color-border);
            border-radius: 0.5rem;
            transition: all 0.2s ease;
        }
        .back-home-btn:hover {
            background-color: hsl(220, 14.3%, 97%);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.05) !important;
        }
        
      `}</style>
    </div>
  );
};

export default Login;