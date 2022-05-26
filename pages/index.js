import Head from 'next/head'
import Image from 'next/image'
import { Form } from '../src/components/Form'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Book Order App</title>
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        <meta name="description" content="Online Book order form" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta charSet="UTF-8" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"/>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
        संत रामपाल जी महाराज जी द्वारा लिखित विश्वको सबैभन्दा लोकप्रिय अद्भुत अध्यात्मिक पुस्तकहरु घरैमा मगाउनुहोस <a href="#"> - बिल्कुलै - निःशुल्क (Free)</a>
        </h1>

        <p className={styles.description}>
        करोडौं मानिसहरुले पढिसके तपाईं पनि अवश्य पढ्नुहोस । कृपया सहि र पूरा जानकारी भर्नुहोला जसले गर्दा पुस्तक पुर्याउनमा अप्ठ्यारो नहोस् । पूरा ठेगाना विस्तृत रुपमा लेख्नुहोला । कुनै प्रकारको शुल्क लिइनेछैन । यस मध्ये कुनै एउटा पुस्तक पुर्णतया निःशुल्क हुनेछ । एक भन्दा बढी पुस्तक चाहिएमा थप पुस्तक को नेपाली रु. १५ प्रति पुस्तक धर्मार्थ मुल्य लाग्नेछ।
        </p>
        <Form />
        
      </main>

      <footer className={styles.footer}>
        <a
          href="http://supremegod.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Books written by{' '}
          <span className={styles.logo}>
            Saint Rampal Ji Maharaj
          </span>
        </a>
      </footer>
    </div>
  )
}
