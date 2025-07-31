import { useRecoilValue } from "recoil";
import { transactionListState } from "../recoil/atoms";

interface DataChart {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

const predefinedColors: Record<string, string> = {
  Entrada: "#2ecc71",
  Saída: "#e74c3c",
  Investimento: "#9b59b6",
  Transferência: "#3498db",
  Outro: "#f1c40f",
};

const fallbackColors = [
  "#1abc9c",
  "#f39c12",
  "#34495e",
  "#7f8c8d",
  "#d35400",
  "#c0392b",
  "#16a085",
  "#27ae60",
  "#2980b9",
  "#8e44ad",
];

export function useChartData(): DataChart {
  const transacaoList = useRecoilValue(transactionListState);

  if (transacaoList.length == 0) {
    return { labels: [], datasets: [] };
  }

  const grouped = transacaoList?.[0].transacoes?.reduce<Record<string, number>>(
    (acc, curr) => {
      acc[curr.categoria] = (acc[curr.categoria] || 0) + curr.valor;
      return acc;
    },
    {}
  );

  const labels = Object.keys(grouped);
  const data = Object.values(grouped);

  const backgroundColor = labels.map(
    (label, i) =>
      predefinedColors[label] || fallbackColors[i % fallbackColors.length]
  );

  const datasets = [
    {
      label: "Valores por tipo",
      data,
      backgroundColor,
      borderWidth: 1,
    },
  ];

  return { labels, datasets };
}
