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
          {/* <div>
            <a
              href='https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app'
              target='_blank'
              rel='noopener noreferrer'
            >
              <Image
                src='/logo.png'
                alt='Vercel Logo'
                className={styles.vercelLogo}
                width={300}
                height={100}
                priority
              />
            </a>
          </div> */}
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
