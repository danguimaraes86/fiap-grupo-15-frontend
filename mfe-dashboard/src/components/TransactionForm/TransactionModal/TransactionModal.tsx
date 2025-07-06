'use client';
import { useState, useEffect } from 'react';

type ModalType = 'edit' | 'delete';

interface TransactionModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (value?: number) => void;
  type: ModalType;
  currentValue?: number;
}

export function TransactionModal({
  show,
  onClose,
  onConfirm,
  type,
  currentValue
}: TransactionModalProps) {
  const [value, setValue] = useState(currentValue || 0);

  useEffect(() => {
    if (show) {
      setValue(currentValue || 0);
    }
  }, [show, currentValue]);

  const handleConfirm = () => {
    if (type === 'edit') {
      onConfirm(value);
    } else {
      onConfirm();
    }
    onClose();
  };

  if (!show) return null;

  return (
    <div className="modal show d-block" tabIndex={-1} style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {type === 'edit' ? 'Editar valor da transação' : 'Confirmar exclusão'}
            </h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {type === 'edit' ? (
              <div className="mb-3">
                <label htmlFor="valorInput" className="form-label">Novo valor</label>
                <input
                  type="number"
                  className="form-control"
                  id="valorInput"
                  value={value}
                  onChange={(e) => setValue(Number(e.target.value))}
                  placeholder="Digite o novo valor"
                />
              </div>
            ) : (
              <p className="mb-0">Tem certeza que deseja excluir esta transação?</p>
            )}
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button
              type="button"
              className={`btn ${type === 'edit' ? 'btn-primary' : 'btn-danger'}`}
              onClick={handleConfirm}
            >
              {type === 'edit' ? 'Salvar' : 'Excluir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
