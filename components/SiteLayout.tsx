import React from 'react'

import Header from './Header'
import Footer from './Footer'
import { ios, standalone } from '../theme'
import styled from 'styled-components'

const StyledContainer = styled.div`
  position: relative;
  display: grid;
  min-width: 100vw;
  min-height: 100vh;
  grid-template-rows: auto repeat(1, 1fr) calc(var(--vh, 1vh) * 15);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    'header header header'
    'content content content'
    'footer footer footer';
  ${ios} {
    min-height: 87vh;
    grid-template-rows: auto repeat(1, 1fr) calc(var(--vh, 1vh) * 13);
    ${standalone} {
      height: calc(calc(var(--vh, 1vh) * 99));
    }
  }
`

const StyledMain = styled.main`
  grid-area: content;
`

type SiteLayoutProps = {
  children?: any
  route?: string
}

function SiteLayout(props: SiteLayoutProps) {
  const { children } = props

  return (
    <StyledContainer>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </StyledContainer>
  )
}

export default SiteLayout
