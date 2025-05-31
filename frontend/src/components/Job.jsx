import { Link } from "react-router-dom";

function Job({ job }) {
  return (
    <div className="shadow-sm bg-body rounded-2 p-3" style={{ width: "365px" }}>
      <div className="fs-6 d-flex justify-content-between">
        <p className="textColor">{job.jobType}</p>
        <div className="pt-0">
          <i className="bi bi-calendar2-check-fill"></i>
          <span className="ms-2">{new Date(job.createdAt).toDateString()}</span>
        </div>
      </div>
      <h6 className="fw-bold">{job.jobListingName}</h6>

      <p
        className="mt-3"
        dangerouslySetInnerHTML={{
          __html: `${job.jobDescription.substring(0, 70)}...`,
        }}
      >
        {/*`${job.jobDescription.substring(0, 70)}...`*/}
        {/* <span className="text-primary ms-2 text-decoration-underline">
          more
        </span> */}
      </p>
      <p className="text-primary fw-bold">{job.salary} / Year</p>
      <hr />

      <div className="d-flex justify-content-between align-items-center">
        <div>
          <i className="bi bi-geo-alt-fill text-danger me-1"></i>
          <span className="text-danger">{job.jobLocation}</span>
        </div>
        <Link to={`/dashboard/jobdetails/${job._id}`}>
          <button className="bgColor border-0 rounded-2 px-3 py-2">
            Read More
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Job;
