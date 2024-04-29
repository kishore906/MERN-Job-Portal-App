import DashboardHeader from "../components/DashboardHeader";
import DashboardMainLayout from "../components/DashboardMainLayout";

function Dashboard() {
  return (
    <div className="overflow-hidden">
      <DashboardHeader />
      <DashboardMainLayout />
    </div>
  );
}

export default Dashboard;
