import styled from 'styled-components'
import border from '../public/assets/images/border.png'
import SearchBar from './SearchBar'

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledFooter = styled.footer`
  grid-area: footer;
  &:before {
    content: '';
    position: absolute;
    width: 100%;
    height: 8px;
    background-repeat: repeat-x;
    background-image: url(${border});
    background-size: 100% 7px;
    opacity: 0.8;
  }
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