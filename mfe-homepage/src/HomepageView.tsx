import { useState } from "react";
import icon_cash from "./assets/icons/cash.png";
import icon_devices from "./assets/icons/devices.png";
import icon_gift from "./assets/icons/gift.png";
import icon_star from "./assets/icons/star.png";
import img_home_view_banner from "./assets/images/home_view_banner.png";
import HeroBannerComponent from "./components/banner-image";
import HeroTextComponent from "./components/banner-text";
import ButtonOutlineComponent from "./components/buttons/outline";
import ButtonRegularComponent from "./components/buttons/regular";
import CardVantagemComponent from "./components/card-vantagem";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./components/modal/login";
import Register from "./components/modal/register";
import styles from "./HomepageView.module.css";

export default function HomepageView() {
  const [modalCLient, setModalClient] = useState<"login" | "register" | null>(
    null
  );

  const closeModal = () => setModalClient(null);

  return (
    <>
      {modalCLient === "login" && <Login closeModal={closeModal} />}
      {modalCLient === "register" && <Register closeModal={closeModal} />}
      <Header setModalClient={setModalClient} />
      <main className={styles.home_background}>
        {/* Banner Central */}
        <section
          className={`${styles.media_sm_screen} ${styles.media_md_screen} ${styles.media_lg_screen} row g-3`}
        >
          <HeroTextComponent text="Experimente mais liberdade no controle da sua vida financeira. Crie sua conta com a gente!" />
          <HeroBannerComponent
            imageSrc={img_home_view_banner}
            altText="Banner da Home Page"
          />
        </section>

        {/* Botões Conta - Mobile */}
        <section
          className={`${styles.media_sm_screen}
            ${styles.media_md_screen}
            ${styles.media_lg_screen}
            row d-sm-none mt-3 g-0 justify-content-between align-items-center
          `}
        >
          <div className="col">
            <ButtonRegularComponent
              text="Abir Conta"
              onClick={() => setModalClient("register")}
            />
          </div>
          <div className="col ms-3">
            <ButtonOutlineComponent
              text="Já tenho conta"
              onClick={() => setModalClient("login")}
            />
          </div>
        </section>

        {/* Seção Vantagens */}
        <section
          className={`${styles.media_sm_screen} ${styles.media_md_screen} ${styles.media_lg_screen} row mt-3`}
        >
          <div
            style={{ color: "#47A138" }}
            className="col-12 mb-4 fs-6 fs-md-5 fw-bold text-center"
          >
            Vantagens do nosso banco:
          </div>
          <div className="col-12">
            <div style={{ color: "#47A138" }} className="row g-5 text-center">
              {/* Gifts */}
              <CardVantagemComponent
                icon_src={icon_gift}
                alt_text={"ícone de presente"}
                title={"Conta e cartão gratuitos"}
                description={
                  "Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção."
                }
              />

              {/* Cash */}
              <CardVantagemComponent
                icon_src={icon_cash}
                alt_text={"ícone de pessoa sacando dinheiro"}
                title={"Saques sem custo"}
                description={
                  "Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h."
                }
              />

              {/* Star */}
              <CardVantagemComponent
                icon_src={icon_star}
                alt_text={"ícone de estrela"}
                title={"Programa de pontos"}
                description={
                  "Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!"
                }
              />

              {/* Devices */}
              <CardVantagemComponent
                icon_src={icon_devices}
                alt_text={"ícone de dispositivos"}
                title={"Seguro Dispositivos"}
                description={
                  "Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica."
                }
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
