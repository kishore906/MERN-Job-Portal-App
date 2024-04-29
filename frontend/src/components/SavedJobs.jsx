import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDeleteSavedJobMutation } from "../redux/api/userApi";

function SavedJobs() {
  const { user } = useSelector((state) => state.auth);

  const [deleteSavedJob, { error, isSuccess, data }] =
    useDeleteSavedJobMutation();

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }

    if (isSuccess) {
      toast.success(data.message);
    }
  }, [error, data, isSuccess]);

  return (
    <div className="table-responsive mx-auto" style={{ width: "95%" }}>
      <table className="table table-bordered table-hover text-center">
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Job Role</th>
            <th scope="col">Company</th>
            <th scope="col">Location</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {user?.savedJobs.map((eachjob, index) => (
            <tr key={eachjob._id}>
              <th scope="row">{index + 1}</th>
              <td>{eachjob.job.jobListingName}</td>
              <td>{eachjob.job.companyName}</td>
              <td>{eachjob.job.jobLocation}</td>
              <td>
                <Link to={`/dashboard/jobdetails/${eachjob.job._id}`}>
                  View more
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger text-white"
                  onClick={() => deleteSavedJob(eachjob._id)}
                >
                  <i className="bi bi-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SavedJobs;
