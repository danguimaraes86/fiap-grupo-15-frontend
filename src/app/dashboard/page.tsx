'use client';
import { useState } from 'react';
import {
  Header,
  Sidebar,
  TabletMenu,
  MobileMenu,
  DashboardCard,
  TransactionForm,
  StatementBox
} from '@components';

const menuItems = [
  { label: "Início", href: "#" },
  { label: "Transferências", href: "#" },
  { label: "Investimentos", href: "#" },
  { label: "Outros serviços", href: "#" }
];

const dashboardCardList = {
  name: "Joana",
  date: "Quinta-feira, 08/08/2024",
  accountType: "Conta Corrente",
  balance: "R$ 2.520,00"
};

const transactionOptions = ['Transferência', 'Depósito'];

const statementData = [
  {
    month: "Setembro",
    transactions: ["Transferência - R$ 23232,00", "Transferência - R$ 58,00"]
  },
  {
    month: "Agosto",
    transactions: ["Transferência - R$ 50,00", "Depósito - R$ 120,00", "Depósito - R$ 40,00"]
  },
  {
    month: "Julho",
    transactions: ["Transferência - R$ 420,00", "Transferência - R$ 180,00", "Depósito - R$ 60,00"]
  }
];

export default function DashboardView() {
  const [selectedOption, setSelectedOption] = useState('');
  const [amount, setAmount] = useState('');

  const handleSubmit = () => {
    console.log("Transação:", { tipo: selectedOption, valor: amount });
  };

  return (
    <main className="bg-[#eaf2e4] min-h-screen">
      <Header />
      <MobileMenu items={menuItems} />
      <TabletMenu items={menuItems} />

      <div className="container-xl mt-4">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-10">
            <div className="row">
              <div className="col-lg-2 d-none d-lg-block">
                <Sidebar items={menuItems} />
              </div>
              <div className="col-12 col-lg-7">
                <DashboardCard {...dashboardCardList} />
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
              <div className="col-12 col-lg-3">
                <StatementBox title="Extrato" items={statementData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
