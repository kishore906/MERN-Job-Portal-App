import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/authApi";

function Login() {
  const [user, setUser] = useState({ email: "", password: "" });

  const [login, { isLoading, isSuccess, error }] = useLoginMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }

    if (isSuccess) {
      toast.success("Login Successful");
      navigate("/dashboard");
    }
  }, [isSuccess, error, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(user);
  };
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <form className="register_login_form" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Login</h3>

        <label htmlFor="email" className="form-label">
          <b>Email:</b>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="form-control mb-4"
          value={user.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password" className="form-label">
          <b>Password:</b>
        </label>
        <input
          type="password"
          id="password"
          name="password"
          className="form-control mb-5"
          value={user.password}
          onChange={handleChange}
          required
        />

        <button
          className="bgColor border-0 rounded-2 px-4 py-2 d-block mx-auto"
          disabled={isLoading}
        >
          Login
        </button>

        <p className="text-center mt-4">
          Not a member yet?
          <Link className="textColor ms-1">Register</Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
