import React from "react";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

type Props = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor?: string;
    tension?: number;
  }[];
};

const LineChart: React.FC<Props> = ({ labels, datasets }) => {
  const data = { labels, datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="_box_svgy3_1" style={{ minHeight: "fit-content", height: "fit-content", display: "flex", justifyContent: "center", alignContent: "center", width: "100%", marginTop: "20px", marginBottom: "20px" }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
