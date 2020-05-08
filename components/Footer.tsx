import styled from 'styled-components'
import border from '../public/assets/images/border.png'

const StyledFooter = styled.footer`
  grid-area: footer;
  &:after {
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
  return <StyledFooter />
}

export default Footer