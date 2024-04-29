import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateJobMutation, useGetJobByIdQuery } from "../redux/api/jobApi";

function EditJobDetails() {
  const [job, setJob] = useState({
    jobType: "",
    jobListingName: "",
    jobDescription: "",
    salary: "",
    jobLocation: "",
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    companyDescription: "",
  });

  const { id } = useParams();
  const { error, data } = useGetJobByIdQuery(id);

  const [
    updateJob,
    { isLoading, error: updateErr, isSuccess, data: updateMsg },
  ] = useUpdateJobMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      setJob(data);
    }

    if (error) {
      toast.error(error.data.error);
    }
  }, [data, error]);

  useEffect(() => {
    if (updateErr) {
      toast.error(updateErr.data.error);
    }

    if (isSuccess) {
      toast.success(updateMsg.message);
      navigate("/dashboard/allJobs");
    }
  }, [updateErr, isSuccess, updateMsg, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setJob({ ...job, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateJob({ id, body: job });
  };

  return (
    <form className="addJob_form" onSubmit={handleSubmit}>
      <h4 className="text-center mb-5">Update Job</h4>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <label htmlFor="jobType" className="form-label">
            <b>Job Type:</b>
          </label>
          <select
            id="jobType"
            name="jobType"
            className="form-select"
            value={job?.jobType}
            onChange={handleChange}
          >
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>
        <div className="col-12 col-md-6">
          <label htmlFor="jobListingName" className="form-label">
            <b>Job Listing Name:</b>
          </label>
          <input
            type="text"
            id="jobListingName"
            name="jobListingName"
            className="form-control"
            value={job?.jobListingName}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label htmlFor="jobDescription" className="form-label mb-3">
            <b>Job Description:</b>
          </label>
          <textarea
            id="jobDescription"
            name="jobDescription"
            rows={6}
            className="form-control"
            value={job?.jobDescription}
            onChange={handleChange}
          >
            Add Job responsibilities, description, skill etc...
          </textarea>
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="salary" className="form-label">
            <b>Salary ($):</b>
          </label>
          <select
            id="salary"
            name="salary"
            className="form-select"
            value={job?.salary}
            onChange={handleChange}
          >
            <option value="55k-65k">55k-65k</option>
            <option value="65k-75k">65k-75k</option>
            <option value="75k-90k">75k-90k</option>
            <option value="90k-100k">90k-100k</option>
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="jobLocation" className="form-label">
            <b>Location:</b>
          </label>
          <input
            type="text"
            id="jobLocation"
            name="jobLocation"
            className="form-control"
            value={job?.jobLocation}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="jobStatus" className="form-label">
            <b>Job Status:</b>
          </label>
          <select
            id="jobStatus"
            name="jobStatus"
            className="form-select"
            value={job?.jobStatus}
            onChange={handleChange}
          >
            <option value="Active">Active</option>
            <option value="InActive">InActive</option>
          </select>
        </div>
      </div>

      <h3 className="mb-4">Comapany Info</h3>

      <div className="row g-4">
        <div className="col-12 col-md-4">
          <label htmlFor="companyName" className="form-label">
            <b>Company Name:</b>
          </label>
          <input
            type="text"
            id="companyName"
            name="companyName"
            className="form-control"
            value={job?.companyName}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="companyEmail" className="form-label">
            <b>Company Email:</b>
          </label>
          <input
            type="email"
            id="companyEmail"
            name="companyEmail"
            className="form-control"
            value={job?.companyEmail}
            onChange={handleChange}
          />
        </div>

        <div className="col-12 col-md-4">
          <label htmlFor="companyPhone" className="form-label">
            <b>Company Phone:</b>
          </label>
          <input
            type="text"
            id="companyPhone"
            name="companyPhone"
            className="form-control"
            value={job?.companyPhone}
            onChange={handleChange}
          />
        </div>

        <div className="col-12">
          <label htmlFor="companyDescription" className="form-label mb-3">
            <b>Company Description:</b>
          </label>
          <textarea
            id="companyDescription"
            name="companyDescription"
            rows={6}
            className="form-control"
            value={job?.companyDescription}
            onChange={handleChange}
          >
            Add Company description...
          </textarea>
        </div>
      </div>

      <button
        className="bgColor mt-5 d-block mx-auto border-0 rounded px-5 py-2"
        disabled={isLoading}
      >
        Update Job
      </button>
    </form>
  );
}

export default EditJobDetails;
