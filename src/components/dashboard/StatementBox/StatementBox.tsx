import styles from './StatementBox.module.css';
import { formatCurrencyBRL } from '@utils';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useState } from 'react';
import { TransactionModal, ToastMessage } from '@components';
import { deleteTransacao, updateTransacao } from '@services/transacoes';

type Props = {
  title: string;
  items: {
    mesAno: string;
    transacoes: {
      id: number;
      usuarioId: number;
      tipo: string;
      valor: number;
      data: string;
    }[];
  }[];
  onUpdate: () => void;
  onBalanceUpdate: () => void;
};

export function StatementBox({ items, title, onUpdate, onBalanceUpdate }: Props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'delete'>('edit');
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<'success' | 'error'>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMsg = (msg: string, type: 'success' | 'error') => {
    setShowToast(false);
    setTimeout(() => {
      setToastMessage(msg);
      setToastType(type);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 10);
  };

  // abrir modal
  const openModal = (type: 'edit' | 'delete', id: number, value?: number) => {
    setModalType(type);
    setSelectedId(id);
    setSelectedValue(value || 0);
    setModalShow(true);
  };

  return (
    <div className={styles.box}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="mb-3">{title}</h4>
      </div>

      {items.length === 0 && <p>Nenhum item encontrado.</p>}

      {items.map(({ mesAno, transacoes }) => (
        <div key={mesAno}>
          <div className="fw-bold small" style={{ color: '#004D61' }}>{mesAno}</div>

          {transacoes.map(({ id, tipo, valor, data }) => (
            <div key={id} className={`${styles.item} mt-2`}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div>{tipo}</div>
                  <div className="fw-bold">
                    {tipo === 'Transferência' ? `- ${formatCurrencyBRL(valor)}` : formatCurrencyBRL(valor)}
                  </div>
                </div>
                <div className="text-end small text-muted">
                  {!isNaN(new Date(data).getTime())
                    ? format(new Date(parseISO(data)), 'dd/MM/yyyy', { locale: ptBR })
                    : 'Data inválida'}

                  <div className="d-flex gap-2 justify-content-end">
                    <span onClick={() => openModal('edit', id, valor)}>
                      <i style={{ cursor: 'pointer' }} className="bi bi-pencil-fill"></i>
                    </span>
                    <span onClick={() => openModal('delete', id)}>
                      <i style={{ cursor: 'pointer' }} className="bi bi-trash3-fill"></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <TransactionModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        onConfirm={async (value) => {
          if (modalType === 'edit') {
            if (selectedId !== null && value !== undefined) {
              const transacaoOriginal = items
                .flatMap((item) => item.transacoes)
                .find((t) => t.id === selectedId);

              if (!transacaoOriginal) {
                showToastMsg('Transação não encontrada.', 'error');
                return;
              }

              const payload = {
                usuarioId: transacaoOriginal.usuarioId,
                tipo: transacaoOriginal.tipo,
                valor: value,
                data: new Date().toISOString().split('T')[0],
                id: selectedId
              };

              try {
                await updateTransacao(selectedId, payload);
                onUpdate();
                onBalanceUpdate();
                showToastMsg(`Transação ${selectedId} atualizada com sucesso!`, 'success');
              } catch (error) {
                console.error(error);
                showToastMsg('Erro ao atualizar transação.', 'error');
              }
            }
          } else {
            if (selectedId !== null) {
              try {
                await deleteTransacao(selectedId);
                onUpdate();
                onBalanceUpdate();
                showToastMsg(`Transação ${selectedId} excluída com sucesso!`, 'success');
              } catch (error) {
                console.error(error);
                showToastMsg('Erro ao excluir transação.', 'error');
              }
            }
          }

          setModalShow(false);
        }}
        type={modalType}
        currentValue={selectedValue}
      />

      <ToastMessage message={toastMessage} type={toastType} show={showToast} />
    </div>
  );
}
