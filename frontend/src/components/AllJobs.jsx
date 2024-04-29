import { toast } from "react-toastify";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetAllJobsQuery, useDeleteJobMutation } from "../redux/api/jobApi";

function AllJobs() {
  const { error, data } = useGetAllJobsQuery();
  const [deleteJob, { error: deleteErr, isSuccess, data: deleteMsg }] =
    useDeleteJobMutation();

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }
  }, [error, data]);

  useEffect(() => {
    if (deleteErr) {
      toast.error(deleteErr.data.error);
    }

    if (isSuccess) {
      toast.success(deleteMsg.message);
    }
  }, [deleteErr, isSuccess, deleteMsg]);

  return (
    <div className="table-responsive">
      <table
        className="table table-bordered table-hover text-center mx-auto"
        style={{ width: "90%" }}
      >
        <thead>
          <tr>
            <th scope="col">S.No</th>
            <th scope="col">Position</th>
            <th scope="col">Company Name</th>
            <th scope="col">Job Type</th>
            <th scope="col">Location</th>
            <th scope="col">Job Status</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((job, index) => (
            <tr key={index + 1}>
              <th scope="row">{index + 1}</th>
              <td>{job.jobListingName}</td>
              <td>{job.companyName}</td>
              <td>{job.jobType}</td>
              <td>{job.jobLocation}</td>
              <td>{job.jobStatus}</td>
              <td>
                <Link to={`/dashboard/jobdetails/${job._id}`}>
                  <button className="btn btn-outline-info me-3 fw-bold">
                    <i className="bi bi-eye"></i>
                  </button>
                </Link>

                <Link to={`/dashboard/editJob/${job._id}`}>
                  <button className="btn btn-outline-primary me-3 fw-bold">
                    <i className="bi bi-pencil-square"></i>
                  </button>
                </Link>

                <button
                  className="btn btn-outline-danger fw-bold"
                  onClick={() => deleteJob(job._id)}
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

export default AllJobs;
