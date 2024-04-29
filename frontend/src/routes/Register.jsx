import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../redux/api/authApi";

function Register() {
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
    address: "",
  });

  const [register, { isLoading, isSuccess, error, data }] =
    useRegisterMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      console.log(error.data.message);
      toast.error(error.data.error);
    }

    if (isSuccess) {
      toast.success(data.message);
      navigate("/login");
    }
  }, [isSuccess, error, data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(user);
  };

  return (
    <div className="d-flex vh-100 justify-content-center align-items-center">
      <form className="register_login_form" onSubmit={handleSubmit}>
        <h3 className="text-center mb-4">Register</h3>

        <label htmlFor="fullName" className="form-label">
          <b>FullName:</b>
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          className="form-control mb-4"
          value={user.fullName}
          onChange={handleChange}
          required
        />

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
          className="form-control mb-4"
          value={user.password}
          onChange={handleChange}
          required
        />

        <label htmlFor="address" className="form-label">
          <b>Address:</b>
        </label>
        <input
          type="text"
          id="address"
          name="address"
          className="form-control mb-5"
          value={user.address}
          onChange={handleChange}
          required
        />

        <button
          className="bgColor border-0 rounded d-block mx-auto px-3 p-2"
          disabled={isLoading}
        >
          {isLoading ? "Registering..." : "Register"}
        </button>

        <p className="text-center mt-4">
          Already registered? <Link className="textColor">Login</Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
