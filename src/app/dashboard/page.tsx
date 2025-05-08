
import { Header, Nav } from '@components';
import './page.css'

export default function DashboardView() {
  return (
    <div>
      <div className="col-xl-12">
        <Header />
      </div>

      <div className='container'>
        <div className="row">
          <div className="col-2">
            <Nav />
          </div>
          <div className="col-6">
            <div className="card">
              Cartão
            </div>
            <div className="card">
            Nova transação
            </div>
          </div>
          <div className="col-4">
          <div className="card">
              Extrato
          </div>
          </div>
        </div>
      </div>
    </div>
  );
}
