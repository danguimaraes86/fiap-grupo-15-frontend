import { useState } from "react";
import img_modal_login from "../../../assets/images/login.png";
import { postLogin } from "../../../services/http-usuario.service";
import { AuthErrorComponent } from "../../auth-error";
import "./index.css";

interface Props {
  closeModal: () => void;
}

export default function Login({ closeModal }: Props) {
  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    senha: "",
  });
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const validate = () => {
    const newErrors: typeof errors = {
      email: "",
      senha: "",
    };
    let valid = true;

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

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    if (validate()) {
      setLoading(true);
      try {
        const { token } = await postLogin({
          email: formData.email,
          password: formData.senha,
        });
        sessionStorage.setItem("token", token);
        window.location.href = "/dashboard";
      } catch (error) {
        setAuthError(error as string);
      } finally {
        setLoading(false);
      }
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
          className="col"
          src={img_modal_login}
          alt="Banner de login"
          style={{ maxHeight: "267px" }}
        />
        <h5 style={{ marginTop: "20px", marginBottom: "20px" }}>
          <strong>Login</strong>
        </h5>
        <form onSubmit={handleSubmit} noValidate style={{ width: "100%" }}>
          {authError && <AuthErrorComponent mensagem={authError} />}
          <div className="row mb-3">
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
          ></div>
          <a href="" className="link-personalizado">
            Esqueci a senha!
          </a>
          <button
            type="submit"
            className="btn"
            disabled={loading}
            style={{
              marginTop: "10px",
              display: "block",
              marginLeft: "auto",
              marginRight: "auto",
              background: "#47A138",
              paddingLeft: "20px",
              paddingRight: "20px",
              color: "white",
            }}
          >
            {loading ? "Acessando..." : "Acessar"}
          </button>
        </form>
      </div>
    </div>
  );
}
