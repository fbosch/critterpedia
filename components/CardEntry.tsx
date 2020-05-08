import styled from 'styled-components'
import { ThemeType } from '../theme'

type GridCardProps = {
  fallback?: Function;
  theme?: ThemeType
}

const getFallback = (props: GridCardProps) => props.fallback(props.theme.borderColor)

const StyledCard = styled.div`
height: calc(var(--vh, 1vh) * 10);
width: calc(var(--vh, 1vh) * 15);
padding: calc(var(--vh, 1vh));
position: relative;
background-image: url("data:image/svg+xml;base64,${getFallback}");
background-repeat: no-repeat;
background-size: 20%;
background-position: center 55%;
scroll-snap-align: end;
cursor: pointer;

&:focus {
  outline: none;
  &:hover:after {
    opacity: 0.6;
  }
  :after {
    opacity: 0.4;
  }
}

&:after {
  content: '';
  position: absolute;
  height: 92%;
  width: 92%;
  border-top-left-radius: 255px 15px;
  border-top-right-radius: 15px 225px;
  border-bottom-right-radius: 225px 15px;
  border-bottom-left-radius:15px 255px;
  border: 3px solid ${props => props.theme.darkGrayAccent};
  display: block;
  top: 50%;
  left: 50%;
  opacity: 0;
  transition: opacity 200ms linear;
  transform: translate(-50%, -50%);
}

&:before {
  content: '';
  width: calc(100% + -2px);
  height: calc(100% + -2px);
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border: 2px solid ${props => props.theme.borderColor};
  position: absolute;
}
`


function CardEntry(props: GridCardProps) {

  return (
    <StyledCard {...props} tabIndex={0}>

    </StyledCard>
  )

}

export default CardEntry