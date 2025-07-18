import icon_logo_white from "../../assets/icons/logo-white.png";
import styles from "./styles.module.css";

export default function Footer() {
  return (
    <footer
      className="text-white text-start text-ld-center"
      style={{ backgroundColor: "black" }}
    >
      <div className="container py-lg-5 py-sm-4">
        <div className={`${styles.media_sm_screen} row mx-auto`}>
          {/* Grid column */}
          <div className="col-md-4 col-sm-8">
            <h6 className="fw-bold mb-3 mt-4 mt-md-0">Serviços</h6>
            <p>Conta corrente</p>
            <p>Conta PJ</p>
            <p className="mb-0">Cartão de crédito</p>
          </div>

          {/* Grid column */}
          <div className="col-md-4 col-sm-8">
            <h6 className="fw-bold mb-3 mt-5 mt-md-0">Contato</h6>
            <p>0800 004 250 08</p>
            <p>meajuda@bytebank.com.br</p>
            <p className="mb-0">ouvidoria@bytebank.com.br</p>
          </div>

          {/* Grid column */}
          <div className="col-md-4 col-sm-8">
            <h6 className="fw-bold mb-4 mt-5 mt-md-0">
              Desenvolvido por Alura
            </h6>
            <img className="mb-4" src={icon_logo_white} alt="Logo" />
            <div className="mb-0 d-flex gap-3">
              <i className="bi bi-instagram" style={{ fontSize: "30px" }}></i>
              <i className="bi bi-youtube" style={{ fontSize: "30px" }}></i>
              <i className="bi bi-whatsapp" style={{ fontSize: "30px" }}></i>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
