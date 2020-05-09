import 'normalize.css'

import * as React from 'react'

import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { RouterContextProvider } from '../hooks/useRouter'
import { PageTransition } from 'next-page-transitions'
import theme from '../theme'
import GlobalStyle from '../components/GlobalStyle'
import SiteLayout from '../components/SiteLayout'
import vhCheck from 'vh-check'

export default class extends App {

  componentDidMount() {
    vhCheck()
  }

  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }
  render() {
    const { Component, router, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <RouterContextProvider>
          <GlobalStyle />
          <SiteLayout route={router.route}>
            <PageTransition timeout={300} classNames="page-transition" skipInitialTransition>
              <Component {...pageProps} key={router.route} />
            </PageTransition>
          </SiteLayout>
        </RouterContextProvider>
      </ThemeProvider>
    )
  }
}