import { Link } from "react-router-dom";

function User({ appliedUser, jobId }) {
  const jobstatus = appliedUser?.user?.appliedJobs?.find(
    (eachjob) => eachjob.job.toString() === jobId.toString()
  ).jobStatus;

  return (
    <div className="p-3 d-flex justify-content-between align-items-center shadow-sm bg-body border rounded-2">
      <div>
        <h5 className="fw-bold">{appliedUser.user.fullName}</h5>
        <p>
          <strong>Primary Skills: </strong> {appliedUser.user.primarySkills}
        </p>

        <i className="bi bi-geo-alt-fill text-danger me-1"></i>
        <span className="text-danger">{appliedUser.user.address}</span>
      </div>
      <div>
        {jobstatus === "Pending" && (
          <p className="pendingBtn text-center">Pending</p>
        )}
        {jobstatus === "Interview" && (
          <p className="interviewBtn text-center">Interview Scheduled</p>
        )}
        {jobstatus === "Declined" && (
          <p className="declinedBtn text-center">Declined</p>
        )}

        <Link
          to={`/dashboard/appliedUser/${appliedUser.user._id}?jobId=${jobId}&jobStatus=${jobstatus}`}
        >
          <button className="btn btn-info">View More...</button>
        </Link>
      </div>
    </div>
  );
}

export default User;
