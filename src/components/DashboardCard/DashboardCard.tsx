import styles from './DashboardCard.module.css';

type Props = {
  name: string;
  date: string;
  accountType: string;
  balance: string;
};

export function DashboardCard({ name, date, accountType, balance }: Props) {
  return (
    <div className={`${styles.card} mb-4`}>
      <h5>Olá, {name}! :)</h5>
      <p>{date}</p>
      <hr />
      <div className="d-flex justify-content-between">
        <strong>Saldo</strong>
        <span role="img" aria-label="olho">👁</span>
      </div>
      <div>{accountType}</div>
      <h4>{balance}</h4>
    </div>
  );
}
