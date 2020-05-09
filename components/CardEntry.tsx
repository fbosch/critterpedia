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
    height: 0.5rem;
    width: 28%;
    content: ' ';
    left: 20px;
    top: 0%;
    transform-origin: top right;
    transform: skew(-7deg) rotate(-7deg);
    box-shadow: 0 30px 7px 10px rgba(173, 165, 118, 0.7);
  }
  &:after {
    left: auto;
    right: 20px;
    transform-origin: left top;
    transform: skew(7deg) rotate(7deg);
  }
`

const StyledCard = styled.li`
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
      visibility: visible;
      top: -20%;
      color: #3D392D;
      font-style: italic;
      font-size: 1.2rem;
      z-index: 10;
      white-space: nowrap;
      display: block;
      padding: 1rem 2.2rem;
      transform: rotate(-2deg) translateY(0%);
      z-index: 5;
      opacity: 1;
      &:after {
        content: attr(data-name);
        display: flex;
        border: 1px solid #d6d2a0;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        background: #ECEAD3;
        width: 100%;
        height: 100%;
        z-index: 9;
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
    transition: transform 250ms cubic-bezier(0,.5,.5,1);
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