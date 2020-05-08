import React, { useLayoutEffect } from 'react'

import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'
import vhCheck from 'vh-check'

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

function SiteLayout(props: SiteLayoutProps) {
  useLayoutEffect(() => {
    const check = vhCheck()
    console.log(check)
  }, [])

  const { children } = props
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