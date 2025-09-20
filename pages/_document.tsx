import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="preload"
          href="/fonts/twklausanne/TWKLausanne-400.woff"
          as="font"
          type="font/woff"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="/fonts/twklausanne/TWKLausanne-400Italic.woff"
          as="font"
          type="font/woff"
          crossOrigin=""
        />
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-twklausanne: 'TWK Lausanne', Helvetica, sans-serif;
            }
            body {
              font-family: var(--font-twklausanne);
            }
          `
        }} />
      </Head>
      <body className="antialiased flex relative flex-col px-4 w-full">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
