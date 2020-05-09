import * as React from 'react'

import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const loadedScript = `
document.body.classList.remove("no-js")
document.body.classList.add("js")
window.addEventListener("load", function(){ document.body.classList.add("loaded") })
`

const PageLoadScript = () => <script dangerouslySetInnerHTML={{ __html: loadedScript }} />

export default class extends Document {
  static async getInitialProps (ctx: DocumentContext) {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: App => props => sheet.collectStyles(<App {...props} />)
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        )
      }
    } finally {
      sheet.seal()
    }
  }
  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="dns-prefetch" href="https://fonts.gstatic.com/" />
          <link rel="preconnect" href="https://fonts.gstatic.com/" crossOrigin='' />
          <link rel="dns-prefetch" href="https://res.cloudinary.com" />
          <link rel="preconnect" href='https://res.cloudinary.com' crossOrigin='' />
          <title>Crittepedia</title>
          <meta name="description" content="An overview of all fish and bugs" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
          <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#74735f" />
          <meta name="apple-mobile-web-app-status-bar-style" content="translucent" />
          <meta name="msapplication-TileColor" content="#f1f0dc" />
          <meta name="theme-color" content="#EEEBC7" />
          <meta name="viewport" content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" />
        </Head>
        <body className={'no-js'}>
          <PageLoadScript />
					<Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}