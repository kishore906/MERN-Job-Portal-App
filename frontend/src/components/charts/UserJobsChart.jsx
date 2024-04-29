import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function UserJobsChart({ userJobsData }) {
  const options = {
    responsive: true,
    interaction: {
      mode: "index",
      intersect: false,
    },
    stacked: false,
    plugins: {
      title: {
        display: true,
        text: "Data related to jobs applied in each month",
      },
    },
    scales: {
      y: {
        type: "linear",
        display: true,
        position: "left",
      },
    },
  };

  // const labels = [
  //   "January",
  //   "February",
  //   "March",
  //   "April",
  //   "May",
  //   "June",
  //   "July",
  //   "August",
  // ];

  const labels = userJobsData?.jobsAppliedCountInMonths?.map(
    (data) => data?.month
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Jobs Applied",
        //data: [12, 45, 68, 45, 23],
        data: userJobsData?.jobsAppliedCountInMonths?.map(
          (data) => data?.count
        ),
        borderColor: "#198753",
        backgroundColor: "rgba(42, 117, 83, 0.5)",
        yAxisID: "y",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
