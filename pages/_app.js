import { RouteGuard } from '../src/components/RouteGuard'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <RouteGuard>
        <Component {...pageProps} />
    </RouteGuard>
  
  )
}

export default MyApp
