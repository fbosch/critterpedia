import React, { useRef } from 'react'
import styled from 'styled-components'
import { ThemeType } from '../theme'
import CardLabel from './CardLabel'

type GridCardProps = {
  fallback?: Function;
  theme?: ThemeType,
  image?: string,
  title?: string,
  id?: string,
  showSpacer?: boolean
}

const getFallback = (props: GridCardProps) => props.fallback(props.theme.borderColor)

const StyledSpacer = styled.span`
  display: none;
  height: 100%;
  left: 100%;
  width: calc(70% + env(safe-area-inset-left));
  position: absolute;
  scroll-snap-align: start;
  z-index: -1;
  pointer-events: none;
`

const StyledCard = styled.li`
  touch-action: manipulation;
  font-size: 1.2vh;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
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

  a {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    padding: 0;
  }

  &:last-of-type img+span {
    display: block;
  }

  :focus {
    img {
      transform: scale(1.1);
    }
    label {
      visibility: visible;
      opacity: 1;
      transform: rotate(-2deg) translateY(0%);
    }
  }

  img {
    user-select: none;
    z-index: 2;
    width: 8vmax;
    max-width: 60%;
    will-change: opacity;
    image-rendering: optimizeQuality;
    image-rendering: smooth;
    opacity: 0;
    transition: transform 250ms cubic-bezier(0,.5,.5,1), background 300ms linear;
    background: radial-gradient(rgba(233, 227, 169, 1) 30%,rgba(233, 227, 169, 0) 70%);
    &[src]:not([data-src]) {
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
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    border: 2px solid ${props => props.theme.borderColor};
    position: absolute;
  }
`

const isSmoothScrollSupported = process.browser && 'scrollBehavior' in document.documentElement.style;

function handleFocus(event) {
  event.preventDefault()
  const target = event.currentTarget
  window.requestAnimationFrame(() => {
    target.scrollIntoView({
      behavior: "smooth",
      inline: "center"
    })
    window.location.hash = target.getAttribute('id')
  })
}

function CardEntry(props: GridCardProps) {
  return (
    <StyledCard {...props} id={props.id} onFocus={isSmoothScrollSupported ? handleFocus : null} tabIndex={0}>
      <a href={'#' + props.id} onClick={e => e.preventDefault()}>
        {props.title && (
          <CardLabel title={props.title}>
            {props.title}
          </CardLabel>
        )}
        {props.image && <img data-src={props.image} loading='lazy' draggable="false" alt={props.title} />}
        {props.showSpacer && <StyledSpacer />}
      </a>
    </StyledCard>
  )

}

export default CardEntry