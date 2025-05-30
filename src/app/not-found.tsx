'use client';

import { useState } from 'react';
import BannerNotFoundComponent from '../components/banner-not-found';
import Footer from '../components/home-view/footer';
import Header from '../components/home-view/header';
import Login from '../components/modal/login';
import Register from '../components/modal/register';
import styles from './home-view.module.css';

export default function NotFoundView() {
  const [modalCLient, setModalClient] = useState<'login' | 'register' | null>(null);
  const closeModal = () => setModalClient(null);

  return (
    <>
      {modalCLient === 'login' && <Login closeModal={closeModal} />}
      {modalCLient === 'register' && <Register closeModal={closeModal} />}
      <Header setModalClient={setModalClient} />
      <main className={styles.home_background}>
        {/* Banner Central */}
        <section
          className={`${styles.media_sm_screen} ${styles.media_md_screen} ${styles.media_lg_screen} text-center`}
        >
          <BannerNotFoundComponent
            imageSrc="/images/not_found_404.png"
            altText="Imagem de página não encontrada"
          />
        </section>
      </main>
      <Footer />
    </>
  );
}
