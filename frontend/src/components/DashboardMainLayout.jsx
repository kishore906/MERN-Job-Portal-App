import { Outlet } from "react-router-dom";
import DashboardSidebar from "./DashboardSidebar";

function DashboardMainLayout() {
  return (
    <div className="container-fluid dashboardMain border">
      <div className="row flex-column flex-xl-row">
        <DashboardSidebar />

        <div className="col pt-4 bg-light dashboardMainHeight">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardMainLayout;
