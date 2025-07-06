import { useState } from "react";
import img_not_found from "./assets/images/not_found_404.png";
import BannerNotFoundComponent from "./components/banner-not-found";
import Footer from "./components/footer";
import Header from "./components/header";
import Login from "./components/modal/login";
import Register from "./components/modal/register";
import styles from "./NotFoundView.module.css";

export default function NotFoundView() {
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
          className={`${styles.media_sm_screen} ${styles.media_md_screen} ${styles.media_lg_screen} text-center`}
        >
          <BannerNotFoundComponent
            imageSrc={img_not_found}
            altText="Imagem de página não encontrada"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
