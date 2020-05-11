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

const StyledMain = styled.main`
  grid-area: content;
`

type SiteLayoutProps = {
  children?: any,
  route?: string
}

function SiteLayout(props: SiteLayoutProps) {
  const { children } = props

  return (
    <>
    <StyledContainer>
      <Header />
      <StyledMain>
        {children}
      </StyledMain>
      <Footer />
    </StyledContainer>
    <svg xmlns="http://www.w3.org/2000/svg" version="1.1" display="none">
      <defs>
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
          <feColorMatrix in="blur" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -10" result="goo" />
          <feComposite in="SourceGraphic" in2="goo" operator="atop"/>
        </filter>
      </defs>
    </svg>
    </>
  )
}


export default SiteLayout