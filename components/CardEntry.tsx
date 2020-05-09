import styled from 'styled-components'
import { ThemeType } from '../theme'

type GridCardProps = {
  fallback?: Function;
  theme?: ThemeType,
  image?: string,
  title?: string,
  id?: string,
}

const getFallback = (props: GridCardProps) => props.fallback(props.theme.borderColor)

const Shadow = styled.span`
  &:before, &:after {
    position: absolute;
    width: 30%;
    content: ' ';
    left: 10%;
    transform-origin: top right;
    transform: skew(-4deg) rotate(-8deg);
    box-shadow: 0 1.6em 5px 10px rgba(173, 165, 118, 0.5);
  }
  &:after {
    left: auto;
    right: 10%;
    transform-origin: left top;
    transform: skew(4deg) rotate(8deg);
  }
`

const StyledCard = styled.li`
  font-size: 1.2vh;
  margin: 0;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(var(--vh, 1vh) * 10);
  width: calc(var(--vh, 1vh) * 15);
  padding: calc(var(--vh, 1vh));
  position: relative;
  background-image: url("data:image/svg+xml;base64,${getFallback}");
  background-repeat: no-repeat;
  background-size: 20%;
  background-position: center;
  scroll-snap-align: end;
  cursor: pointer;
  position: relative;
  -webkit-tap-highlight-color: transparent;

  &:focus {
    img {
      transform: scale(1.05);
    }
    label {
        min-height: 0.7em;
        min-width: 2.5em;
        visibility: visible;
        top: -30%;
        color: #3D392D;
        font-style: italic;
        font-size: 1.2em;
        z-index: 10;
        white-space: nowrap;
        display: block;
        padding: 1.3em 2.2em;
        transform: rotate(-2deg) translateY(0%);
        z-index: 5;
        opacity: 1;
        &:before {
          content: '';
          display: block;
          height: 65%;
          width: calc(90% - 10px);
          border: 1px solid #D2CFBE;
          outline: 3px solid #ECEAD3;
          position: absolute;
          z-index: 3;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          box-shadow:
            0 0 0 4px #D2CFBE;
        }
        &:after {
          content: attr(data-name);
          display: flex;
          border: 1px solid #d6d2a0;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          background: #ECEAD3;
          width: calc(100% - 5px);
          height: 100%;
          z-index: 2;
        }
      }
  }

  label {
    opacity: 0;
    position: absolute;
    visibility: hidden;
    transition: opacity 200ms linear, transform 300ms linear 30ms;
    transform: rotate(1deg) translateY(-10%);
  }

  img {
    width: 7vmax;
    max-width: 10vh;
    will-change: opacity;
    image-rendering: optimizeQuality;
    image-rendering: smooth;
    opacity: 0;
    transition: transform 250ms cubic-bezier(0,.5,.5,1), background 300ms linear;
    background: radial-gradient(rgba(233, 227, 169, 1) 30%,rgba(233, 227, 169, 0) 70%);
    &[src] {
      animation: fadeIn 200ms linear;
      animation-fill-mode: forwards;
    }
    &:not([src]) {
      width: 20%;
      content: url("data:image/svg+xml;base64,${getFallback}");
    }
  }

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
    border: 2px solid ${props => props.theme.darkGrayAccent};
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
      <label data-name={props.title} htmlFor={props.id}>
        {props.title}
        <Shadow />
      </label>
      <img data-src={props.image} loading='eager' draggable={false} alt={props.title} />
    </StyledCard>
  )

}

export default CardEntry