import styles from './TransactionForm.module.css';

type Props = {
  title: string;
  options: string[];
  selectedOption: string;
  value: string;
  onChangeValue: (val: string) => void;
  onChangeOption: (val: string) => void;
  onSubmit: () => void;
};

export function TransactionForm({
  title,
  options,
  selectedOption,
  value,
  onChangeValue,
  onChangeOption,
  onSubmit
}: Props) {
  return (
    <div className={`${styles.box}`}>
      <img
        src="/images/transaction-left.svg"
        alt=""
        className={`${styles['transaction-decoration']} ${styles.left}`}
      />
      <img
        src="/images/transaction-right.svg"
        alt=""
        className={`${styles['transaction-decoration']} ${styles.right}`}
      />

      <h6 className={styles.title}>{title}</h6>

      <form className={styles.transactionForm}>
        <select
          className="form-select mb-2"
          value={selectedOption}
          onChange={(e) => onChangeOption(e.target.value)}
        >
          <option value="">Selecione o tipo de transação</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="00,00"
          value={value}
          onChange={(e) => onChangeValue(e.target.value)}
        />
        <button className="btn btn-dark w-100" onClick={onSubmit}>
          Concluir transação
        </button>
      </form>
    </div>
  );
}
