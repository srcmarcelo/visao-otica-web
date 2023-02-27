import Head from 'next/head';
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from '@/styles/Home.module.css';
import RegistrationForm from 'components/RegistrationForm';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <Head>
        <title>Ficha cadastral de clientes - Visão Ótica</title>
        <meta name='description' content='Sistema de gerenciamento de clientes da Visão Ótica' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <div className={styles.description}>
          <p>Ficha cadastral de clientes - Visão Ótica</p>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignContent: 'center',
            width: '100%',
          }}
        >
          <RegistrationForm />
        </div>
      </main>
    </>
  );
}
