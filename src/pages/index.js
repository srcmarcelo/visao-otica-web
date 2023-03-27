import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import RegistrationForm from 'components/RegistrationForm';
import { useState } from 'react';
import InstallmentsForm from 'components/InstallmentsForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [mode, setMode] = useState(true);

  return (
    <>
      <Head>
        <title>Ficha cadastral de clientes - Visão Ótica</title>
        <meta
          name='description'
          content='Sistema de gerenciamento de clientes da Visão Ótica'
        />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <a onClick={() => setMode(!mode)}>
            <p>
              {mode ? 'Ficha cadastral de clientes' : 'Gerador de parcelas'}
            </p>
          </a>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%',
          }}
        >
          {mode ? <RegistrationForm /> : <InstallmentsForm />}
        </div>
      </main>
    </>
  );
}
