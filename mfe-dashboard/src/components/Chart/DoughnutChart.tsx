import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

type ChartProps = {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
};

const DoughnutChart: React.FC<ChartProps> = ({ labels, datasets }) => {
  const data = { labels, datasets };

  const defaultData = {
    labels: ["Nenhum valor registrado"],
    datasets: [
      {
        label: "",
        data: [100],
        backgroundColor: ["#a5a5a5ff"],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div
      className="col-12 col-md-10 col-xl-12 mx-auto"
      style={{
        minHeight: "300px",
        height: "25vh",
        display: "flex",
        justifyContent: "center",
        alignContent: "center",
      }}
    >
      {labels && datasets ? (
        <Doughnut data={data} options={options} />
      ) : (
        <Doughnut data={defaultData} options={options} />
      )}
    </div>
  );
};

export default DoughnutChart;
