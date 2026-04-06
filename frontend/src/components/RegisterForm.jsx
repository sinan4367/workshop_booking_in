import React, { useState } from "react";
import "./AuthForms.css";

// Form field options matching Django models
const titleChoices = [
  { value: "", label: "Select Title" },
  { value: "Professor", label: "Prof." },
  { value: "Doctor", label: "Dr." },
  { value: "Shriman", label: "Shri" },
  { value: "Shrimati", label: "Smt" },
  { value: "Kumari", label: "Ku" },
  { value: "Mr", label: "Mr." },
  { value: "Mrs", label: "Mrs." },
  { value: "Miss", label: "Ms." },
];

const departmentChoices = [
  { value: "", label: "Select Department" },
  { value: "computer engineering", label: "Computer Science" },
  { value: "information technology", label: "Information Technology" },
  { value: "civil engineering", label: "Civil Engineering" },
  { value: "electrical engineering", label: "Electrical Engineering" },
  { value: "mechanical engineering", label: "Mechanical Engineering" },
  { value: "chemical engineering", label: "Chemical Engineering" },
  { value: "aerospace engineering", label: "Aerospace Engineering" },
  {
    value: "biosciences and bioengineering",
    label: "Biosciences and BioEngineering",
  },
  { value: "electronics", label: "Electronics" },
  {
    value: "energy science and engineering",
    label: "Energy Science and Engineering",
  },
];

const stateChoices = [
  { value: "", label: "Select State" },
  { value: "IN-AP", label: "Andhra Pradesh" },
  { value: "IN-AR", label: "Arunachal Pradesh" },
  { value: "IN-AS", label: "Assam" },
  { value: "IN-BR", label: "Bihar" },
  { value: "IN-CT", label: "Chhattisgarh" },
  { value: "IN-GA", label: "Goa" },
  { value: "IN-GJ", label: "Gujarat" },
  { value: "IN-HR", label: "Haryana" },
  { value: "IN-HP", label: "Himachal Pradesh" },
  { value: "IN-JK", label: "Jammu and Kashmir" },
  { value: "IN-JH", label: "Jharkhand" },
  { value: "IN-KA", label: "Karnataka" },
  { value: "IN-KL", label: "Kerala" },
  { value: "IN-MP", label: "Madhya Pradesh" },
  { value: "IN-MH", label: "Maharashtra" },
  { value: "IN-TN", label: "Tamil Nadu" },
  { value: "IN-TG", label: "Telangana" },
  { value: "IN-DL", label: "Delhi" },
];

const sourceChoices = [
  { value: "", label: "How did you hear about us?" },
  { value: "FOSSEE website", label: "FOSSEE website" },
  { value: "Google", label: "Google" },
  { value: "Social Media", label: "Social Media" },
  { value: "From other College", label: "From other College" },
];

