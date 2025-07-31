import { useState } from "react";
import { useRecoilValue } from "recoil";
import { accountTypeState, saldoState } from "../../recoil/atoms";
import { parseDate } from "../../utils";
import { formatCurrencyBRL } from "../../utils/currency/formatCurrency";
import styles from "./DashboardCard.module.css";

type Props = {
  name: string;
};

export function DashboardCard({ name }: Props) {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);
  const saldo = useRecoilValue(saldoState);
  const accountType = useRecoilValue(accountTypeState);

  const toggleSaldo = () => {
    setMostrarSaldo((prev) => !prev);
  };
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.colunaEsquerda}>
          <h3>Olá, {name}! :)</h3>
          <p>{parseDate(new Date())}</p>
        </div>
        <div className={styles.colunaDireita}>
          <div className={styles.headerSaldo}>
            <span className={styles.label}>Saldo</span>
            <span className={styles.botaoOlho} onClick={toggleSaldo}>
              {mostrarSaldo ? (
                <i
                  className="bi bi-eye-slash-fill"
                  style={{ color: "#FF5031" }}
                ></i>
              ) : (
                <i className="bi-eye-fill" style={{ color: "#FF5031" }}></i>
              )}
            </span>
          </div>
          <hr className={styles.hr} />
          <div>
            <h5>{accountType}</h5>
            <h3>{mostrarSaldo ? formatCurrencyBRL(saldo) : "••••••••"}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
