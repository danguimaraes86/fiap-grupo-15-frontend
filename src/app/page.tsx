'use client';
import Header from '@/components/home-view/header';
import HeroBannerComponent from '../components/home-view/banner-image';
import HeroTextComponent from '../components/home-view/banner-text';
import ButtonOutlineComponent from '../components/home-view/buttons/outline';
import ButtonRegularComponent from '../components/home-view/buttons/regular';
import CardComponent from '../components/home-view/card';
import styles from './home-view.module.css';
import Footer from '@/components/home-view/footer';
import Register from '@/components/modal/register';
import { useState } from 'react';
import Login from '@/components/modal/login';

export default function HomeView() {
  const [login, setLogin] = useState<Boolean>(false);
  const [register, setRegister] = useState<Boolean>(false);

  const handleLogin = () => {
    setLogin(login ? false : true);
  };

  const handleRegister = () => {
    setRegister(register ? false : true);
  };

  return (
    <>
      {login && <Login setLogin={handleLogin} />}
      {register && <Register setRegister={handleRegister} />}
      <Header setRegister={handleRegister} setLogin={handleLogin} />
      <main className={styles.home_background}>
        {/* Banner Central */}
        <section
          className={`${styles.media_sm_screen} ${styles.media_md_screen} ${styles.media_lg_screen} row g-3`}
        >
          <HeroTextComponent />
          <HeroBannerComponent />
        </section>

        {/* Botões Conta - Mobile */}
        <section
          className={`${styles.media_sm_screen} ${styles.media_md_screen} ${styles.media_lg_screen} row d-sm-none mt-3 g-0 justify-content-between align-items-center`}
        >
          <div className="col">
            <ButtonRegularComponent text="Abir Conta" onClick={handleLogin} />
          </div>
          <div className="col ms-3">
            <ButtonOutlineComponent
              text="Já tenho conta"
              onClick={handleRegister}
            />
          </div>
        </section>

        {/* Seção Vantagens */}
        <section
          className={`${styles.media_sm_screen} ${styles.media_md_screen} ${styles.media_lg_screen} row mt-3`}
        >
          <div
            style={{ color: '#47A138' }}
            className="col-12 mb-4 fs-6 fs-md-5 fw-bold text-center"
          >
            Vantagens do nosso banco:
          </div>
          <div className="col-12">
            <div style={{ color: '#47A138' }} className="row g-5 text-center">
              {/* Gifts */}
              <CardComponent
                icon_src={'/icons/gift.png'}
                alt_text={'ícone de presente'}
                title={'Conta e cartão gratuitos'}
                description={
                  'Isso mesmo, nossa conta é digital, sem custo fixo e mais que isso: sem tarifa de manutenção.'
                }
              />

              {/* Cash */}
              <CardComponent
                icon_src={'/icons/cash.png'}
                alt_text={'ícone de pessoa sacando dinheiro'}
                title={'Saques sem custo'}
                description={
                  'Você pode sacar gratuitamente 4x por mês de qualquer Banco 24h.'
                }
              />

              {/* Star */}
              <CardComponent
                icon_src={'icons/star.png'}
                alt_text={'ícone de estrela'}
                title={'Programa de pontos'}
                description={
                  'Você pode acumular pontos com suas compras no crédito sem pagar mensalidade!'
                }
              />

              {/* Devices */}
              <CardComponent
                icon_src={'/icons/devices.png'}
                alt_text={'ícone de dispositivos'}
                title={'Seguro Dispositivos'}
                description={
                  'Seus dispositivos móveis (computador e laptop) protegidos por uma mensalidade simbólica.'
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
