'use client';
import { useEffect, useState } from 'react';
import {
  Header,
  Sidebar,
  TabletMenu,
  MobileMenu,
  DashboardCard,
  TransactionForm,
  StatementBox,
  ToastMessage
} from '@components';
import { criarTransacao, listarTransacoes } from '@services/transacoes';
import { getUsuario } from '@services/usuarios';
import { getSaldo } from '@services/saldos';
import { formatCurrencyBRL, parseDate, agruparTransacoesPorMes } from '@utils';

const menuItems = [
  { label: "Início", href: "#" },
  { label: "Transferências", href: "#" },
  { label: "Investimentos", href: "#" },
  { label: "Outros serviços", href: "#" }
];

const dashboardCardList = {
  accountType: "Conta Corrente",
};

const transactionOptions = ['Transferência', 'Depósito'];

export default function DashboardView() {
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState('');
  const [user, setUser] = useState('');
  const [balance, setBalance] = useState('');
  const [listTransactions, setListTransactions] = useState<any[]>([]);
  const [currentDate, setCurrentDate] = useState('');

  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');

  const showToast = (message: string, type: 'success' | 'error') => {
    setToastMessage(''); // força re-render
    setTimeout(() => {
      setToastType(type);
      setToastMessage(message);
    }, 10); // pequeno delay para garantir novo ciclo de renderização
  };

  const handleSubmit = async () => {
    if (!selectedOption || !amount) {
      showToast("Preencha todos os campos para concluir a transação.", 'error');
      return;
    }

    try {
      await criarTransacao({
        usuarioId: 1,
        tipo: selectedOption,
        valor: parseFloat(amount),
        data: new Date().toISOString().split('T')[0]
      });

      showToast("Transação enviada com sucesso!", 'success');
      setAmount('');
      setSelectedOption('');
      await transactionsList();
      await fetchBalance();
    } catch (error) {
      showToast("Erro ao enviar transação. Tente novamente.", 'error');
    }
  };

  const fetchUser = async () => {
    try {
      const data = await getUsuario();
      setUser(data.nome);
    } catch (error) {
      showToast("Erro ao obter dados do usuário.", 'error');
    }
  };

  const fetchBalance = async () => {
    try {
      const data = await getSaldo();
      setBalance(data[0].saldo);
    } catch (error) {
      showToast("Erro ao carregar saldo.", 'error');
    }
  };

  const transactionsList = async () => {
    try {
      const data = await listarTransacoes();
      if (!Array.isArray(data)) throw new Error('Resposta inválida');
      const agrupadas = agruparTransacoesPorMes(data);
      setListTransactions(agrupadas);
    } catch (error) {
      showToast("Erro ao carregar transações.", 'error');
    }
  };

  useEffect(() => {
    fetchUser();
    fetchBalance();
    transactionsList();
    setCurrentDate(parseDate(new Date()));
  }, []);

  return (
    <main className="bg-[#eaf2e4] min-h-screen">
      <Header userName={user} />
      <MobileMenu items={menuItems} />
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
                  name={user}
                  date={currentDate}
                  accountType={dashboardCardList.accountType}
                  balance={formatCurrencyBRL(balance)}
                />
                <TransactionForm
                  title="Nova transação"
                  options={transactionOptions}
                  selectedOption={selectedOption}
                  onChangeOption={setSelectedOption}
                  value={amount}
                  onChangeValue={setAmount}
                  onSubmit={handleSubmit}
                />
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
