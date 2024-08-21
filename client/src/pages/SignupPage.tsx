import { useState, useContext } from "react";
import UserContext from "../context/UserContext";
import { Link } from "react-router-dom";

const SignupPage: React.FC = () => {
  const { signup } = useContext(UserContext) ?? { signup: async () => { } };
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    // role: "",
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      setError(null);
      await signup(formData.username, formData.email, formData.password, formData.confirmPassword);
      // Redirect or perform other actions after successful signup
    } catch (error) {
      setError("Signup failed. Please try again.");
    }
  };

  const isPasswordInvalid = formData.password.length < 8 || formData.password.length > 20;
  const isPasswordMismatch = formData.password !== formData.confirmPassword;

  return (
    <div className="container d-flex justify-content-center mt-5">
      <div className="card p-4" style={{ maxWidth: "500px", width: "100%" }}>
        <div className="card-body">
          <h3 className="text-center mb-4">Create Account</h3>
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="row mb-3">
              <div className="col">
                <div className="form-floating">
                  <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    placeholder="Enter your username"
                  />
                  <label htmlFor="username" className="form-label text-black-50">
                    Username
                  </label>
                </div>
              </div>
              <div className="col">
                <div className="form-floating">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter your email"
                  />
                  <label htmlFor="email" className="form-label text-black-50">
                    Email
                  </label>
                </div>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                id="password"
                name="password"
                className={`form-control ${isPasswordInvalid ? 'is-invalid' : ''}`}
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
              <label htmlFor="password" className="form-label text-black-50">
                Password
              </label>
              {isPasswordInvalid && (
                <div className="invalid-feedback">
                  Your password must be 8-20 characters long.
                </div>
              )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                className={`form-control ${isPasswordMismatch ? 'is-invalid' : ''}`}
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="Confirm your password"
              />
              <label htmlFor="confirmPassword" className="form-label text-black-50">
                Confirm Password
              </label>
              {isPasswordMismatch && (
                <div className="invalid-feedback">
                  Passwords do not match.
                </div>
              )}
            </div>
            {/* <div className="form-group mb-3">
              <select
                className="form-control form-select"
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select a role</option>
                <option value="user">User</option>
                <option value="admin" disabled>Admin</option>
              </select>
            </div> */}
            <button type="submit" className="btn btn-success w-100 mt-3">
              Sign Up
            </button>
          </form>
          <div className="text-center mt-3">
            <span>Already have an account? </span>
            <Link to="/login" className="text-decoration-none">
              Login!
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;