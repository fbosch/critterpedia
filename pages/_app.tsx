import 'modern-normalize'

import React, { createContext } from 'react'

import App from 'next/app'
import { ThemeProvider } from 'styled-components'
import { withRouter } from 'next/router'
import { PageTransition } from 'next-page-transitions'
import theme from '../theme'
import GlobalStyle from '../components/GlobalStyle'
import SiteLayout from '../components/SiteLayout'

const Context = createContext(undefined)
const Provider = ({ router, children }) => <Context.Provider value={router}>{children}</Context.Provider>
export const RouterContextProvider = withRouter(Provider)

if (process.browser) {
  require('../polyfills')
}

export default class extends App {
  static async getStaticProps({ Component, ctx }): Promise<{ pageProps }> {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getStaticProps(ctx)
    }

    return { pageProps }
  }
  render(): JSX.Element {
    const { Component, router, pageProps } = this.props
    return (
      <ThemeProvider theme={theme}>
        <RouterContextProvider>
          <GlobalStyle />
          <SiteLayout route={router.asPath}>
            <PageTransition timeout={300} classNames='page-transition' skipInitialTransition>
              <Component {...pageProps} key={router.asPath} />
            </PageTransition>
          </SiteLayout>
        </RouterContextProvider>
      </ThemeProvider>
    )
  }
}
