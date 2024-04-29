import AdminChart from "./charts/AdminChart";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useGetAdminStatsQuery } from "../redux/api/userApi";

function AdminStats() {
  const { error, data } = useGetAdminStatsQuery();

  useEffect(() => {
    if (error) {
      toast.error(error.data.error);
    }
  }, [error]);

  return (
    <>
      <div className="row g-3 justify-content-center">
        <div className="col-12 col-md-4">
          <div className="bg-white rounded-2 p-4 stats1Border">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold stats1Color">{data?.totalUsers}</h1>
              <i className="bi bi-people-fill fs-2 stats1Color stats1bg"></i>
            </div>
            <p className="my-3 fs-5">Total Users</p>
          </div>
        </div>
        <div className="col-12 col-md-4">
          <div className=" bg-white rounded-2 p-4 stats2Border">
            <div className="d-flex justify-content-between align-items-center">
              <h1 className="fw-bold stats2Color">{data?.totalJobs}</h1>
              <i className="bi bi-suitcase-lg-fill fs-2 stats2Color stats2bg"></i>
            </div>
            <p className="my-3 fs-5">Total Jobs</p>
          </div>
        </div>
      </div>

      <div
        className="mx-auto mt-5"
        style={{ width: "100%", maxWidth: "970px" }}
      >
        <AdminChart adminStatsData={data} />
      </div>
    </>
  );
}

export default AdminStats;
