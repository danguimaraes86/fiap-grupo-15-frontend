import styles from './StatementBox.module.css';

type StatementItem = {
  month: string;
  transactions: string[];
};

type Props = {
  title: string;
  items: StatementItem[];
};

export function StatementBox({ title, items }: Props) {
  return (
    <div className={styles.box}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">{title}</h6>
        <div>🖨️ 🗑️</div>
      </div>

      {items.map(({ month, transactions }) => (
        <div key={month}>
          <strong>{month}</strong>
          {transactions.map((t, i) => (
            <div className={styles.item} key={i}>
              {t}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
