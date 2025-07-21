import { useState } from "react";
import { NumericFormat } from "react-number-format";
import img_transactions_left from "../../assets/images/transactions-left.png";
import img_transactions_right from "../../assets/images/transactions-right.png";
import {
  Categoria,
  getCategorias,
  getTiposTransacao,
  type TipoTransacao,
} from "../../services/configs";
import { FileUploader } from "../../components/FileUploader";
import styles from "./TransactionForm.module.css";

type Props = {
  onSubmit: (
    selectedOption: string,
    transactionValue: string,
    selectedCategory: string,
    file: File | null
  ) => void;
};

const transactionOptions: TipoTransacao = await getTiposTransacao();
const categoriaOptions: Categoria = await getCategorias();

export function TransactionForm({ onSubmit }: Props) {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [transactionValue, setTransactionValue] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption) {
      setError("Selecione o tipo de transação.");
      return;
    }

    if (!selectedCategory) {
      setError("Selecione uma categoria.");
      return;
    }

    if (!transactionValue) {
      setError("Digite um valor.");
      return;
    }

    const parsedValue = parseFloat(transactionValue.replace(",", "."));

    if (isNaN(parsedValue)) {
      setError("Valor inválido.");
      return;
    }

    if (parsedValue < 0.01) {
      setError("O valor deve ser maior que R$ 0,01.");
      return;
    }

    if (parsedValue > 1000000) {
      setError("O valor máximo permitido é R$ 1.000.000,00.");
      return;
    }

    setError("");
    onSubmit(selectedOption, parsedValue.toFixed(2), selectedCategory, selectedFile);

    setSelectedOption("");
    setSelectedCategory("");
    setTransactionValue("");
    setSelectedFile(null);
  };

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

      <form className={styles.transactionForm} onSubmit={handleSubmit}>
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

        <select
          className="form-select mb-2"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Selecione uma categoria</option>
          {Object.entries(categoriaOptions).map(([key, label]) => (
            <option key={key} value={key}>
              {label}
            </option>
          ))}
        </select>

        <NumericFormat
          className="form-control mb-2"
          placeholder="R$ 0,00"
          thousandSeparator="."
          decimalSeparator=","
          prefix="R$ "
          decimalScale={2}
          fixedDecimalScale={true}
          allowNegative={false}
          allowLeadingZeros={false}
          value={transactionValue}
          onValueChange={({ floatValue }) =>
            setTransactionValue(floatValue?.toString() || "")
          }
        />

        <FileUploader onFileSelect={setSelectedFile} />

        {error && <div className="text-danger mb-2">{error}</div>}

        <button className="btn btn-dark w-100" type="submit">
          Concluir transação
        </button>
      </form>
    </div>
  );
}
