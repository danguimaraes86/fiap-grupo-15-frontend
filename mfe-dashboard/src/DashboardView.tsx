import { useEffect, useState } from "react";
import { DashboardCard } from "./components/DashboardCard";
import { Header } from "./components/layout/Header";
import { MobileMenu } from "./components/layout/MobileMenu";
import { Sidebar } from "./components/layout/Sidebar";
import { TabletMenu } from "./components/layout/TabletMenu";
import { StatementBox } from "./components/StatementBox";
import { ToastMessage } from "./components/toast";
import { TransactionForm } from "./components/TransactionForm";
import { getSaldoUsuario } from "./services/saldos";
import {
  createTransacao,
  getTransacaoList,
  type TransacaoRequest,
} from "./services/transacoes";
import { getUsuarioLogado } from "./services/usuarios";
import { agruparTransacoesPorMes, formatCurrencyBRL, parseDate } from "./utils";
import DoughnutChart from "./components/Chart/DoughnutChart";

const menuItems = [
  { label: "Início", href: "#" },
  { label: "Transferências", href: "#" },
  { label: "Investimentos", href: "#" },
  { label: "Outros serviços", href: "#" },
];

const dashboardCardList = {
  accountType: "Conta Corrente",
};

const usuario = await getUsuarioLogado();

export default function DashboardView() {
  const [balance, setBalance] = useState<number>(0);
  const [listTransactions, setListTransactions] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState("");

  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [labels, setLabels] = useState<string[]>([]);
  const [datasets, setDatasets] = useState<
    {
      label: string;
      data: number[];
      backgroundColor: string[];
      borderWidth: number;
    }[]
  >([]);

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(""); // força re-render
    setTimeout(() => {
      setToastType(type);
      setToastMessage(message);
    }, 10); // pequeno delay para garantir novo ciclo de renderização
  };

  const handleSubmit = async (
    selectedOption: string,
    transactionValue: string,
    selectedCategory: string,
    file: File | null
  ) => {
    if (!selectedOption || !transactionValue) {
      showToast("Preencha todos os campos para concluir a transação.", "error");
      return;
    }

    try {
      let transacaoRequest: TransacaoRequest = {
        descricao: "descrição",
        valor: parseFloat(transactionValue),
        tipoTransacao: selectedOption,
      };
      if (selectedCategory.length > 0) {
        transacaoRequest = { ...transacaoRequest, categoria: selectedCategory };
      }

      await createTransacao(transacaoRequest, file);

      showToast("Transação enviada com sucesso!", "success");
      await transactionsList();
      await fetchBalance();
    } catch (error) {
      showToast(error as string, "error");
    }
  };

  const fetchBalance = async () => {
    try {
      const saldo = await getSaldoUsuario();
      setBalance(saldo);
    } catch (error) {
      showToast("Erro ao carregar saldo.", "error");
    }
  };

  const transactionsList = async () => {
    try {
      const transacaoList = await getTransacaoList();
      if (!Array.isArray(transacaoList)) throw new Error("Resposta inválida");
      const agrupadas = agruparTransacoesPorMes(transacaoList);
      const grouped = agrupadas?.[0].transacoes?.reduce<Record<string, number>>(
        (acc, curr) => {
          acc[curr.categoria] = (acc[curr.categoria] || 0) + curr.valor;
          return acc;
        },
        {}
      );

      // 2. Pegar labels e dados
      const labels = Object.keys(grouped);
      const data = Object.values(grouped);

      // Cores para categorias, com "Entrada" sempre verde
      const predefinedColors: Record<string, string> = {
        Entrada: "#2ecc71", // verde
        Saída: "#e74c3c", // vermelho
        Investimento: "#9b59b6", // roxo
        Transferência: "#3498db", // azul
        Outro: "#f1c40f", // amarelo
      };

      // Cores extras caso existam categorias não mapeadas
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

      // Mapear as cores baseadas no nome da categoria (label)
      const backgroundColor = labels.map(
        (label, i) =>
          predefinedColors[label] || fallbackColors[i % fallbackColors.length]
      );

      // 4. Montar datasets para o DoughnutChart
      const datasets = [
        {
          label: "Valores por tipo",
          data,
          backgroundColor,
          borderWidth: 1,
        },
      ];

      // Agora você pode passar labels e datasets para o DoughnutChart
      setLabels(labels);
      setDatasets(datasets);
      setListTransactions(agrupadas);
    } catch (error) {
      showToast("Erro ao carregar transações.", "error");
    }
  };

  useEffect(() => {
    fetchBalance();
    transactionsList();
    setCurrentDate(parseDate(new Date()));
  }, []);

  return (
    <main className="bg-[#eaf2e4] min-h-screen">
      <Header userName={usuario.nome} />
      <MobileMenu
        items={menuItems}
        active={""}
        forceVisible={false}
      />
      <TabletMenu items={menuItems} />

      <div className="container-xl mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="row gx-4">
              <div className="col-xl-2 d-none d-xl-block">
                <Sidebar items={menuItems} />
              </div>
              <div className="col-12 col-md-10 col-xl-7 mx-auto">
                <DashboardCard
                  name={usuario.nome}
                  date={currentDate}
                  accountType={dashboardCardList.accountType}
                  balance={formatCurrencyBRL(balance)}
                />
                <TransactionForm onSubmit={handleSubmit} />
                <DoughnutChart labels={labels} datasets={datasets} />
              </div>
              <div className="col-12 col-md-10 col-xl-3 mx-auto">
                <StatementBox
                  title="Extrato"
                  items={listTransactions}
                  onUpdate={transactionsList}
                  onBalanceUpdate={fetchBalance}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {toastMessage && <ToastMessage type={toastType} message={toastMessage} />}
    </main>
  );
}