const RegisterForm = ({ onRegister, onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    title: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    institute: "",
    department: "",
    location: "",
    state: "",
    position: "coordinator", // Default to coordinator as per Django
    how_did_you_hear_about_us: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{10}$/;

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (!/^[a-zA-Z0-9._]+$/.test(formData.username)) {
      newErrors.username =
        "Only letters, digits, period and underscore allowed";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirm_password) {
      newErrors.confirm_password = "Passwords do not match";
    }

    if (!formData.first_name.trim()) {
      newErrors.first_name = "First name is required";
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = "Last name is required";
    }

    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Phone number is required";
    } else if (!phoneRegex.test(formData.phone_number)) {
      newErrors.phone_number = "Phone number must be 10 digits";
    }

    if (!formData.institute.trim()) {
      newErrors.institute = "Institute name is required";
    }

    if (!formData.department) {
      newErrors.department = "Department is required";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Demo: Auto-login after registration
    // In real Django, this would send data to backend and create user
    const newUser = {
      isAuthenticated: true,
      role: formData.position,
      position: formData.position,
      name: `${formData.first_name} ${formData.last_name}`,
      username: formData.username,
      email: formData.email,
    };

    onRegister(newUser);
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-wide">
        <div className="auth-header">
          <div className="auth-logo">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="logo-icon"
            >
              <path
                d="M12 2L2 7l10 5 10-5-10-5z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M2 17l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12l10 5 10-5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1 className="auth-title">Coordinator Registration</h1>
          <p className="auth-subtitle">
            Create your account to organize and manage workshops
          </p>
        </div>

        <form className="auth-form register-form" onSubmit={handleSubmit}>
          <div className="form-section">
            <h3 className="form-section-title">Account Information</h3>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="username" className="form-label">
                  Username <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  className={`form-input ${errors.username ? "input-error" : ""}`}
                  placeholder="Letters, digits, period and underscore only"
                  value={formData.username}
                  onChange={handleChange}
                />
                {errors.username && (
                  <span className="field-error">{errors.username}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Email <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? "input-error" : ""}`}
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="field-error">{errors.email}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  className={`form-input ${errors.password ? "input-error" : ""}`}
                  placeholder="At least 6 characters"
                  value={formData.password}
                  onChange={handleChange}
                />
                {errors.password && (
                  <span className="field-error">{errors.password}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="confirm_password" className="form-label">
                  Confirm Password <span className="required">*</span>
                </label>
                <input
                  type="password"
                  id="confirm_password"
                  name="confirm_password"
                  className={`form-input ${errors.confirm_password ? "input-error" : ""}`}
                  placeholder="Re-enter password"
                  value={formData.confirm_password}
                  onChange={handleChange}
                />
                {errors.confirm_password && (
                  <span className="field-error">{errors.confirm_password}</span>
                )}
              </div>
            </div>
          </div>

          <div className="form-section">
            <h3 className="form-section-title">Personal Details</h3>
            <div className="form-row">
              <div className="form-group small">
                <label htmlFor="title" className="form-label">
                  Title
                </label>
                <select
                  id="title"
                  name="title"
                  className="form-input form-select"
                  value={formData.title}
                  onChange={handleChange}
                >
                  {titleChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="first_name" className="form-label">
                  First Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="first_name"
                  name="first_name"
                  className={`form-input ${errors.first_name ? "input-error" : ""}`}
                  placeholder="First name"
                  value={formData.first_name}
                  onChange={handleChange}
                />
                {errors.first_name && (
                  <span className="field-error">{errors.first_name}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="last_name" className="form-label">
                  Last Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="last_name"
                  name="last_name"
                  className={`form-input ${errors.last_name ? "input-error" : ""}`}
                  placeholder="Last name"
                  value={formData.last_name}
                  onChange={handleChange}
                />
                {errors.last_name && (
                  <span className="field-error">{errors.last_name}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="phone_number" className="form-label">
                  Phone Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone_number"
                  name="phone_number"
                  className={`form-input ${errors.phone_number ? "input-error" : ""}`}
                  placeholder="10 digit phone number"
                  value={formData.phone_number}
                  onChange={handleChange}
                />
                {errors.phone_number && (
                  <span className="field-error">{errors.phone_number}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="institute" className="form-label">
                  Institute/Organization <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="institute"
                  name="institute"
                  className={`form-input ${errors.institute ? "input-error" : ""}`}
                  placeholder="Full name of your Institute/Organization"
                  value={formData.institute}
                  onChange={handleChange}
                />
                {errors.institute && (
                  <span className="field-error">{errors.institute}</span>
                )}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="department" className="form-label">
                  Department <span className="required">*</span>
                </label>
                <select
                  id="department"
                  name="department"
                  className={`form-input form-select ${errors.department ? "input-error" : ""}`}
                  value={formData.department}
                  onChange={handleChange}
                >
                  {departmentChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <span className="field-error">{errors.department}</span>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="position" className="form-label">
                  Position <span className="required">*</span>
                </label>
                <select
                  id="position"
                  name="position"
                  className="form-input form-select"
                  value={formData.position}
                  onChange={handleChange}
                >
                  <option value="coordinator">
                    Coordinator (Organize workshops)
                  </option>
                  <option value="instructor">
                    Instructor (Conduct workshops)
                  </option>
                </select>
                <span className="form-help">
                  Select Coordinator to organize workshops, or Instructor to
                  conduct them
                </span>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="location" className="form-label">
                  Location/City
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  className="form-input"
                  placeholder="Place/City"
                  value={formData.location}
                  onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="state" className="form-label">
                  State <span className="required">*</span>
                </label>
                <select
                  id="state"
                  name="state"
                  className={`form-input form-select ${errors.state ? "input-error" : ""}`}
                  value={formData.state}
                  onChange={handleChange}
                >
                  {stateChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <span className="field-error">{errors.state}</span>
                )}
              </div>
              <div className="form-group">
                <label
                  htmlFor="how_did_you_hear_about_us"
                  className="form-label"
                >
                  Source
                </label>
                <select
                  id="how_did_you_hear_about_us"
                  name="how_did_you_hear_about_us"
                  className="form-input form-select"
                  value={formData.how_did_you_hear_about_us}
                  onChange={handleChange}
                >
                  {sourceChoices.map((choice) => (
                    <option key={choice.value} value={choice.value}>
                      {choice.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className={`btn-primary auth-submit ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner"></span>
                Creating Account...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="auth-footer">
          <p className="auth-switch">
            Already have an account?{" "}
            <button
              type="button"
              className="auth-link"
              onClick={onSwitchToLogin}
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
