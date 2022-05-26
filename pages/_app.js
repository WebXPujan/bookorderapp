import { RouteGuard } from '../src/components/RouteGuard'
import Head from 'next/head'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <RouteGuard>
        <Head>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
      </Head>
        <Component {...pageProps} />
    </RouteGuard>
  
  )
}

export default MyApp
