import { useState } from "react";
import img_transactions_left from "../../assets/images/transactions-left.png";
import img_transactions_right from "../../assets/images/transactions-right.png";
import {
  Categoria,
  getCategorias,
  getTiposTransacao,
  type TipoTransacao,
} from "../../services/configs";
import styles from "./TransactionForm.module.css";

type Props = {
  onSubmit: (selectedOption: string, transactionValue: string) => void;
};

const transactionOptions: TipoTransacao = await getTiposTransacao();
const categoriaOptions: Categoria = await getCategorias();
console.log(categoriaOptions);

export function TransactionForm({ onSubmit }: Props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [transactionValue, setTransactionValue] = useState("");

  return (
    <div className={`${styles.box}`}>
      <img
        src={img_transactions_left}
        alt=""
        className={`${styles["transaction-decoration"]} ${styles.left}`}
      />
      <img
        src={img_transactions_right}
        alt=""
        className={`${styles["transaction-decoration"]} ${styles.right}`}
      />

      <h6 className={styles.title}>Nova transação</h6>

      <form className={styles.transactionForm}>
        <select
          className="form-select mb-2"
          value={selectedOption}
          onChange={(e) => setSelectedOption(e.target.value)}
        >
          <option value="">Selecione o tipo de transação</option>
          {Object.entries(transactionOptions).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>
        <input
          className="form-control mb-2"
          type="text"
          placeholder="00,00"
          value={transactionValue}
          onChange={(e) => setTransactionValue(e.target.value)}
        />
        <button
          className="btn btn-dark w-100"
          onClick={(e) => {
            e.preventDefault();
            onSubmit(selectedOption, transactionValue);
            setSelectedOption("");
            setTransactionValue("");
          }}
        >
          Concluir transação
        </button>
      </form>
    </div>
  );
}
