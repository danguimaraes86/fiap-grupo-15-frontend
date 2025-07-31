import { useEffect, useState } from "react";
import { useSetRecoilState } from "recoil";
import DoughnutChart from "./components/Chart/DoughnutChart";
import { DashboardCard } from "./components/DashboardCard";
import { Header } from "./components/layout/Header";
import { MobileMenu } from "./components/layout/MobileMenu";
import { Sidebar } from "./components/layout/Sidebar";
import { TabletMenu } from "./components/layout/TabletMenu";
import { StatementBox } from "./components/StatementBox";
import { ToastMessage } from "./components/toast";
import { TransactionForm } from "./components/TransactionForm";
import { saldoState, transactionListState } from "./recoil/atoms";
import { getSaldoUsuario } from "./services/saldos";
import {
  createTransacao,
  getTransacaoList,
  type TransacaoRequest,
} from "./services/transacoes";
import { getUsuarioLogado } from "./services/usuarios";
import { agruparTransacoesPorMes } from "./utils";

const menuItems = [
  { label: "Início", href: "#" },
  { label: "Transferências", href: "#" },
  { label: "Investimentos", href: "#" },
  { label: "Outros serviços", href: "#" },
];

const usuario = await getUsuarioLogado();

export default function DashboardView() {
  const setSaldo = useSetRecoilState(saldoState);
  const setTransactionList = useSetRecoilState(transactionListState);

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
      setSaldo(await getSaldoUsuario());
    } catch (error) {
      showToast("Erro ao carregar saldo.", "error");
    }
  };

  const transactionsList = async () => {
    try {
      const transacaoList = await getTransacaoList();
      if (!Array.isArray(transacaoList)) throw new Error("Resposta inválida");
      const agrupadas = agruparTransacoesPorMes(transacaoList);
      setTransactionList(agrupadas);
    } catch (error) {
      showToast("Erro ao carregar transações.", "error");
    }
  };

  useEffect(() => {
    fetchBalance();
    transactionsList();
  }, []);

  return (
    <main className="bg-[#eaf2e4] min-h-screen">
      <Header userName={usuario.nome} />
      <MobileMenu items={menuItems} active={""} forceVisible={false} />
      <TabletMenu items={menuItems} />

      <div className="container-xl mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-xl-10">
            <div className="row gx-4">
              <div className="col-xl-2 d-none d-xl-block">
                <Sidebar items={menuItems} />
              </div>
              <div className="col-12 col-md-10 col-xl-7 mx-auto">
                <DashboardCard name={usuario.nome} />
                <TransactionForm onSubmit={handleSubmit} />
                <DoughnutChart />
              </div>
              <div className="col-12 col-md-10 col-xl-3 mx-auto">
                <StatementBox
                  title="Extrato"
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
