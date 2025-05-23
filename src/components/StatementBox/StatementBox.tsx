import styles from './StatementBox.module.css';
import { formatCurrencyBRL } from '@utils';

type StatementItem = {
  id: number;
  usuarioId: number;
  tipo: string;
  valor: number;
  data: any;
};

type Props = {
  title: string;
  items: any[];
};

export function StatementBox({ items, title }: Props) {
  return (
    <div className={styles.box}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h6 className="mb-0">{title}</h6>
      </div>

      {items && items.length > 0 ? (
        items.map(({ id, usuarioId, tipo, valor, data }) => (
          <strong key={id}>
            <div className={styles.item}>
              <div className="d-flex align-items-center justify-content-between mb-1">
                <span>{tipo}</span>
                <div className="d-flex align-items-center gap-2">
                  <span><i className="bi bi-pencil-fill"></i></span>
                  <span><i className="bi bi-trash3-fill"></i></span>
                </div>
              </div>
              <span>{formatCurrencyBRL(valor)}</span>
            </div>

          </strong>
        ))
      ) : (
        <p>Nenhum item encontrado.</p>
      )}
    </div>
  );
}
