import * as React from 'react'

import Document, { DocumentContext, Head, Html, Main, NextScript, DocumentInitialProps } from 'next/document'
import { ServerStyleSheet } from 'styled-components'

const loadedScript = `
  document.documentElement.classList.remove("no-js")
  document.documentElement.classList.add("js")
  window.addEventListener("load", function(){ document.documentElement.classList.add("loaded") })
`

const PageLoadScript = () => <script dangerouslySetInnerHTML={{ __html: loadedScript }} />

export default class extends Document {
  static async getInitialProps(ctx: DocumentContext): Promise<DocumentInitialProps> {
    const sheet = new ServerStyleSheet()
    const originalRenderPage = ctx.renderPage
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
        })
      const initialProps = await Document.getInitialProps(ctx)
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      }
    } finally {
      sheet.seal()
    }
  }

  render(): JSX.Element {
    return (
      <Html lang='en' className='no-js'>
        <Head>
          <link rel='preload' href='assets/fonts/humming.otf' as='font' type='font/otf' />
          <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
          <link rel='icon' type='image/png' sizes='32x32' href='/favicon-32x32.png' />
          <link rel='icon' type='image/png' sizes='16x16' href='/favicon-16x16.png' />
          <link rel='manifest' href='/site.webmanifest' />
          <link rel='mask-icon' href='/safari-pinned-tab.svg' color='#74735f' />
          <meta name='apple-mobile-web-app-status-bar-style' content='black-translucent' />
          <meta name='msapplication-TileColor' content='#F8CC63' />
          <meta name='theme-color' content='#F8CC63' />
          <meta
            name='viewport'
            content='initial-scale=1,viewport-fit=cover,width=device-width,minimum-scale=1.0,maximum-scale=5.0'
          />
          <meta httpEquiv='X-UA-Compatible' content='ie=edge' />
          <meta name='apple-mobile-web-app-capable' content='yes' />
          <link rel='apple-touch-startup-image' href='/launch.png' />
          <link
            href='splashscreens/iphone5_splash.png'
            media='(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)'
            rel='apple-touch-startup-image'
          />
          <link
            href='splashscreens/iphone6_splash.png'
            media='(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)'
            rel='apple-touch-startup-image'
          />
          <link
            href='splashscreens/iphoneplus_splash.png'
            media='(device-width: 621px) and (device-height: 1104px) and (-webkit-device-pixel-ratio: 3)'
            rel='apple-touch-startup-image'
          />
          <link
            href='splashscreens/iphonex_splash.png'
            media='(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)'
            rel='apple-touch-startup-image'
          />
          <link
            href='splashscreens/iphonexr_splash.png'
            media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)'
            rel='apple-touch-startup-image'
          />
          <link
            href='splashscreens/iphonexsmax_splash.png'
            media='(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)'
            rel='apple-touch-startup-image'
          />
          <link
            href='splashscreens/ipad_splash.png'
            media='(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)'
            rel='apple-touch-startup-image'
          />
          <link
            href='splashscreens/ipadpro1_splash.png'
            media='(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)'
            rel='apple-touch-startup-image'
          />
          <link
            href='splashscreens/ipadpro3_splash.png'
            media='(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)'
            rel='apple-touch-startup-image'
          />
          <link
            href='splashscreens/ipadpro2_splash.png'
            media='(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)'
            rel='apple-touch-startup-image'
          />
        </Head>
        <body>
          <PageLoadScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
