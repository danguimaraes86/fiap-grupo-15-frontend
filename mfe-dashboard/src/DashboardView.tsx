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
import { createTransacao, getTransacaoList } from "./services/transacoes";
import { getUsuarioLogado } from "./services/usuarios";
import { agruparTransacoesPorMes, formatCurrencyBRL, parseDate } from "./utils";

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

  const showToast = (message: string, type: "success" | "error") => {
    setToastMessage(""); // força re-render
    setTimeout(() => {
      setToastType(type);
      setToastMessage(message);
    }, 10); // pequeno delay para garantir novo ciclo de renderização
  };

  const handleSubmit = async (
    selectedOption: string,
    transactionValue: string
  ) => {
    if (!selectedOption || !transactionValue) {
      showToast("Preencha todos os campos para concluir a transação.", "error");
      return;
    }

    try {
      await createTransacao({
        descricao: "descrição",
        valor: parseFloat(transactionValue),
        tipoTransacao: selectedOption,
      });

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
