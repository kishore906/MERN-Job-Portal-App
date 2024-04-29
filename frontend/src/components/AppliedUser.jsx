import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useGetUserByIdQuery } from "../redux/api/userApi";
import { useUpdateJobStatusForUserMutation } from "../redux/api/jobApi";

function AppliedUser() {
  const [updateForm, setUpdateForm] = useState({
    status: "Pending",
    interviewDate: "",
  });

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { error, data } = useGetUserByIdQuery(id);
  const [
    updateJobStatusForUser,
    { error: updateErr, isSuccess, data: updateMsg },
  ] = useUpdateJobStatusForUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }

    if (updateErr) {
      toast.error(updateErr.data.error);
    }

    if (isSuccess) {
      toast.success(updateMsg.message);
      navigate("/dashboard/allJobs");
    }
  }, [error, isSuccess, updateErr, updateMsg, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm({ ...updateForm, [name]: value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    updateJobStatusForUser({
      jobId: searchParams.get("jobId"),
      userId: id,
      jobStatus: updateForm.status,
      interviewOn: updateForm.interviewDate,
    });
  };

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
      <div
        className="shadow-sm bg-body rounded-2 p-4"
        style={{ width: "100%", maxWidth: "650px" }}
      >
        <h4 className="text-center mb-3">User Details</h4>
        <h5>{data?.user?.fullName}</h5>
        <p className="text-danger">
          <i className="bi bi-geo-alt-fill"></i>
          <span>{data?.user?.address}</span>
        </p>

        <div className="my-4">
          <h6 className="text-primary">Education</h6>
          {data?.user?.qualifications.map((qualification, index) => (
            <p key={index + 1}>
              {qualification.degree}, {qualification.university}
            </p>
          ))}
        </div>

        <div className="my-4">
          <h6 className="text-primary">Experiences</h6>
          {data?.user?.experiences.map((experience, index) => (
            <p key={index + 1}>
              {experience.position}, {experience.company}
            </p>
          ))}
        </div>

        <div>
          <h6 className="text-primary">Skills</h6>
          <p>{data?.user?.primarySkills}</p>
        </div>
      </div>
      <div
        className="shadow-sm bg-body rounded-2 p-4"
        style={{
          width: "100%",
          maxWidth: "350px",
          height: "100%",
          maxHeight: "300px",
        }}
      >
        <h6 className="text-center mb-3">
          Application Status: {searchParams.get("jobStatus")}
        </h6>

        <form onSubmit={handleUpdate}>
          <label htmlFor="status" className="form-label">
            <b>Status:</b>
          </label>
          <select
            id="status"
            name="status"
            className="form-select mb-3"
            value={updateForm.status}
            onChange={handleChange}
          >
            <option value="Pending">Pending</option>
            <option value="Interview">Interview</option>
            <option value="Declined">Declined</option>
          </select>

          {updateForm.status === "Interview" && (
            <>
              <label htmlFor="interviewDate" className="form-label">
                <b>Interview Date:</b>
              </label>
              <input
                type="date"
                id="interviewDate"
                name="interviewDate"
                className="form-control"
                value={updateForm.interviewDate}
                onChange={handleChange}
              />
            </>
          )}

          <button className="btn btn-info d-block mx-auto mt-3">Update</button>
        </form>
      </div>
    </div>
  );
}

export default AppliedUser;
