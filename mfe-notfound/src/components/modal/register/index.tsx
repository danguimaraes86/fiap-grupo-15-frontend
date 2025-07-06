import { useState } from "react";
import img_modal_register from "../../../assets/images/register.png";
import "./index.css";

interface Props {
  closeModal: () => void;
}

export default function Register({ closeModal }: Props) {
  const [isChecked, setIsChecked] = useState<string>(" ");
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    aceitaPolitica: false,
  });
  const [errors, setErrors] = useState({
    nome: "",
    email: "",
    senha: "",
    aceitaPolitica: "",
  });

  const handleIsChecked = () => {
    setIsChecked((prev) => (prev === " " ? "X" : " "));
    setFormData((prev) => ({ ...prev, aceitaPolitica: !prev.aceitaPolitica }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors: typeof errors = {
      nome: "",
      email: "",
      senha: "",
      aceitaPolitica: "",
    };
    let valid = true;

    if (!formData.nome.trim()) {
      newErrors.nome = "O nome é obrigatório.";
      valid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = "O email é obrigatório.";
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Digite um email válido.";
      valid = false;
    }
    if (!formData.senha.trim()) {
      newErrors.senha = "A senha é obrigatória.";
      valid = false;
    }
    if (!formData.aceitaPolitica) {
      newErrors.aceitaPolitica = "Você deve aceitar a política de privacidade.";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Formulário enviado com sucesso!");
      // Aqui você pode fazer o envio real do formulário
    }
  };

  return (
    <div className="register-overlay">
      <div className="register-container">
        <button
          style={{
            border: "none",
            background: "rgba(0,0,0,0)",
            marginLeft: "auto",
          }}
          onClick={closeModal}
        >
          X
        </button>
        <img
          className="col "
          src={img_modal_register}
          alt="Banner de cadastro"
          style={{ maxHeight: "267px" }}
        />
        <h5>
          <strong>
            Preencha os campos abaixo para criar sua conta corrente!
          </strong>
        </h5>
        <form onSubmit={handleSubmit} noValidate>
          <div className="row mb-3">
            <div className="col-md-12 inputForm">
              <label htmlFor="nome" className="form-label">
                Nome
              </label>
              <input
                type="text"
                className={`form-control ${errors.nome ? "is-invalid" : ""}`}
                id="nome"
                placeholder="Digite seu nome"
                value={formData.nome}
                onChange={handleChange}
              />
              {errors.nome && (
                <div className="invalid-feedback">{errors.nome}</div>
              )}
            </div>

            <div className="col-md-12 inputForm">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                id="email"
                placeholder="Digite seu email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <div className="invalid-feedback">{errors.email}</div>
              )}
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-12 inputForm">
              <label htmlFor="senha" className="form-label">
                Senha
              </label>
              <input
                type="password"
                className={`form-control ${errors.senha ? "is-invalid" : ""}`}
                id="senha"
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
              />
              {errors.senha && (
                <div className="invalid-feedback">{errors.senha}</div>
              )}
            </div>
          </div>

          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <button
              style={{
                height: "24px",
                width: "24px",
                minWidth: "24px",
                border: "2px solid #47A138",
                borderRadius: "5px",
                padding: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                fontSize: "14px",
                lineHeight: "1",
                background: "white",
                cursor: "pointer",
              }}
              type="button"
              onClick={handleIsChecked}
              aria-pressed={isChecked === "X"}
            >
              {isChecked}
            </button>
            <p style={{ marginBottom: 0, marginLeft: "5px" }}>
              Li e estou ciente quanto às condições de tratamento dos meus dados
              conforme descrito na Política de Privacidade do banco.
            </p>
          </div>
          {errors.aceitaPolitica && (
            <div style={{ color: "red", marginBottom: "10px" }}>
              {errors.aceitaPolitica}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary"
            style={{
              marginTop: "10px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              background: "#FF5031",
              color: "white",
            }}
          >
            Criar conta
          </button>
        </form>
      </div>
    </div>
  );
}
