import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import searchJobsKeywords from "../utils/searchJobsKeywords";
import { useGetJobsQuery } from "../redux/api/jobApi";
import Job from "./Job";
import CustomPagination from "./CustomPagination";

function SearchJobs() {
  const [searchJob, setSearchJob] = useState("");
  const [jobType, setJobType] = useState("Full-time");
  const [isOpen, setIsOpen] = useState(false);
  const [searchPerform, setSearchPerform] = useState(false);

  const navigate = useNavigate();

  const [searchParams] = useSearchParams();
  const searchKeyword = searchParams.get("search");
  const searchJobType = searchParams.get("jobType");
  const page = Number(searchParams.get("page")) || 1;

  const params = { searchKeyword, searchJobType, page };
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
      navigate(`?search=${searchJob}&jobType=${jobType}`);
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
            <option value="Full-time">Full-time</option>
            <option value="Part-time">Part-time</option>
            <option value="Contract">Contract</option>
            <option value="Internship">Internship</option>
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
        <h5 className="text-center m-5">No Jobs Found For Your Search...</h5>
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
