import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import searchJobsKeywords from "../utils/searchJobsKeywords";
import { useGetJobsQuery } from "../redux/api/jobApi";
import Job from "./Job";
import CustomPagination from "./CustomPagination";

function SearchJobs() {
  const [searchJob, setSearchJob] = useState("");
  const [jobType, setJobType] = useState("");
  const [jobLocation, setJobLocation] = useState("");
  const [salary, setSalary] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchPerform, setSearchPerform] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search");
  const searchJobType = searchParams.get("jobType");
  const searchJobLocation = searchParams.get("jobLocation");
  const searchJobSalary = searchParams.get("salary");
  const page = Number(searchParams.get("page")) || 1;

  const params = {
    searchKeyword,
    searchJobType,
    searchJobLocation,
    searchJobSalary,
    page,
  };
  const { data, error } = useGetJobsQuery(params);

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }
  }, [error]);

  const handleKeywordClick = (e) => {
    setSearchJob(e.target.textContent);
    setIsOpen(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (searchJob) {
      setSearchPerform(true);
      navigate(
        `?search=${searchJob}&jobType=${jobType}&salary=${salary}&jobLocation=${jobLocation}`
      );
      setIsOpen(false);
    } else {
      navigate("/dashboard/searchJobs");
    }
  };

  return (
    <>
      <form
        className="row g-3 shadow-sm bg-body rounded-1 mx-auto my-2 p-4"
        style={{ width: "95%" }}
        onSubmit={handleSearch}
      >
        <h4 className="text-center mb-4">Search For Jobs...</h4>
        <div className="col-12 col-md-6">
          <label htmlFor="search" className="form-label">
            <b>Job Title:</b>
          </label>
          <input
            type="text"
            id="search"
            name="search"
            className="form-control"
            placeholder="job title..."
            value={searchJob}
            onChange={(e) => {
              setSearchJob(e.target.value);
              setIsOpen(true);
            }}
            required
          />

          {searchJob !== "" && isOpen && (
            <ul className="list-group list-group-flush mt-2 shadow-sm bg-body rounded">
              {searchJobsKeywords.map(
                (keyword, index) =>
                  keyword.toLowerCase().includes(searchJob.toLowerCase()) && (
                    <li
                      className="list-group-item"
                      key={index}
                      onClick={handleKeywordClick}
                    >
                      {keyword}
                    </li>
                  )
              )}
            </ul>
          )}
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="jobType" className="form-label">
            <b>Job Type:</b>
          </label>
          <select
            id="jobType"
            name="jobType"
            className="form-select"
            value={jobType}
            onChange={(e) => setJobType(e.target.value)}
            required
          >
            <option value="">Select job type:</option>
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="salary" className="form-label">
            <b>Salary Range:</b>
          </label>
          <select
            id="salary"
            name="salary"
            className="form-select"
            value={salary}
            onChange={(e) => setSalary(e.target.value)}
            required
          >
            <option value="">Select salary range:</option>
            <option value="$55k-$65k">$55k - $65k</option>
            <option value="$65k-$75k">$65k - $75k</option>
            <option value="$75k-$90k">$75k - $90k</option>
            <option value="$75k-$95K">$75k - $95k</option>
            <option value="$100k-$120K">$100k - $120k</option>
            <option value="$120k-$150K">$120k - $150k</option>
            <option value="$150k-$200K">$150k - $200k</option>
          </select>
        </div>

        <div className="col-12 col-md-6">
          <label htmlFor="jobLocation" className="form-label">
            <b>Job Location:</b>
          </label>
          <select
            id="jobLocation"
            name="jobLocation"
            className="form-select"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
          >
            <option value="">Select city:</option>
            <option value="Sydney">Sydney, Australia</option>
            <option value="Melbourne">Melbourne, Australia</option>
            <option value="Brisbane">Brisbane, Australia</option>
            <option value="Adelaide">Adelaide, Australia</option>
            <option value="Perth">Perth, Australia</option>
          </select>
        </div>

        <button
          className="bgColor mx-auto mt-5 border-0 rounded-1 p-1"
          style={{ width: "200px" }}
        >
          Search For Jobs
        </button>
      </form>

      {/* Searched jobs */}
      {data?.jobs?.length > 0 && (
        <h5 className="text-center m-5">{`${data?.searchJobsCount} Job${
          data?.searchJobsCount > 1 && "s"
        } Found...`}</h5>
      )}

      {searchPerform && data?.searchJobsCount === 0 && (
        <h5 className="text-center m-5">No jobs found for your search...</h5>
      )}

      {data?.jobs?.length > 0 && (
        <div
          className="d-flex justify-content-center gap-4 flex-wrap mx-auto"
          style={{ width: "95%" }}
        >
          {data.jobs.map((job) => (
            <Job key={job._id} job={job} />
          ))}
        </div>
      )}

      {data?.jobs?.length > 0 && data?.searchJobsCount > data?.resPerPage && (
        <CustomPagination
          searchJobsCount={data?.searchJobsCount}
          resPerPage={data?.resPerPage}
        />
      )}
    </>
  );
}

export default SearchJobs;
