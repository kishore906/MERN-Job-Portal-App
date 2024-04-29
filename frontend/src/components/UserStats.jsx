import { useEffect } from "react";
import { toast } from "react-toastify";
import UserChart from "./charts/UserJobsChart";
import { useGetUserJobsStatsQuery } from "../redux/api/userApi";

function Stats() {
  const { error, data } = useGetUserJobsStatsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }
  }, [error]);

  return (
    <>
      <div className="row g-3 mx-auto" style={{ width: "97%" }}>
        <div className="col-12 col-md-4">
          <div className="bg-white rounded-2 p-4 stats1Border">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold stats1Color">{data?.pendingAppsCount}</h1>
              <i className="bi bi-suitcase-lg-fill fs-2 stats1Color stats1bg"></i>
            </div>
            <p className="my-3 fs-5">Pending Applications</p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="bg-white rounded-2 p-4 stats2Border">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold stats2Color">{data?.interviewsCount}</h1>
              <i className="bi bi-clipboard2-check-fill fs-2 stats2Color stats2bg"></i>
            </div>
            <p className="my-3 fs-5">Interviews Scheduled</p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className="bg-white rounded-2 p-4 stats3Border">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold stats3Color">{data?.declinedAppsCount}</h1>
              <i className="bi bi-suitcase-lg-fill fs-2 stats3Color stats3bg"></i>
            </div>
            <p className="my-3 fs-5">Applications Declined</p>
          </div>
        </div>
      </div>

      <div
        className="mx-auto mt-5"
        style={{ width: "100%", maxWidth: "970px" }}
      >
        <UserChart userJobsData={data} />
      </div>
    </>
  );
}

export default Stats;
