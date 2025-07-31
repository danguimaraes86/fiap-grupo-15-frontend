import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useChartData } from "../../hooks/useChartData";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart: React.FC = () => {
  const chartData = useChartData();

  function verificaChartDataVazio() {
    return chartData.labels.length > 0 && chartData.datasets.length > 0;
  }

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
      {verificaChartDataVazio() ? (
        <Doughnut data={chartData} options={options} />
      ) : (
        <Doughnut data={defaultData} options={options} />
      )}
    </div>
  );
};

export default DoughnutChart;
