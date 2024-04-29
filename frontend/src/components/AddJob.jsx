import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAddNewJobMutation } from "../redux/api/jobApi";

function AddJob() {
  const [newJob, setNewJob] = useState({
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
  const [addNewJob, { isLoading, error, isSuccess, data }] =
    useAddNewJobMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }

    if (isSuccess) {
      toast.success(data.message);
      navigate("/dashboard/allJobs");
    }
  }, [error, isSuccess, data, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewJob({ ...newJob, [name]: value });
  };

  const handleAddNewJob = (e) => {
    e.preventDefault();
    addNewJob(newJob);
  };

  return (
    <form className="addJob_form" onSubmit={handleAddNewJob}>
      <h4 className="text-center mb-5">Add Job</h4>

      <div className="row g-4 mb-5">
        <div className="col-12 col-md-6">
          <label htmlFor="jobType" className="form-label">
            <b>Job Type:</b>
          </label>
          <select
            id="jobType"
            name="jobType"
            className="form-select"
            value={newJob.jobType}
            onChange={handleChange}
            required
          >
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
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
            placeholder="e.g. Full Stack Developer.."
            value={newJob.jobListingName}
            onChange={handleChange}
            required
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
            value={newJob.jobDescription}
            onChange={handleChange}
            required
          >
            Add Job responsibilities, description, skill etc...
          </textarea>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="salary" className="form-label">
            <b>Salary ($):</b>
          </label>
          <select
            id="salary"
            name="salary"
            className="form-select"
            value={newJob.salary}
            onChange={handleChange}
            required
          >
            <option value="$55k - $65k">$55k - $65k</option>
            <option value="$65k - $75k">$65k - $75k</option>
            <option value="$75k - $90k">$75k - $90k</option>
            <option value="$90k - $100k">$90k - $100k</option>
            <option value="$100k - $120k">$100k - $120k</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="jobLocation" className="form-label">
            <b>Location:</b>
          </label>
          <input
            type="text"
            id="jobLocation"
            name="jobLocation"
            className="form-control"
            placeholder="Company Location.."
            value={newJob.jobLocation}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <h3 className="mb-4">Company Info</h3>

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
            value={newJob.companyName}
            onChange={handleChange}
            required
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
            placeholder="company@mail.com"
            value={newJob.companyEmail}
            onChange={handleChange}
            required
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
            value={newJob.companyPhone}
            onChange={handleChange}
            required
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
            value={newJob.companyDescription}
            onChange={handleChange}
            required
          >
            Add Company description...
          </textarea>
        </div>
      </div>

      <button
        className="bgColor mt-5 d-block mx-auto border-0 rounded px-5 py-2"
        disabled={isLoading}
      >
        Add Job
      </button>
    </form>
  );
}

export default AddJob;
