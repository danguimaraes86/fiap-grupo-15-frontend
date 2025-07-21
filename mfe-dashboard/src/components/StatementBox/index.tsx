import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useState } from "react";
import { TipoTransacao } from "../../services/configs";
import { deleteTransacao, updateTransacao } from "../../services/transacoes";
import { formatCurrencyBRL } from "../../utils/currency/formatCurrency";
import { ToastMessage } from "../toast";
import { TransactionModal } from "../TransactionForm/TransactionModal/TransactionModal";
import styles from "./StatementBox.module.css";

type Props = {
  title: string;
  items: {
    mesAno: string;
    transacoes: {
      id: number;
      tipo: string;
      valor: number;
      data: string;
    }[];
  }[];
  onUpdate: () => void;
  onBalanceUpdate: () => void;
};

const PAGE_SIZE = 7;

export function StatementBox({
  items,
  title,
  onUpdate,
  onBalanceUpdate,
}: Props) {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState<"edit" | "delete">("edit");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [selectedValue, setSelectedValue] = useState<number>(0);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");
  const [showToast, setShowToast] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filtroTipo, setFiltroTipo] = useState("");
  const [filtroMes, setFiltroMes] = useState("");
  const [filtroValor, setFiltroValor] = useState("");

  const [paginaAtual, setPaginaAtual] = useState(1);

  const showToastMsg = (msg: string, type: "success" | "error") => {
    setShowToast(false);
    setTimeout(() => {
      setToastMessage(msg);
      setToastType(type);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }, 10);
  };

  const openModal = (type: "edit" | "delete", id: number, value?: number) => {
    setModalType(type);
    setSelectedId(id);
    setSelectedValue(value || 0);
    setModalShow(true);
  };

  function normalizarTipoTransacao(tipo: string) {
    return TipoTransacao.deposito == tipo ? "deposito" : "transferencia";
  }

  const transacoesFiltradas = items
    .map(({ mesAno, transacoes }) =>
      transacoes
        .filter(({ tipo, valor }) => {
          const tipoMatch =
            !filtroTipo || tipo.toLowerCase() === filtroTipo.toLowerCase();
          const mesMatch =
            !filtroMes || mesAno.toLowerCase() === filtroMes.toLowerCase();
          const valorMatch = !filtroValor || valor >= Number(filtroValor);
          return tipoMatch && mesMatch && valorMatch;
        })
        .map((t) => ({ ...t, mesAno }))
    )
    .flat();

  const totalPaginas = Math.ceil(transacoesFiltradas.length / PAGE_SIZE);

  const pagina = Math.max(1, Math.min(paginaAtual, totalPaginas || 1));
  const inicio = (pagina - 1) * PAGE_SIZE;
  const fim = inicio + PAGE_SIZE;
  const transacoesPaginadas = transacoesFiltradas.slice(inicio, fim);

  const transacoesAgrupadas: { mesAno: string; transacoes: typeof transacoesPaginadas }[] = [];
  transacoesPaginadas.forEach((t) => {
    const idx = transacoesAgrupadas.findIndex((g) => g.mesAno === t.mesAno);
    if (idx > -1) {
      transacoesAgrupadas[idx].transacoes.push(t);
    } else {
      transacoesAgrupadas.push({ mesAno: t.mesAno, transacoes: [t] });
    }
  });

  return (
    <div className={styles.box}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="mb-1">{title}</h4>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="btn btn-sm"
        >
          {showFilters ? "Ocultar ▲" : "Filtrar ▼"}
        </button>
      </div>

      {showFilters && (
        <div className="mb-3">
          <div className="d-flex gap-2 flex-wrap">
            <select
              className="form-select form-select-sm"
              value={filtroTipo}
              onChange={(e) => {
                setFiltroTipo(e.target.value);
                setPaginaAtual(1);
              }}
            >
              <option value="">Tipo (todos)</option>
              <option value="Depósito">Depósito</option>
              <option value="Transferência">Transferência</option>
            </select>

            <select
              className="form-select form-select-sm"
              value={filtroMes}
              onChange={(e) => {
                setFiltroMes(e.target.value);
                setPaginaAtual(1);
              }}
            >
              <option value="">Mês (todos)</option>
              {items.map(({ mesAno }) => (
                <option key={mesAno} value={mesAno}>
                  {mesAno}
                </option>
              ))}
            </select>

            <input
              className="form-control form-control-sm"
              type="number"
              placeholder="Valor mínimo"
              value={filtroValor}
              onChange={(e) => {
                setFiltroValor(e.target.value);
                setPaginaAtual(1);
              }}
            />
          </div>
        </div>
      )}

      {transacoesFiltradas.length === 0 && <p>Nenhum item encontrado.</p>}

      {transacoesAgrupadas.map(({ mesAno, transacoes }) => (
        <div key={mesAno}>
          <div className="fw-bold small" style={{ color: "#004D61" }}>
            {mesAno}
          </div>

          {transacoes.map(({ id, tipo, valor, data }) => (
            <div key={id} className={`${styles.item} mt-2`}>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <div>{tipo}</div>
                  <div className="fw-bold">
                    {tipo === "Transferência"
                      ? `- ${formatCurrencyBRL(valor)}`
                      : formatCurrencyBRL(valor)}
                  </div>
                </div>
                <div className="text-end small text-muted">
                  {!isNaN(new Date(data).getTime())
                    ? format(new Date(data), "dd/MM/yyyy", {
                        locale: ptBR,
                      })
                    : "Data inválida"}

                  <div className="d-flex gap-2 justify-content-end">
                    <span onClick={() => openModal("edit", id, valor)}>
                      <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-pencil-fill"
                      ></i>
                    </span>
                    <span onClick={() => openModal("delete", id)}>
                      <i
                        style={{ cursor: "pointer" }}
                        className="bi bi-trash3-fill"
                      ></i>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

    {totalPaginas > 1 && (
      <div className="d-flex justify-content-center align-items-center mt-3" style={{ gap: 4 }}>
        <button
          className="btn btn-light btn-sm"
          onClick={() => setPaginaAtual(1)}
          disabled={pagina === 1}
          title="Primeira página"
        >
          <i className="bi bi-chevron-double-left"></i>
        </button>
        <button
          className="btn btn-light btn-sm"
          onClick={() => setPaginaAtual((old) => Math.max(1, old - 1))}
          disabled={pagina === 1}
          title="Anterior"
        >
          <i className="bi bi-arrow-left-circle-fill"></i>
        </button>
        <span style={{ minWidth: 70, textAlign: "center" }}>
          {pagina} / {totalPaginas}
        </span>
        <button
          className="btn btn-light btn-sm"
          onClick={() =>
            setPaginaAtual((old) => Math.min(totalPaginas, old + 1))
          }
          disabled={pagina === totalPaginas}
          title="Próxima"
        >
          <i className="bi bi-arrow-right-circle-fill"></i>
        </button>
        <button
          className="btn btn-light btn-sm"
          onClick={() => setPaginaAtual(totalPaginas)}
          disabled={pagina === totalPaginas}
          title="Última página"
        >
          <i className="bi bi-chevron-double-right"></i>
        </button>
      </div>
    )}

      <TransactionModal
        show={modalShow}
        onClose={() => setModalShow(false)}
        onConfirm={async (value) => {
          if (modalType === "edit") {
            if (selectedId !== null && value !== undefined) {
              const transacaoOriginal = items
                .flatMap((item) => item.transacoes)
                .find((t) => t.id === selectedId);

              if (!transacaoOriginal) {
                showToastMsg("Transação não encontrada.", "error");
                return;
              }

              try {
                await updateTransacao(selectedId, {
                  descricao: "descrição",
                  valor: value,
                  tipoTransacao: normalizarTipoTransacao(
                    transacaoOriginal.tipo
                  ),
                });
                onUpdate();
                onBalanceUpdate();
                showToastMsg(
                  `Transação ${selectedId} atualizada com sucesso!`,
                  "success"
                );
              } catch (error) {
                showToastMsg("Erro ao atualizar transação.", "error");
              }
            }
          } else {
            if (selectedId !== null) {
              try {
                await deleteTransacao(selectedId);
                onUpdate();
                onBalanceUpdate();
                showToastMsg(
                  `Transação ${selectedId} excluída com sucesso!`,
                  "success"
                );
              } catch (error) {
                showToastMsg("Erro ao excluir transação. " + error, "error");
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
