'use client';
import styles from './DashboardCard.module.css';
import { useState } from 'react';

type Props = {
  name: string;
  date: string;
  accountType: string;
  balance: string;
};

export function DashboardCard({ name, date, accountType, balance }: Props) {
  const [mostrarSaldo, setMostrarSaldo] = useState(false);

  const toggleSaldo = () => {
    setMostrarSaldo(prev => !prev);
  };
  return (
    <div className={styles.cardContainer}>
      <div className={styles.card}>
        <div className={styles.colunaEsquerda}>
          <h3>Olá, {name}! :)</h3>
          <p>{date}</p>
        </div>
        <div className={styles.colunaDireita}>
          <div className={styles.headerSaldo}>
            <span className={styles.label}>Saldo</span>
            <span className={styles.botaoOlho} onClick={toggleSaldo}>
              {mostrarSaldo ? (
                <i className="bi bi-eye-slash-fill" style={{ color: '#FF5031' }}></i>
              ) : (
                <i className="bi-eye-fill" style={{ color: '#FF5031' }}></i>
              )}
            </span>
          </div>
          <hr className={styles.hr} />
          <div>
            <h5>{accountType}</h5>
            <h3>{mostrarSaldo ? balance : '••••••••'}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}
