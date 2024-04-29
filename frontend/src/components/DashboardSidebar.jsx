import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

function DashboardSidebar() {
  const [isActive, setIsActive] = useState("");
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="col-md-2 sidebar">
      <ul className="nav pt-4 justify-content-xl-start justify-content-center">
        <li className="nav-item px-4 mb-3">
          <Link
            to="/dashboard"
            className={isActive === "Stats" ? "textColor" : "text-dark"}
            onClick={(e) => setIsActive(e.target.textContent)}
          >
            <i className="bi bi-graph-up fs-4"></i>
            <span className="ms-3 d-none d-sm-inline">Stats</span>
          </Link>
        </li>

        {user?.role === "user" && (
          <>
            <li className="nav-item px-4 mb-3">
              <Link
                to="searchJobs"
                className={
                  isActive === "Search Jobs" ? "textColor" : "text-dark"
                }
                onClick={(e) => setIsActive(e.target.textContent)}
              >
                <i className="bi bi-search fs-4"></i>
                <span className="ms-3 d-none d-sm-inline">Search Jobs</span>
              </Link>
            </li>

            <li className="nav-item px-4 mb-3">
              <Link
                to="savedJobs"
                className={
                  isActive === "Saved Jobs" ? "textColor" : "text-dark"
                }
                onClick={(e) => setIsActive(e.target.textContent)}
              >
                <i className="bi bi-save fs-4"></i>
                <span className="ms-3 d-none d-sm-inline">Saved Jobs</span>
              </Link>
            </li>

            <li className="nav-item px-4 mb-3">
              <Link
                to="appliedJobs"
                className={
                  isActive === "Applied Jobs" ? "textColor" : "text-dark"
                }
                onClick={(e) => setIsActive(e.target.textContent)}
              >
                <i className="bi bi-card-checklist fs-4"></i>
                <span className="ms-3 d-none d-sm-inline">Applied Jobs</span>
              </Link>
            </li>
          </>
        )}

        <li className="nav-item px-4 mb-3">
          <Link
            to="profile"
            className={isActive === "Profile" ? "textColor" : "text-dark"}
            onClick={(e) => setIsActive(e.target.textContent)}
          >
            <i className="bi bi-person-lines-fill fs-4"></i>
            <span className="ms-3 d-none d-sm-inline">Profile</span>
          </Link>
        </li>

        {user?.role === "user" && (
          <li className="nav-item px-4 mb-3">
            <Link
              to="updateOtherProfileDetails"
              className={
                isActive === "UpdateOtherDetails" ? "textColor" : "text-dark"
              }
              onClick={(e) => setIsActive(e.target.textContent)}
            >
              <i className="bi bi-person-lines-fill fs-4"></i>
              <span className="ms-3 d-none d-sm-inline">OtherDetails</span>
            </Link>
          </li>
        )}

        <li className="nav-item px-4 mb-3">
          <Link
            to="changePassword"
            className={
              isActive === "ChangePassword" ? "textColor" : "text-dark"
            }
            onClick={(e) => setIsActive(e.target.textContent)}
          >
            <i className="bi bi-eye-slash-fill fs-4"></i>
            <span className="ms-3 d-none d-sm-inline">ChangePassword</span>
          </Link>
        </li>

        {/* for admin */}
        {user?.role === "admin" && (
          <>
            <li className="nav-item px-4 mb-3">
              <Link
                to="addJob"
                className={isActive === "Add Job" ? "textColor" : "text-dark"}
                onClick={(e) => setIsActive(e.target.textContent)}
              >
                <i className="bi bi-pencil-square fs-4"></i>
                <span className="ms-3 d-none d-sm-inline">Add Job</span>
              </Link>
            </li>

            <li className="nav-item px-4 mb-3">
              <Link
                to="allJobs"
                className={isActive === "All Jobs" ? "textColor" : "text-dark"}
                onClick={(e) => setIsActive(e.target.textContent)}
              >
                <i className="bi bi-list-ol fs-4"></i>
                <span className="ms-3 d-none d-sm-inline">All Jobs</span>
              </Link>
            </li>

            <li className="nav-item px-4 mb-3">
              <Link
                to="allUsers"
                className={isActive === "All Users" ? "textColor" : "text-dark"}
                onClick={(e) => setIsActive(e.target.textContent)}
              >
                <i className="bi bi-people-fill fs-4"></i>
                <span className="ms-3 d-none d-sm-inline">All Users</span>
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default DashboardSidebar;
