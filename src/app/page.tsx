import { Header, Sidebar, TabletMenu, MobileMenu, DashboardCard, TransactionForm, StatementBox } from '@components';

export default function Home() {
  return (
    <main className="bg-[#eaf2e4] min-h-screen">
  <Header />
  <MobileMenu />
  <TabletMenu />

  <div className="d-flex justify-content-center mt-4">
    <div className="w-100" style={{ maxWidth: '1200px' }}>
      <div className="row">
        <div className="col-xl-2 d-none d-xl-block">
          <Sidebar />
        </div>
        <div className="col-12 col-xl-7">
          <DashboardCard />
          <TransactionForm />
        </div>
        <div className="col-12 col-xl-3">
          <StatementBox />
        </div>
      </div>
    </div>
  </div>
</main>
  );
}
