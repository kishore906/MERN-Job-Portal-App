import { Link } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetMeQuery } from "../redux/api/userApi";
import { setUser, setIsAuthenticated } from "../redux/slice/userSlice";
import { useLazyLogoutQuery } from "../redux/api/authApi";

function DashboardHeader() {
  const { isLoading } = useGetMeQuery();
  const { user } = useSelector((state) => state.auth);
  const [logout, { isSuccess }] = useLazyLogoutQuery();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("LoggedOut Successfully");
      dispatch(setUser(null));
      dispatch(setIsAuthenticated(false));
      navigate("/");
    }
  }, [isSuccess, navigate, dispatch]);

  return (
    <header className="container-fluid">
      <div className="row justify-content-between align-items-center py-3 fixed-top bg-white">
        <div className="col-6 col-md-4 ps-5">
          <Link to="/dashboard" className="textColor">
            <h3>
              <span className="me-3 px-3 py-1 rounded text-white bgColor">
                J
              </span>
              JobQuest
            </h3>
          </Link>
        </div>

        <div className="col-md-4 text-center d-none d-md-block">
          <h4>Dashboard</h4>
        </div>

        <div className="col-6 col-md-4 text-end pe-5 dropdown">
          <button
            className="btn btn-light fw-bold dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={
                user?.profilePhoto
                  ? user?.profilePhoto?.url
                  : "/default_avatar.jpg"
              }
              alt="user_image"
              className="user_image"
            />
            <span>{user?.fullName}</span>
          </button>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item fw-bold" onClick={() => logout()}>
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default DashboardHeader;
