import React, { useEffect, useLayoutEffect } from 'react'

import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: grid;
  min-height: calc(var(--vh, 1vh) * 100);
	grid-template-rows: auto repeat(1, 1fr) calc(var(--vh, 1vh) * 15);
	grid-column-gap: 0px;
	grid-row-gap: 0px;
	grid-template-areas:
    "header header header"
		"content content content"
		"footer footer footer";
`

const Main = styled.main`
  grid-area: content;
`

type SiteLayoutProps = {
  children?: any,
  route?: string
}

// function loadBrowserPlugins() {
//   console.log('Loaded Browser Plugins')
//   require('vh-check')
//   const attachFastClick = require('fastclick')
//   require('inobounce')
//   attachFastClick(document.body)
// }

function SiteLayout(props: SiteLayoutProps) {
  const { children } = props

  // useLayoutEffect(() => {
  //   if (process.browser) {
  //     if (document.readyState === 'complete') {
  //       loadBrowserPlugins()
  //     } else {
  //       document.addEventListener('DOMContentLoaded', loadBrowserPlugins)
  //     }
  //   }
  // }, [])

  return (
    <StyledContainer>
      <Header />
      <Main>
        {children}
      </Main>
      <Footer />
    </StyledContainer>
  )
}


export default SiteLayout