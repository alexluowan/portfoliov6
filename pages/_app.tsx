import type { AppProps } from 'next/app'
import Head from 'next/head'
import { AnimatePresence } from 'framer-motion'
import '../styles/globals.css'
import PageTransition from '../src/components/PageTransition'

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <>
      <Head>
        <title>Alex Luowans Portfolio</title>
        <meta name="description" content="Welcome to Alex Luowans Portfolio" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AnimatePresence mode="wait" initial={false} onExitComplete={() => window.scrollTo(0, 0)}>
        <PageTransition key={router.asPath}>
          <Component {...pageProps} />
        </PageTransition>
      </AnimatePresence>
    </>
  )
}
