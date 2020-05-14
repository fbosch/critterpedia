import styled from 'styled-components'
import border from '../public/assets/images/border.png'
import SearchBar from './SearchBar'

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

const StyledFooter = styled.footer`
  grid-area: footer;
  border-top: 2px solid ${(props) => props.theme.borderColor};
`

function Footer(props) {
  return (
    <StyledFooter>
      <StyledContainer>
        <SearchBar />
      </StyledContainer>
    </StyledFooter>
  )
}

export default Footer
