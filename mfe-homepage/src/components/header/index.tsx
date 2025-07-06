import { useState, type Dispatch, type SetStateAction } from "react";
import icon_logo_green_small from "../../assets/icons/logo-green-small.png";
import icon_logo_green from "../../assets/icons/logo-green.png";
import ButtonOutlineComponent from "../buttons/outline";
import ButtonRegularComponent from "../buttons/regular";
import styles from "./styles.module.css";

interface Props {
  setModalClient: Dispatch<SetStateAction<"login" | "register" | null>>;
}

export default function Header({ setModalClient }: Props) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header
      className="d-flex justify-content-md-around justify-content-between align-items-center"
      style={{
        height: "96px",
        background: "black",
      }}
    >
      <div
        className={`${styles.media_sm_screen} d-flex align-items-center justify-content-between gap-5`}
      >
        <a href="/">
          <img
            className="d-block d-md-none d-lg-block order-2 order-md-1"
            src={icon_logo_green}
            alt="Logo"
          />
          <img
            className="d-none d-md-block d-lg-none order-1"
            src={icon_logo_green_small}
            alt="Logo"
          />
        </a>
        <nav className="d-flex gap-5 order-1 order-md-2 align-items-center position-relative">
          <div className="d-none d-md-flex gap-5">
            <a
              className="text-decoration-none"
              style={{ color: "#47A138" }}
              href="#home"
            >
              Sobre
            </a>
            <a
              className="text-decoration-none"
              style={{ color: "#47A138" }}
              href="/servicos"
            >
              Serviços
            </a>
          </div>
          <button
            className="btn btn-outline-dark d-md-none"
            type="button"
            aria-label="Menu"
            onClick={toggleMenu}
            style={{ border: "none", color: "#47A138" }}
          >
            <span style={{ fontSize: "2rem", lineHeight: 1 }}>&#9776;</span>
          </button>
          {menuOpen && (
            <div
              className="position-absolute bg-black p-3"
              style={{
                top: 70,
                right: 0,
                left: 10,
                zIndex: 10,
                minWidth: "150px",
                maxWidth: "50vw",
                overflowWrap: "break-word",
              }}
            >
              <a
                className="d-block text-decoration-none mb-2"
                style={{ color: "#47A138" }}
                href="#home"
                onClick={() => setMenuOpen(false)}
              >
                Sobre
              </a>
              <a
                className="d-block text-decoration-none"
                style={{ color: "#47A138" }}
                href="#home"
                onClick={() => setMenuOpen(false)}
              >
                Serviços
              </a>
            </div>
          )}
        </nav>
      </div>

      <div className="d-flex gap-3 d-none d-md-flex">
        <ButtonRegularComponent
          text="Abrir minha conta"
          onClick={() => setModalClient("register")}
        />
        <ButtonOutlineComponent
          text="Já tenho conta"
          onClick={() => setModalClient("login")}
        />
      </div>
    </header>
  );
}
