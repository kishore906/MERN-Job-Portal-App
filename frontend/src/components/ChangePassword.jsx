import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useUpdatePasswordMutation } from "../redux/api/userApi";

function ChangePassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");

  const [updatePassword, { isLoading, error, isSuccess, data }] =
    useUpdatePasswordMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      navigate("/dashboard");
    }

    if (error) {
      toast.error(error.data.error);
    }
  }, [isSuccess, error, data, navigate]);

  const handleUpdate = (e) => {
    e.preventDefault();
    const userData = {
      oldPassword,
      password,
    };
    updatePassword(userData);
  };

  return (
    <form
      className="mx-auto my-5 p-4 shadow-sm bg-body rounded"
      style={{ width: "100%", maxWidth: "450px" }}
      onSubmit={handleUpdate}
    >
      <h4 className="text-center mb-4">Update Password</h4>

      <label htmlFor="oldPassword" className="form-label">
        <b>Old Password</b>
      </label>
      <input
        type="password"
        id="oldPassword"
        name="oldPassword"
        className="form-control mb-4"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
      />

      <label htmlFor="password" className="form-label">
        <b>New Password</b>
      </label>
      <input
        type="password"
        id="password"
        name="password"
        className="form-control mb-4"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        className="bgColor d-block mx-auto px-4 py-2 border-0 rounded"
        disabled={isLoading}
      >
        {isLoading ? "Updating..." : "Update"}
      </button>
    </form>
  );
}

export default ChangePassword;
