import * as React from 'react'

import Header from './Header'
import Footer from './Footer'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: grid;
  min-height: 100vh;
	grid-template-rows: auto repeat(1, 1fr) 80px;
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