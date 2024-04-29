import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useDeleteAppliedJobMutation } from "../redux/api/userApi";

function AppliedJobs() {
  const { user } = useSelector((state) => state.auth);
  const [deleteAppliedJob, { error, isSuccess, data }] =
    useDeleteAppliedJobMutation();

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }

    if (isSuccess) {
      toast.success(data.message);
    }
  }, [error, data, isSuccess]);

  return (
    <div className="table-responsive">
      <table
        className="table table-bordered table-hover text-center mx-auto"
        style={{ width: "95%" }}
      >
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Job Role</th>
            <th scope="col">Company</th>
            <th scope="col">Location</th>
            <th scope="col">Applied On</th>
            <th scope="col">Job Status</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {user?.appliedJobs.map((eachJob, index) => (
            <tr key={eachJob._id}>
              <th scope="row">{index + 1}</th>
              <td>{eachJob.job.jobListingName}</td>
              <td>{eachJob.job.companyName}</td>
              <td>{eachJob.job.jobLocation}</td>
              <td>{new Date(eachJob.appliedOn).toDateString()}</td>
              <td>
                {eachJob.jobStatus === "Pending" && (
                  <span className="pendingBtn">Pending</span>
                )}
                {eachJob.jobStatus === "Interview" && (
                  <>
                    <span className="interviewBtn">Interview</span>
                    <span className="fw-bold">
                      on {new Date(eachJob.interviewOn).toDateString()}
                    </span>
                  </>
                )}
                {eachJob.jobStatus === "Declined" && (
                  <span className="declinedBtn">Declined</span>
                )}
              </td>
              <td>
                <Link to={`/dashboard/jobdetails/${eachJob.job._id}`}>
                  View More
                </Link>
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteAppliedJob(eachJob._id)}
                  disabled={eachJob.jobStatus !== "Declined"}
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

export default AppliedJobs;
