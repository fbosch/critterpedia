import React, { useEffect } from 'react'

import Header from './Header'
import Footer from './Footer'
import { ios, standalone } from '../theme'
import styled from 'styled-components'

const StyledContainer = styled.div`
  position: relative;
  display: grid;
  min-width: 100vw;
  min-height: 100vh;
  grid-template-rows: auto repeat(1, 1fr) 15vh;
  grid-column-gap: 0px;
  grid-row-gap: 0px;
  grid-template-areas:
    'header header header'
    'content content content'
    'footer footer footer';
  ${ios} {
    min-height: 87vh;
    grid-template-rows: auto repeat(1, 1fr) 13vh;
    ${standalone} {
      height: 99vh;
    }
  }

  .no-js & {
    grid-template-rows: auto repeat(1, 1fr);
    grid-template-areas:
      'header header header'
      'content content content';
  }
`

const StyledMain = styled.main`
  grid-area: content;
`

type SiteLayoutProps = {
  children?: React.ReactChildren | JSX.Element | JSX.Element[]
  route?: string
}

async function quicklinks() {
  if (process.browser && process.env.NODE_ENV === 'production') {
    const quicklink = await import('quicklink')
    quicklink.listen()
  }
}

function SiteLayout(props: SiteLayoutProps): React.ReactElement {
  const { children } = props
  useEffect(() => void quicklinks(), [])
  return (
    <StyledContainer>
      <Header />
      <StyledMain>{children}</StyledMain>
      <Footer />
    </StyledContainer>
  )
}

export default SiteLayout
