import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import User from "./User";
import { useGetJobByIdQuery } from "../redux/api/jobApi";
import { useApplyJobMutation, useSaveJobMutation } from "../redux/api/userApi";

function JobDetails() {
  const { user } = useSelector((state) => state.auth);

  const { id } = useParams();
  const { error, data } = useGetJobByIdQuery(id);
  const [
    saveJob,
    { error: saveJobErr, isSuccess: saveSuccess, data: saveResponse },
  ] = useSaveJobMutation();
  const [
    applyJob,
    { error: applyJobErr, isSuccess: applySuccess, data: applyResponse },
  ] = useApplyJobMutation();

  const isSaved = user?.savedJobs?.find((eachjob) => eachjob.job._id === id);
  const isApplied = user?.appliedJobs?.find(
    (eachjob) => eachjob.job._id === id
  );

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }
  }, [error, data]);

  useEffect(() => {
    if (saveJobErr) {
      toast.error(saveJobErr.data.error);
    }

    if (saveSuccess) {
      toast.success(saveResponse.message);
    }
  }, [saveJobErr, saveResponse, saveSuccess]);

  useEffect(() => {
    if (applyJobErr) {
      toast.error(applyJobErr.data.error);
    }

    if (applySuccess) {
      toast.success(applyResponse.message);
    }
  }, [applyJobErr, applyResponse, applySuccess]);

  const handleSave = () => {
    saveJob({ jobId: id });
  };

  const handleApply = () => {
    applyJob({ jobId: id });
  };

  return (
    <>
      <div
        className="d-flex flex-column flex-md-row gap-3 mx-auto"
        style={{ width: "95%" }}
      >
        <div
          className="shadow-sm bg-body rounded-1 p-3"
          style={{ width: "100%", maxWidth: "800px" }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <p className="textColor">{data?.jobType}</p>
              <h3 className="my-3">{data?.jobListingName}</h3>

              <i className="bi bi-geo-alt-fill text-danger"></i>
              <span className="text-danger ms-1">{data?.jobLocation}</span>
            </div>

            {/* Only for User */}
            {user?.role === "user" && (
              <div>
                <button
                  className="btn btn-outline-info mb-2 w-100"
                  onClick={handleSave}
                  disabled={isSaved !== undefined}
                >
                  <i className="bi bi-box-arrow-down me-2"></i>
                  {isSaved ? "Saved" : "Save Job"}
                </button>
                <br />
                <button
                  className="btn btn-outline-secondary"
                  onClick={handleApply}
                  disabled={isApplied !== undefined}
                >
                  <i className="bi bi-box-arrow-up-right me-2"></i>
                  {isApplied ? "Applied" : "Apply For Job"}
                </button>
              </div>
            )}

            {/* Only for admin */}
            {user?.role === "admin" && (
              <div>
                <p>
                  <strong>Job Status: </strong>
                  <span>Active</span>
                </p>
              </div>
            )}
          </div>

          <p className="text-primary fw-bold mt-3">Job Description</p>
          <p
            className="my-3"
            dangerouslySetInnerHTML={{ __html: data?.jobDescription }}
          />
          <p className="text-primary fw-bold">Salary</p>
          <p>{data?.salary} / Year</p>
        </div>
        <div
          className="shadow-sm bg-body rounded-1 p-3"
          style={{ width: "100%", maxWidth: "450px" }}
        >
          <h4>Company Info</h4>
          <p className="fs-5 mt-3">{data?.companyName}</p>
          <p>{data?.companyDescription}</p>
          <hr />

          <h5>Contact Email:</h5>
          <p className="bg-info p-1 fw-bold rounded-1">{data?.companyEmail}</p>

          <h5>Contact Phone:</h5>
          <p className="bg-info p-1 fw-bold rounded-1">{data?.companyPhone}</p>
        </div>
      </div>

      {/* Users Applied Section only for admin */}
      {user?.role === "admin" && data?.usersApplied?.length > 0 && (
        <>
          <h4 className="text-center my-5">Users Applied</h4>

          <div className="d-flex flex-column gap-3 w-75 mx-auto">
            {data?.usersApplied?.map((user) => (
              <User key={user._id} appliedUser={user} jobId={id} />
            ))}
          </div>
        </>
      )}
    </>
  );
}

export default JobDetails;
