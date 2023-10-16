import { AppProps } from 'next/app';
import Head from 'next/head';
import './styles.css';
import { UserProvider } from '@auth0/nextjs-auth0/client';
import NavBar from '../components/Navbar';

function CustomApp({ Component, pageProps }: AppProps) {

  return (
    <>
      <Head>
        <title>F off</title>
      </Head>
      <main className="app">
        <UserProvider>
          <NavBar />
          <Component {...pageProps} />
        </UserProvider>
      </main>
    </>
  );
}

export default CustomApp;
