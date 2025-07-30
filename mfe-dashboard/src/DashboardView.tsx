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
import LineChart from "./components/Chart/LineChart";

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
  const [datasets, setDatasets] = useState<any[]>([]);

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

  function gerarDiasDoMes(): string[] {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth();
    const ultimoDia = new Date(ano, mes + 1, 0).getDate();

    const dias: string[] = [];

    for (let dia = 1; dia <= ultimoDia; dia++) {
      dias.push(
        `${dia.toString().padStart(2, "0")}/${(mes + 1)
          .toString()
          .padStart(2, "0")}`
      );
    }

    return dias;
  }

  function gerarTransacoesFalsas(): Transacao[] {
    const hoje = new Date();
    const ano = hoje.getFullYear();
    const mes = hoje.getMonth(); // 0-indexado
    const totalDias = new Date(ano, mes + 1, 0).getDate();
    const categorias = [
      "Educação",
      "Pets",
      "Não Classificado",
      "Entrada",
      "Transporte",
      "Lazer",
      "Moradia",
    ];

    const transacoes: Transacao[] = [];

    for (let dia = 1; dia <= totalDias; dia++) {
      const data = new Date(ano, mes, dia);
      const quantidadePorDia = Math.floor(Math.random() * 3); // até 2 transações por dia

      for (let i = 0; i < quantidadePorDia; i++) {
        const categoria =
          categorias[Math.floor(Math.random() * categorias.length)];
        const valor = Math.floor(Math.random() * 200) + 1;

        transacoes.push({
          id: dia * 10 + i,
          tipo: categoria === "Entrada" ? "Depósito" : "Despesa",
          valor,
          data: data.toISOString(),
          categoria,
        });
      }
    }

    return transacoes;
  }

  const transactionsList = async () => {
    try {
      const transacaoList = await getTransacaoList();
      if (!Array.isArray(transacaoList)) throw new Error("Resposta inválida");
      const agrupadas = agruparTransacoesPorMes(transacaoList);
      console.log(agrupadas);

      // Agrupar por categoria e por dia
      const transacoes = agrupadas.flatMap((grupo) => grupo.transacoes);

      // Agrupar por categoria e por dia
      const dataMap: Record<string, Record<string, number>> = {};

      for (const transacao of transacoes) {
        const date = new Date(transacao.data);
        const dia = `${date.getDate().toString().padStart(2, "0")}/${(
          date.getMonth() + 1
        )
          .toString()
          .padStart(2, "0")}`;
        const categoria = transacao.tipo || "Não Classificado";

        if (!dataMap[categoria]) dataMap[categoria] = {};
        dataMap[categoria][dia] =
          (dataMap[categoria][dia] || 0) + transacao.valor;
      }

      // Pegar todos os dias únicos e ordenar
      const diasDoMes = gerarDiasDoMes();

      // Cores fixas por categoria
      const corPorCategoria: Record<string, string> = {
        Depósito: "#006e06ff", // verde
        Transferência: "#fa0000ff", // laranja escuro
        Pets: "#f39c12", // laranja
        Transporte: "#3498db", // azul
        Lazer: "#9b59b6", // roxo
        Moradia: "#1abc9c", // verde água
        "Não Classificado": "#34495e", // cinza escuro
      };

      const fallbackColors = [
        "#ce0000ff",
        "#16a085",
        "#27ae60",
        "#f1c40f",
        "#d35400",
        "#c0392b",
        "#7f8c8d",
      ];

      // Montar datasets
      const datasets = Object.entries(dataMap).map(
        ([categoria, valores], index) => ({
          label: categoria,
          data: diasDoMes.map((dia) => valores[dia] ?? 0),
          borderColor:
            corPorCategoria[categoria] ||
            fallbackColors[index % fallbackColors.length],
          tension: 0.3,
        })
      );

      setLabels(diasDoMes);
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
        active={undefined}
        forceVisible={undefined}
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
                
              </div>
              <div className="col-12 col-md-10 col-xl-3 mx-auto">
              <LineChart labels={labels} datasets={datasets} />
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
